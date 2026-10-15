from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import StaffLoginView, UserProfileView

urlpatterns = [
    path('login/', StaffLoginView.as_view(), name='staff-login'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
