from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
<<<<<<< HEAD
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
from django.utils.dateparse import parse_date
import datetime

from .models import Room, RoomStatus
from .serializers import RoomSerializer, RoomStatusUpdateSerializer

class RoomListCreateView(generics.ListCreateAPIView):
    """List all 14 rooms or add/configure rooms."""
    serializer_class = RoomSerializer
<<<<<<< HEAD
    parser_classes = [MultiPartParser, FormParser, JSONParser]
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = Room.objects.all().order_by('room_number')
        status_filter = self.request.query_params.get('status')
        room_type = self.request.query_params.get('room_type')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if room_type:
            queryset = queryset.filter(room_type__icontains=room_type)
        return queryset

class RoomDetailUpdateView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or remove a room record."""
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
<<<<<<< HEAD
    parser_classes = [MultiPartParser, FormParser, JSONParser]
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

<<<<<<< HEAD

=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
class RoomStatusUpdateView(APIView):
    """Quick update of room housekeeping/maintenance status (available, cleaning, maintenance, occupied)."""
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            room = Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        if new_status not in RoomStatus.values:
            return Response(
                {'error': f"Invalid status. Allowed values: {', '.join(RoomStatus.values)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        room.status = new_status
        room.save(update_fields=['status', 'updated_at'])
        return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

class RoomAvailabilityView(APIView):
    """
    Returns available rooms for a given inclusive check-in and exclusive check-out date range.
    GET /api/rooms/available/?check_in=YYYY-MM-DD&check_out=YYYY-MM-DD
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        check_in_str = request.query_params.get('check_in')
        check_out_str = request.query_params.get('check_out')

        if not check_in_str or not check_out_str:
            return Response(
                {'error': 'Both check_in and check_out query parameters (YYYY-MM-DD) are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        check_in = parse_date(check_in_str)
        check_out = parse_date(check_out_str)

        if not check_in or not check_out:
            return Response(
                {'error': 'Invalid date format. Please use YYYY-MM-DD.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if check_out <= check_in:
            return Response(
                {'error': 'Check-out date must be strictly after the check-in date.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        from apps.bookings.models import Booking, BookingStatus

        # Find rooms with overlapping active bookings
        # Overlap rule: booking.check_in_date < check_out AND booking.check_out_date > check_in
        occupied_room_ids = Booking.objects.filter(
            status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
            check_in_date__lt=check_out,
            check_out_date__gt=check_in
        ).values_list('room_id', flat=True)

        available_rooms = Room.objects.filter(
            is_active=True
        ).exclude(
            id__in=occupied_room_ids
        ).order_by('room_number')

<<<<<<< HEAD
        serializer = RoomSerializer(available_rooms, many=True, context={'request': request})
=======
        serializer = RoomSerializer(available_rooms, many=True)
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
        return Response({
            'check_in': check_in_str,
            'check_out': check_out_str,
            'nights': (check_out - check_in).days,
            'total_active_rooms': Room.objects.filter(is_active=True).count(),
            'available_count': available_rooms.count(),
            'rooms': serializer.data
        }, status=status.HTTP_200_OK)
