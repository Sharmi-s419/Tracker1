from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'booking_reference',
        'room',
        'guest_name',
        'guest_phone',
        'check_in_date',
        'check_out_date',
        'status',
        'payment_status',
        'total_amount',
        'created_at',
    )
    list_filter = ('status', 'payment_status', 'booking_source', 'check_in_date', 'check_out_date', 'room')
    search_fields = ('booking_reference', 'guest_name', 'guest_phone', 'guest_email', 'room__room_number')
    date_hierarchy = 'check_in_date'
