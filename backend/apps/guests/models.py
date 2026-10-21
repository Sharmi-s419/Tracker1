from django.db import models

class Guest(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    phone = models.CharField(max_length=25, db_index=True)
    email = models.EmailField(blank=True, default='')
    id_proof_type = models.CharField(max_length=50, blank=True, default='', help_text="e.g. Aadhaar, Passport, Driving License")
    id_proof_number = models.CharField(max_length=100, blank=True, default='')
    address = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    special_notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.phone})"
