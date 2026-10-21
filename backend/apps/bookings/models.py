from django.db import models, transaction
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from decimal import Decimal
import uuid
import datetime

from apps.rooms.models import Room, RoomStatus
from apps.guests.models import Guest

class BookingSource(models.TextChoices):
    PHONE = 'phone', 'Phone Call'
    WHATSAPP = 'whatsapp', 'WhatsApp Desk'
    WALKIN = 'walkin', 'Walk-in / Front Desk'
    DIRECT = 'direct', 'Direct Contact'
    WEBSITE = 'website', 'Hotel Website'
    OTHER = 'other', 'Other Offline'

class BookingStatus(models.TextChoices):
    CONFIRMED = 'confirmed', 'Confirmed'
    CHECKED_IN = 'checked_in', 'Checked-In'
    CHECKED_OUT = 'checked_out', 'Checked-Out'
    CANCELLED = 'cancelled', 'Cancelled'

class PaymentStatus(models.TextChoices):
    PENDING = 'pending', 'Pending Payment'
    PARTIAL = 'partial', 'Partially Paid / Advance'
    PAID = 'paid', 'Fully Paid'
    REFUNDED = 'refunded', 'Refunded'

def generate_booking_reference():
    """Generates an authentic booking reference e.g. HLI-261015-8942"""
    date_str = datetime.date.today().strftime('%y%m%d')
    random_suffix = uuid.uuid4().hex[:4].upper()
    return f"HLI-{date_str}-{random_suffix}"

class Booking(models.Model):
    booking_reference = models.CharField(
        max_length=32,
        unique=True,
        default=generate_booking_reference,
        db_index=True,
        help_text="Unique booking reference"
    )
    room = models.ForeignKey(Room, on_delete=models.PROTECT, related_name='bookings')
    guest = models.ForeignKey(Guest, on_delete=models.PROTECT, related_name='bookings')

    # Denormalized guest snapshot for quick search & permanent record
    guest_name = models.CharField(max_length=200, db_index=True)
    guest_phone = models.CharField(max_length=25, db_index=True)
    guest_email = models.EmailField(blank=True, default='')

    # Date rule: check-in is inclusive, check-out is exclusive
    check_in_date = models.DateField(db_index=True)
    check_out_date = models.DateField(db_index=True)

    adults = models.PositiveIntegerField(default=1)
    children = models.PositiveIntegerField(default=0)
    number_of_nights = models.PositiveIntegerField(default=1)

    price_per_night = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    booking_source = models.CharField(max_length=20, choices=BookingSource.choices, default=BookingSource.PHONE)
    status = models.CharField(max_length=20, choices=BookingStatus.choices, default=BookingStatus.CONFIRMED, db_index=True)
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    payment_notes = models.TextField(blank=True, default='')
    special_requests = models.TextField(blank=True, default='')

    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)

    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='created_bookings')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-check_in_date', '-created_at']

    def __str__(self):
        return f"{self.booking_reference} - Room {self.room.room_number} ({self.guest_name}) [{self.get_status_display()}]"

    def clean(self):
        """Backend validation for date boundaries and double booking prevention."""
        if not self.check_in_date or not self.check_out_date:
            raise ValidationError("Both check-in and check-out dates are required.")

        if self.check_out_date <= self.check_in_date:
            raise ValidationError("Check-out date must be strictly after the check-in date.")

        # Compute number of nights
        self.number_of_nights = (self.check_out_date - self.check_in_date).days

        # Recalculate total amount if not explicitly set or if price_per_night is updated
        if self.price_per_night and not self.total_amount:
            self.total_amount = self.price_per_night * self.number_of_nights

        # Prevent double booking:
        # Check-in date is inclusive, check-out date is exclusive.
        # Active statuses that block a room: confirmed, checked_in.
        # Cancelled and checked_out reservations do not block future or overlapping bookings.
        if self.status in [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] and self.room_id:
            overlapping = Booking.objects.filter(
                room_id=self.room_id,
                status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
                check_in_date__lt=self.check_out_date,
                check_out_date__gt=self.check_in_date
            )
            if self.pk:
                overlapping = overlapping.exclude(pk=self.pk)

            if overlapping.exists():
                conflict = overlapping.first()
                raise ValidationError(
                    f"Room {self.room.room_number} is already booked from {conflict.check_in_date} to {conflict.check_out_date} (Booking {conflict.booking_reference})."
                )

    def save(self, *args, **kwargs):
        # Always run full clean validation
        self.clean()

        # Update cached guest details
        if self.guest:
            if not self.guest_name:
                self.guest_name = self.guest.name
            if not self.guest_phone:
                self.guest_phone = self.guest.phone
            if not self.guest_email:
                self.guest_email = self.guest.email

        super().save(*args, **kwargs)
