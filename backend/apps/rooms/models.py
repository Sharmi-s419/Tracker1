from django.db import models
from decimal import Decimal

class RoomStatus(models.TextChoices):
    AVAILABLE = 'available', 'Available'
    OCCUPIED = 'occupied', 'Occupied'
    MAINTENANCE = 'maintenance', 'Under Maintenance'
    CLEANING = 'cleaning', 'Cleaning / Turnover'

<<<<<<< HEAD
ROOM_DISPLAY_NAMES = {
    '001': 'Standard Double Room',
    '002': 'Standard Double Room',
    '101': 'Twin Room',
    '102': 'Standard Double Room',
    '103': 'Standard Double Room',
    '104': 'Standard Double Room',
    '105': 'Standard Double Room',
    '106': 'Standard Double Room',
    '201': 'Twin Room',
    '202': 'Standard Double Room',
    '203': 'Standard Double Room',
    '204': 'Standard Double Room',
    '205': 'Standard Double Room',
    '206': 'Standard Double Room',
}

class Room(models.Model):
    room_number = models.CharField(max_length=20, unique=True, help_text="Configurable room number, e.g. 101, 102")
    name = models.CharField(max_length=100, blank=True, default='', help_text="Unique room display name, e.g. Lara Pearl")
=======
class Room(models.Model):
    room_number = models.CharField(max_length=20, unique=True, help_text="Configurable room number, e.g. 101, 102")
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
    room_type = models.CharField(max_length=100, default='Standard Room', help_text="Configurable category or type")
    bed_type = models.CharField(max_length=100, blank=True, default='Double Bed', help_text="Configurable bed configuration, e.g. Teakwood King Bed, Double Bed")
    floor = models.CharField(max_length=50, blank=True, default='1st Floor')
    capacity = models.PositiveIntegerField(default=2, help_text="Maximum guest capacity")
    base_price_per_night = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'), help_text="Configurable base price per night in INR")
    status = models.CharField(max_length=20, choices=RoomStatus.choices, default=RoomStatus.AVAILABLE)
    amenities = models.TextField(blank=True, default='', help_text="Configurable room amenities")
    description = models.TextField(blank=True, default='')
<<<<<<< HEAD
    image = models.ImageField(upload_to='room_photos/', blank=True, null=True, help_text="Configurable room photo file")
    image_url = models.CharField(max_length=500, blank=True, default='', help_text="Direct or static image URL for room")
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
    is_active = models.BooleanField(default=True, help_text="True if part of active 14-room inventory")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['room_number']

<<<<<<< HEAD
    @property
    def display_name(self):
        return self.name or ROOM_DISPLAY_NAMES.get(str(self.room_number), f"Room {self.room_number}")

    def __str__(self):
        return f"Room {self.room_number} - {self.display_name} ({self.room_type})"
=======
    def __str__(self):
        return f"Room {self.room_number} - {self.room_type} ({self.get_status_display()})"
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
