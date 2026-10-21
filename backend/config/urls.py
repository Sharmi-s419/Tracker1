from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include
=======
<<<<<<< HEAD
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
from .views import health_check 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health_check, name='health_check'),
<<<<<<< HEAD
=======
=======
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
    path('api/auth/', include('apps.accounts.urls')),
    path('api/rooms/', include('apps.rooms.urls')),
    path('api/guests/', include('apps.guests.urls')),
    path('api/bookings/', include('apps.bookings.urls')),
    path('api/dashboard/', include('apps.bookings.dashboard_urls')),
<<<<<<< HEAD
]
=======
<<<<<<< HEAD
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

=======
]
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
