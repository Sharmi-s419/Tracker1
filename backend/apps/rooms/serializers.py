from rest_framework import serializers
from .models import Room, RoomStatus

class RoomSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Room
        fields = [
            'id',
            'room_number',
            'room_type',
            'bed_type',
            'floor',
            'capacity',
            'base_price_per_night',
            'status',
            'status_display',
            'amenities',
            'description',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class RoomStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['status']
