from django.test import TestCase
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from rest_framework import status
from decimal import Decimal
import datetime

from apps.rooms.models import Room, RoomStatus
from apps.guests.models import Guest
from apps.bookings.models import Booking, BookingStatus, BookingSource, PaymentStatus

class BookingDoubleBookingPreventionTests(TestCase):
    def setUp(self):
        self.staff_user = User.objects.create_user(
            username='receptionist', password='secretpassword', is_staff=True
        )
        self.room = Room.objects.create(
            room_number='101',
            room_type='Deluxe AC King',
            base_price_per_night=Decimal('2500.00'),
            status=RoomStatus.AVAILABLE
        )
        self.guest1 = Guest.objects.create(
            name='Guest One',
            phone='+919000000001',
            email='guest1@example.com'
        )
        self.guest2 = Guest.objects.create(
            name='Guest Two',
            phone='+919000000002',
            email='guest2@example.com'
        )

    def test_inclusive_checkin_exclusive_checkout_no_conflict(self):
        """
        A booking from Oct 20 to Oct 22 followed by another booking starting Oct 22
        must succeed because check-out is exclusive and check-in is inclusive.
        """
        b1 = Booking.objects.create(
            room=self.room,
            guest=self.guest1,
            check_in_date=datetime.date(2026, 10, 20),
            check_out_date=datetime.date(2026, 10, 22),
            price_per_night=Decimal('2500.00'),
            status=BookingStatus.CONFIRMED
        )
        self.assertEqual(b1.number_of_nights, 2)
        self.assertEqual(b1.total_amount, Decimal('5000.00'))

        # Adjacent booking starting on same check-out date (Oct 22)
        b2 = Booking.objects.create(
            room=self.room,
            guest=self.guest2,
            check_in_date=datetime.date(2026, 10, 22),
            check_out_date=datetime.date(2026, 10, 25),
            price_per_night=Decimal('2500.00'),
            status=BookingStatus.CONFIRMED
        )
        self.assertEqual(b2.number_of_nights, 3)
        self.assertEqual(b2.total_amount, Decimal('7500.00'))

    def test_overlapping_active_booking_raises_validation_error(self):
        """
        A booking from Oct 20 to Oct 22 must reject another reservation from Oct 21 to Oct 23.
        """
        Booking.objects.create(
            room=self.room,
            guest=self.guest1,
            check_in_date=datetime.date(2026, 10, 20),
            check_out_date=datetime.date(2026, 10, 22),
            status=BookingStatus.CONFIRMED
        )

        with self.assertRaises(ValidationError) as ctx:
            Booking.objects.create(
                room=self.room,
                guest=self.guest2,
                check_in_date=datetime.date(2026, 10, 21),
                check_out_date=datetime.date(2026, 10, 23),
                status=BookingStatus.CONFIRMED
            )
        self.assertIn("already booked", str(ctx.exception))

    def test_cancelled_booking_does_not_block_availability(self):
        """
        Cancelled reservations must not block room availability.
        """
        b1 = Booking.objects.create(
            room=self.room,
            guest=self.guest1,
            check_in_date=datetime.date(2026, 11, 1),
            check_out_date=datetime.date(2026, 11, 5),
            status=BookingStatus.CANCELLED
        )

        # Another booking for same dates should succeed without error
        b2 = Booking.objects.create(
            room=self.room,
            guest=self.guest2,
            check_in_date=datetime.date(2026, 11, 1),
            check_out_date=datetime.date(2026, 11, 5),
            status=BookingStatus.CONFIRMED
        )
        self.assertEqual(b2.status, BookingStatus.CONFIRMED)

class BookingAPITests(APITestCase):
    def setUp(self):
        self.staff_user = User.objects.create_user(
            username='staff_test', password='TestPassword123!', is_staff=True
        )
        self.room = Room.objects.create(
            room_number='201',
            room_type='Executive Double AC',
            base_price_per_night=Decimal('3000.00'),
            status=RoomStatus.AVAILABLE
        )
        # Login to obtain JWT
        login_resp = self.client.post('/api/auth/login/', {
            'username': 'staff_test',
            'password': 'TestPassword123!'
        })
        self.assertEqual(login_resp.status_code, status.HTTP_200_OK)
        self.token = login_resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_create_booking_via_api_and_prevent_conflict(self):
        payload1 = {
            'room_id': self.room.id,
            'guest_name': 'Suresh Raina',
            'guest_phone': '+919876500001',
            'check_in_date': '2026-12-10',
            'check_out_date': '2026-12-12',
            'adults': 2,
            'price_per_night': '3000.00',
            'booking_source': 'whatsapp'
        }
        resp1 = self.client.post('/api/bookings/', payload1)
        self.assertEqual(resp1.status_code, status.HTTP_201_CREATED)
        self.assertIn('HLI-', resp1.data['booking_reference'])
        booking_id = resp1.data['id']

        # Attempt conflicting booking
        payload2 = {
            'room_id': self.room.id,
            'guest_name': 'Conflict Guest',
            'guest_phone': '+919876500002',
            'check_in_date': '2026-12-11',
            'check_out_date': '2026-12-14',
            'adults': 1,
            'booking_source': 'phone'
        }
        resp2 = self.client.post('/api/bookings/', payload2)
        self.assertEqual(resp2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('already booked', str(resp2.data))

        # Check-in action
        checkin_resp = self.client.post(f'/api/bookings/{booking_id}/check-in/')
        self.assertEqual(checkin_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(checkin_resp.data['status'], 'checked_in')

        # Check-out action
        checkout_resp = self.client.post(f'/api/bookings/{booking_id}/check-out/')
        self.assertEqual(checkout_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(checkout_resp.data['status'], 'checked_out')

    def test_dashboard_stats_endpoint(self):
        resp = self.client.get('/api/dashboard/stats/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn('total_rooms', resp.data)
        self.assertIn('available_rooms', resp.data)
        self.assertIn('occupied_rooms', resp.data)
        self.assertIn('today_checkins', resp.data)
        self.assertIn('today_checkouts', resp.data)
