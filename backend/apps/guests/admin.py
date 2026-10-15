from django.contrib import admin
from .models import Guest

@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'city', 'id_proof_type', 'created_at')
    search_fields = ('name', 'phone', 'email', 'city', 'id_proof_number')
