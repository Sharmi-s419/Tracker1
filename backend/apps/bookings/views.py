from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from django.db.models import Q, Count, Sum
from django.utils import timezone
from django.utils.dateparse import parse_date
import datetime

from apps.rooms.models import Room, RoomStatus
from .models import Booking, BookingStatus, BookingSource, PaymentStatus
from .serializers import (
    BookingListSerializer,
    BookingDetailSerializer,
    BookingCreateUpdateSerializer
)

class BookingListCreateView(generics.ListCreateAPIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BookingCreateUpdateSerializer
        return BookingListSerializer

    def get_queryset(self):
        queryset = Booking.objects.select_related('room', 'guest').all().order_by('-created_at')

        # Text search across reference, guest name, guest phone
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(booking_reference__icontains=search) |
                Q(guest_name__icontains=search) |
                Q(guest_phone__icontains=search) |
                Q(room__room_number__icontains=search)
            )

        # Filters
        room_id = self.request.query_params.get('room_id')
        if room_id:
            queryset = queryset.filter(room_id=room_id)

        status_val = self.request.query_params.get('status')
        if status_val:
            queryset = queryset.filter(status=status_val)

        payment_status_val = self.request.query_params.get('payment_status')
        if payment_status_val:
            queryset = queryset.filter(payment_status=payment_status_val)

        source_val = self.request.query_params.get('source')
        if source_val:
            queryset = queryset.filter(booking_source=source_val)

        date_from = self.request.query_params.get('date_from')
        if date_from:
            d = parse_date(date_from)
            if d:
                queryset = queryset.filter(check_in_date__gte=d)

        date_to = self.request.query_params.get('date_to')
        if date_to:
            d = parse_date(date_to)
            if d:
                queryset = queryset.filter(check_out_date__lte=d)

        return queryset

class BookingDetailUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.select_related('room', 'guest').all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return BookingCreateUpdateSerializer
        return BookingDetailSerializer

class BookingCheckInView(views.APIView):
    """Marks booking as Checked-In, updates room status to Occupied, records check-in timestamp."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            booking = Booking.objects.select_related('room').get(pk=pk)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

        if booking.status == BookingStatus.CANCELLED:
            return Response({'error': 'Cannot check in a cancelled booking.'}, status=status.HTTP_400_BAD_REQUEST)

        booking.status = BookingStatus.CHECKED_IN
        booking.check_in_time = timezone.now()
        booking.save(update_fields=['status', 'check_in_time', 'updated_at'])

        # Update room status to occupied
        room = booking.room
        room.status = RoomStatus.OCCUPIED
        room.save(update_fields=['status', 'updated_at'])

        return Response(BookingDetailSerializer(booking).data, status=status.HTTP_200_OK)

class BookingCheckOutView(views.APIView):
    """Marks booking as Checked-Out, updates room status to Cleaning / Turnover, records check-out timestamp."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            booking = Booking.objects.select_related('room').get(pk=pk)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

        booking.status = BookingStatus.CHECKED_OUT
        booking.check_out_time = timezone.now()
        booking.save(update_fields=['status', 'check_out_time', 'updated_at'])

        # Room enters cleaning / turnover
        room = booking.room
        room.status = RoomStatus.CLEANING
        room.save(update_fields=['status', 'updated_at'])

        return Response(BookingDetailSerializer(booking).data, status=status.HTTP_200_OK)

