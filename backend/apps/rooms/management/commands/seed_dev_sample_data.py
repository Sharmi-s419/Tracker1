from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from decimal import Decimal
from django.utils import timezone
import datetime

from apps.rooms.models import Room, RoomStatus
from apps.guests.models import Guest
from apps.bookings.models import Booking, BookingStatus, BookingSource, PaymentStatus
from apps.accounts.models import StaffProfile, StaffRole

class Command(BaseCommand):
    help = "Development-only command to seed a staff user and sample bookings for local testing."

    def handle(self, *args, **options):
        self.stdout.write("Setting up development environment sample data...")

        # 1. Staff Admin User
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@hotellarainternational.com',
                'first_name': 'Front',
                'last_name': 'Desk',
                'is_staff': True,
                'is_superuser': True,
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            StaffProfile.objects.create(user=admin_user, role=StaffRole.ADMIN, phone_number='+918300504187')
            self.stdout.write(self.style.SUCCESS("Created staff user: username 'admin', password 'admin123'"))
        else:
            self.stdout.write("Staff user 'admin' already exists.")

        # 2. Ensure initial rooms exist
        from django.core.management import call_command
        call_command('setup_initial_rooms')

        # 3. Add 2 sample guests for testing front desk workflows
        g1, _ = Guest.objects.get_or_create(
            phone='+919876543210',
            defaults={
                'name': 'Ramesh Kumar',
                'email': 'ramesh@example.com',
                'city': 'Chennai',
                'id_proof_type': 'Aadhaar Card',
                'id_proof_number': '1234-5678-9012'
            }
        )

        g2, _ = Guest.objects.get_or_create(
            phone='+919840123456',
            defaults={
                'name': 'Ananya Sharma',
                'email': 'ananya@example.com',
                'city': 'Bangalore',
                'id_proof_type': 'Driving License',
                'id_proof_number': 'KA-01-20220001'
            }
        )

        today = timezone.localdate()
        room1 = Room.objects.get(room_number='101')
        room2 = Room.objects.get(room_number='102')

        # Sample booking 1: Arriving today
        if not Booking.objects.filter(guest=g1, room=room1).exists():
            b1 = Booking.objects.create(
                room=room1,
                guest=g1,
                guest_name=g1.name,
                guest_phone=g1.phone,
                guest_email=g1.email,
                check_in_date=today,
                check_out_date=today + datetime.timedelta(days=2),
                adults=2,
                children=0,
                price_per_night=Decimal('2000.00'),
                total_amount=Decimal('4000.00'),
                booking_source=BookingSource.PHONE,
                status=BookingStatus.CONFIRMED,
                payment_status=PaymentStatus.PARTIAL,
                payment_notes='₹1000 Advance via UPI',
                special_requests='Ground floor preferred for elderly parent',
                created_by=admin_user
            )
            self.stdout.write(self.style.SUCCESS(f"Created sample booking {b1.booking_reference}"))

        # Sample booking 2: Arriving tomorrow
        if not Booking.objects.filter(guest=g2, room=room2).exists():
            b2 = Booking.objects.create(
                room=room2,
                guest=g2,
                guest_name=g2.name,
                guest_phone=g2.phone,
                guest_email=g2.email,
                check_in_date=today + datetime.timedelta(days=1),
                check_out_date=today + datetime.timedelta(days=3),
                adults=2,
                children=1,
                price_per_night=Decimal('2500.00'),
                total_amount=Decimal('5000.00'),
                booking_source=BookingSource.WHATSAPP,
                status=BookingStatus.CONFIRMED,
                payment_status=PaymentStatus.PENDING,
                payment_notes='Pay upon arrival',
                special_requests='Extra pillows requested',
                created_by=admin_user
            )
            self.stdout.write(self.style.SUCCESS(f"Created sample booking {b2.booking_reference}"))

        self.stdout.write(self.style.SUCCESS("Development sample data setup complete."))
