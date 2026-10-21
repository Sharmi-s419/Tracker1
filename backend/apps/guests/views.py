from rest_framework import generics, permissions, filters
from django.db.models import Q
from .models import Guest
from .serializers import GuestSerializer

class GuestListCreateView(generics.ListCreateAPIView):
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Guest.objects.all().order_by('-created_at')
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(phone__icontains=search) |
                Q(email__icontains=search) |
                Q(city__icontains=search)
            )
        return queryset

class GuestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAuthenticated]