class BookingCancelView(views.APIView):
    """Cancels a booking, freeing up room availability immediately."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            booking = Booking.objects.select_related('room').get(pk=pk)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

        cancellation_reason = request.data.get('reason', '')
        booking.status = BookingStatus.CANCELLED
        if cancellation_reason:
            booking.special_requests += f"\n[Cancelled: {cancellation_reason}]"
        booking.save(update_fields=['status', 'special_requests', 'updated_at'])

        # If room was marked occupied by this booking, restore to available
        room = booking.room
        if room.status == RoomStatus.OCCUPIED:
            room.status = RoomStatus.AVAILABLE
            room.save(update_fields=['status', 'updated_at'])

        return Response(BookingDetailSerializer(booking).data, status=status.HTTP_200_OK)

class DashboardStatsView(views.APIView):
    """
    Returns real-time aggregated dashboard KPIs for hotel staff:
    - Total rooms count (14)
    - Available rooms today
    - Occupied rooms today
    - Today's check-ins (count & list)
    - Today's check-outs (count & list)
    - Upcoming reservations (next 7 days)
    - Cancelled reservations
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()
        total_rooms = Room.objects.filter(is_active=True).count()

        # Find rooms occupied today (active bookings covering today)
        active_today_bookings = Booking.objects.filter(
            status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
            check_in_date__lte=today,
            check_out_date__gt=today
        )
        occupied_room_ids = active_today_bookings.values_list('room_id', flat=True)
        occupied_rooms_count = len(set(occupied_room_ids))
        available_rooms_count = max(0, total_rooms - occupied_rooms_count)

        # Today's check-ins
        today_checkins = Booking.objects.select_related('room').filter(
            check_in_date=today,
            status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN]
        ).order_by('room__room_number')

        # Today's check-outs
        today_checkouts = Booking.objects.select_related('room').filter(
            check_out_date=today,
            status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN, BookingStatus.CHECKED_OUT]
        ).order_by('room__room_number')

        # Upcoming reservations (next 7 days, excluding today)
        next_week = today + datetime.timedelta(days=7)
        upcoming = Booking.objects.select_related('room').filter(
            check_in_date__gt=today,
            check_in_date__lte=next_week,
            status=BookingStatus.CONFIRMED
        ).order_by('check_in_date')

        # Cancelled reservations total
        cancelled_count = Booking.objects.filter(status=BookingStatus.CANCELLED).count()

        # Room status distribution
        rooms_by_status = {
            'available': Room.objects.filter(is_active=True, status=RoomStatus.AVAILABLE).count(),
            'occupied': Room.objects.filter(is_active=True, status=RoomStatus.OCCUPIED).count(),
            'cleaning': Room.objects.filter(is_active=True, status=RoomStatus.CLEANING).count(),
            'maintenance': Room.objects.filter(is_active=True, status=RoomStatus.MAINTENANCE).count(),
        }

        return Response({
            'today': today.isoformat(),
            'total_rooms': total_rooms,
            'available_rooms': available_rooms_count,
            'occupied_rooms': occupied_rooms_count,
            'today_checkins_count': today_checkins.count(),
            'today_checkins': BookingListSerializer(today_checkins, many=True).data,
            'today_checkouts_count': today_checkouts.count(),
            'today_checkouts': BookingListSerializer(today_checkouts, many=True).data,
            'upcoming_reservations_count': upcoming.count(),
            'upcoming_reservations': BookingListSerializer(upcoming[:10], many=True).data,
            'cancelled_count': cancelled_count,
            'rooms_by_status': rooms_by_status,
        }, status=status.HTTP_200_OK)

class DashboardReportsView(views.APIView):
    """Basic management reports: occupancy, revenue, sources."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()
        month_start = today.replace(day=1)

        total_bookings = Booking.objects.count()
        confirmed_bookings = Booking.objects.filter(status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN, BookingStatus.CHECKED_OUT]).count()
        total_revenue = Booking.objects.filter(status__in=[BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN, BookingStatus.CHECKED_OUT]).aggregate(s=Sum('total_amount'))['s'] or 0

        # Booking sources breakdown
        sources = Booking.objects.values('booking_source').annotate(count=Count('id')).order_by('-count')

        # Status breakdown
        statuses = Booking.objects.values('status').annotate(count=Count('id')).order_by('-count')

        # Payment status breakdown
        payments = Booking.objects.values('payment_status').annotate(count=Count('id')).order_by('-count')

        return Response({
            'total_bookings': total_bookings,
            'confirmed_bookings': confirmed_bookings,
            'total_revenue': float(total_revenue),
            'sources': list(sources),
            'statuses': list(statuses),
            'payments': list(payments),
        }, status=status.HTTP_200_OK)
