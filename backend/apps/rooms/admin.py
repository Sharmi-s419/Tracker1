from django.contrib import admin
from .models import Room

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_number', 'room_type', 'floor', 'capacity', 'base_price_per_night', 'status', 'is_active')
    list_filter = ('status', 'room_type', 'floor', 'is_active')
    search_fields = ('room_number', 'room_type', 'description')
