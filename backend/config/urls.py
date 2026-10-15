from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/rooms/', include('apps.rooms.urls')),
    path('api/guests/', include('apps.guests.urls')),
    path('api/bookings/', include('apps.bookings.urls')),
    path('api/dashboard/', include('apps.bookings.dashboard_urls')),
]
