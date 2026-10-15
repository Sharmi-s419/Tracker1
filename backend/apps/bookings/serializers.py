from rest_framework import serializers
from django.db import transaction
from django.utils.dateparse import parse_date
import datetime

from apps.rooms.models import Room, RoomStatus
from apps.rooms.serializers import RoomSerializer
from apps.guests.models import Guest
from apps.guests.serializers import GuestSerializer
from .models import Booking, BookingStatus, BookingSource, PaymentStatus

class BookingListSerializer(serializers.ModelSerializer):
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    room_type = serializers.CharField(source='room.room_type', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payment_status_display = serializers.CharField(source='get_payment_status_display', read_only=True)
    booking_source_display = serializers.CharField(source='get_booking_source_display', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id',
            'booking_reference',
            'room',
            'room_number',
            'room_type',
            'guest',
            'guest_name',
            'guest_phone',
            'guest_email',
            'check_in_date',
            'check_out_date',
            'adults',
            'children',
            'number_of_nights',
            'price_per_night',
            'total_amount',
            'booking_source',
            'booking_source_display',
            'status',
            'status_display',
            'payment_status',
            'payment_status_display',
            'created_at',
            'updated_at',
        ]

class BookingDetailSerializer(serializers.ModelSerializer):
    room_details = RoomSerializer(source='room', read_only=True)
    guest_details = GuestSerializer(source='guest', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payment_status_display = serializers.CharField(source='get_payment_status_display', read_only=True)
    booking_source_display = serializers.CharField(source='get_booking_source_display', read_only=True)
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True, default='')

    class Meta:
        model = Booking
        fields = [
            'id',
            'booking_reference',
            'room',
            'room_details',
            'guest',
            'guest_details',
            'guest_name',
            'guest_phone',
            'guest_email',
            'check_in_date',
            'check_out_date',
            'adults',
            'children',
            'number_of_nights',
            'price_per_night',
            'total_amount',
            'booking_source',
            'booking_source_display',
            'status',
            'status_display',
            'payment_status',
            'payment_status_display',
            'payment_notes',
            'special_requests',
            'check_in_time',
            'check_out_time',
            'created_by',
            'created_by_name',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'booking_reference', 'created_at', 'updated_at']

class BookingCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Handles robust booking creation and updates with transactional double-booking prevention.
    Supports either linking an existing guest (guest_id) or passing guest fields directly.
    """
    guest_id = serializers.IntegerField(required=False, write_only=True)
    guest_name = serializers.CharField(required=True)
    guest_phone = serializers.CharField(required=True)
    guest_email = serializers.EmailField(required=False, allow_blank=True, default='')
    room_id = serializers.IntegerField(required=True, write_only=True)

    class Meta:
        model = Booking
        fields = [
            'id',
            'booking_reference',
            'room_id',
            'guest_id',
            'guest_name',
            'guest_phone',
            'guest_email',
            'check_in_date',
            'check_out_date',
            'adults',
            'children',
            'price_per_night',
            'total_amount',
            'booking_source',
            'status',
            'payment_status',
            'payment_notes',
            'special_requests',
        ]
        read_only_fields = ['id', 'booking_reference']

    def validate(self, attrs):
        check_in = attrs.get('check_in_date') or (self.instance.check_in_date if self.instance else None)
        check_out = attrs.get('check_out_date') or (self.instance.check_out_date if self.instance else None)
        room_id = attrs.get('room_id') or (self.instance.room_id if self.instance else None)
        new_status = attrs.get('status') or (self.instance.status if self.instance else BookingStatus.CONFIRMED)

        if not check_in or not check_out:
            raise serializers.ValidationError({"date": "Both check-in and check-out dates are required."})

        if check_out <= check_in:
            raise serializers.ValidationError({"check_out_date": "Check-out date must be strictly after the check-in date."})

        if not room_id:
            raise serializers.ValidationError({"room_id": "Please select a room."})

        try:
            room = Room.objects.get(pk=room_id)
        except Room.DoesNotExist:
            raise serializers.ValidationError({"room_id": "Selected room does not exist."})

        # Calculate nights
        nights = (check_out - check_in).days
        attrs['number_of_nights'] = nights

        # Determine price per night and total amount
        price_per_night = attrs.get('price_per_night')
        if not price_per_night and room.base_price_per_night > 0:
            price_per_night = room.base_price_per_night
            attrs['price_per_night'] = price_per_night

        if price_per_night:
            attrs['total_amount'] = price_per_night * nights

        # Concurrency & Double Booking check
        if new_status in [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN]:
            overlapping = Booking.objects.filter(
                room_id=room_id,
                status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
                check_in_date__lt=check_out,
                check_out_date__gt=check_in
            )
            if self.instance and self.instance.pk:
                overlapping = overlapping.exclude(pk=self.instance.pk)

            if overlapping.exists():
                conflict = overlapping.first()
                raise serializers.ValidationError({
                    "room_id": f"Room {room.room_number} is already booked from {conflict.check_in_date} to {conflict.check_out_date} (Ref: {conflict.booking_reference}). Please choose another room or different dates."
                })

        return attrs

    def create(self, validated_data):
        guest_id = validated_data.pop('guest_id', None)
        room_id = validated_data.pop('room_id')
        guest_name = validated_data.get('guest_name')
        guest_phone = validated_data.get('guest_phone')
        guest_email = validated_data.get('guest_email', '')

        with transaction.atomic():
            # Concurrency row-level lock on the room to prevent race conditions
            room = Room.objects.select_for_update().get(pk=room_id)

            # Resolve or create guest
            if guest_id:
                guest = Guest.objects.get(pk=guest_id)
            else:
                guest, _ = Guest.objects.get_or_create(
                    phone=guest_phone,
                    defaults={'name': guest_name, 'email': guest_email}
                )

            # Final check within the atomic locked transaction
            check_in = validated_data['check_in_date']
            check_out = validated_data['check_out_date']
            status_val = validated_data.get('status', BookingStatus.CONFIRMED)

            if status_val in [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN]:
                has_conflict = Booking.objects.select_for_update().filter(
                    room=room,
                    status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
                    check_in_date__lt=check_out,
                    check_out_date__gt=check_in
                ).exists()

                if has_conflict:
                    raise serializers.ValidationError({
                        "room_id": f"Room {room.room_number} was just booked by another session. Please pick another room."
                    })

            user = self.context.get('request').user if self.context.get('request') else None
            booking = Booking.objects.create(
                room=room,
                guest=guest,
                created_by=user if user and user.is_authenticated else None,
                **validated_data
            )
            return booking

    def update(self, instance, validated_data):
        guest_id = validated_data.pop('guest_id', None)
        room_id = validated_data.pop('room_id', None)

        with transaction.atomic():
            if room_id:
                room = Room.objects.select_for_update().get(pk=room_id)
                instance.room = room

            if guest_id:
                instance.guest = Guest.objects.get(pk=guest_id)

            check_in = validated_data.get('check_in_date', instance.check_in_date)
            check_out = validated_data.get('check_out_date', instance.check_out_date)
            status_val = validated_data.get('status', instance.status)

            if status_val in [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN]:
                has_conflict = Booking.objects.select_for_update().filter(
                    room=instance.room,
                    status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
                    check_in_date__lt=check_out,
                    check_out_date__gt=check_in
                ).exclude(pk=instance.pk).exists()

                if has_conflict:
                    raise serializers.ValidationError({
                        "room_id": f"Room {instance.room.room_number} has an overlapping booking for those dates."
                    })

            for attr, value in validated_data.items():
                setattr(instance, attr, value)

            instance.save()
            return instance
