from django.http import HttpResponse, JsonResponse
from django.db import connection

def health_check(request):
    try:
        # Execute a minimal query to generate database activity in Supabase
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            cursor.fetchone()
            
        # Return a tiny "OK" text response (well under cron-job.org's limit)
        return HttpResponse("OK", content_type="text/plain")
        
    except Exception as e:
        # If the database connection fails, return a 503 error.
        # This tells Render's health checker that the app is unhealthy.
        return JsonResponse(
            {"status": "error", "message": "Database connection failed"},
            status=503
        )
