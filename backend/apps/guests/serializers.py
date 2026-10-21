from rest_framework import serializers
from .models import Guest

class GuestSerializer(serializers.ModelSerializer):
    bookings_count = serializers.IntegerField(source='bookings.count', read_only=True)

    class Meta:
        model = Guest
        fields = [
            'id',
            'name',
            'phone',
            'email',
            'id_proof_type',
            'id_proof_number',
            'address',
            'city',
            'special_notes',
            'bookings_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
