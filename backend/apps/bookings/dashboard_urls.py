from django.urls import path
from .views import DashboardStatsView, DashboardReportsView

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('reports/', DashboardReportsView.as_view(), name='dashboard-reports'),
]
