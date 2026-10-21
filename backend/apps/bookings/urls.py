from django.urls import path
from .views import (
    BookingListCreateView,
    BookingDetailUpdateView,
    BookingCheckInView,
    BookingCheckOutView,
    BookingCancelView,
)

urlpatterns = [
    path('', BookingListCreateView.as_view(), name='booking-list-create'),
    path('<int:pk>/', BookingDetailUpdateView.as_view(), name='booking-detail'),
    path('<int:pk>/check-in/', BookingCheckInView.as_view(), name='booking-check-in'),
    path('<int:pk>/check-out/', BookingCheckOutView.as_view(), name='booking-check-out'),
    path('<int:pk>/cancel/', BookingCancelView.as_view(), name='booking-cancel'),
]
