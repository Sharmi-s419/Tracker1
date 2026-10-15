from django.urls import path
from .views import (
    RoomListCreateView,
    RoomDetailUpdateView,
    RoomStatusUpdateView,
    RoomAvailabilityView,
)

urlpatterns = [
    path('', RoomListCreateView.as_view(), name='room-list-create'),
    path('available/', RoomAvailabilityView.as_view(), name='room-available'),
    path('<int:pk>/', RoomDetailUpdateView.as_view(), name='room-detail'),
    path('<int:pk>/status/', RoomStatusUpdateView.as_view(), name='room-status-update'),
]
