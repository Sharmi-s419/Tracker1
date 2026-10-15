from django.db import models
from decimal import Decimal

class RoomStatus(models.TextChoices):
    AVAILABLE = 'available', 'Available'
    OCCUPIED = 'occupied', 'Occupied'
    MAINTENANCE = 'maintenance', 'Under Maintenance'
    CLEANING = 'cleaning', 'Cleaning / Turnover'

class Room(models.Model):
    room_number = models.CharField(max_length=20, unique=True, help_text="Configurable room number, e.g. 101, 102")
    room_type = models.CharField(max_length=100, default='Standard Room', help_text="Configurable category or type")
    floor = models.CharField(max_length=50, blank=True, default='1st Floor')
    capacity = models.PositiveIntegerField(default=2, help_text="Maximum guest capacity")
    base_price_per_night = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'), help_text="Configurable base price per night in INR")
    status = models.CharField(max_length=20, choices=RoomStatus.choices, default=RoomStatus.AVAILABLE)
    description = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True, help_text="True if part of active 14-room inventory")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['room_number']

    def __str__(self):
        return f"Room {self.room_number} - {self.room_type} ({self.get_status_display()})"
