from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve
from .views import health_check 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health_check, name='health_check'),

    path('api/auth/', include('apps.accounts.urls')),
    path('api/rooms/', include('apps.rooms.urls')),
    path('api/guests/', include('apps.guests.urls')),
    path('api/bookings/', include('apps.bookings.urls')),
    path('api/dashboard/', include('apps.bookings.dashboard_urls')),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
