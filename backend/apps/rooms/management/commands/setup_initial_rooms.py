from django.core.management.base import BaseCommand
from decimal import Decimal
from apps.rooms.models import Room, RoomStatus

class Command(BaseCommand):
    help = "Initializes the 14 physical rooms for Hotel Lara International without inventing real prices or categories."

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Reset room inventory back to default 14 rooms.'
        )

    def handle(self, *args, **options):
        reset = options.get('reset', False)

        if reset:
            self.stdout.write(self.style.WARNING("Resetting existing rooms..."))
            Room.objects.all().delete()

        existing_count = Room.objects.count()
        if existing_count >= 14 and not reset:
            self.stdout.write(self.style.SUCCESS(
                f"Room inventory already has {existing_count} rooms. No duplicate rooms created.\n"
                f"Staff can configure details via the staff dashboard or Django admin."
            ))
            return

        rooms_to_create = 14 - existing_count
        created_count = 0

        # Create the initial 14 physical rooms with placeholder numbering 101 to 114
        for i in range(1, 15):
            room_num = f"{100 + i}"
            if not Room.objects.filter(room_number=room_num).exists():
                Room.objects.create(
                    room_number=room_num,
                    room_type="Standard Room",  # Configurable by hotel staff
                    floor="1st Floor" if i <= 7 else "2nd Floor",
                    capacity=2,
                    base_price_per_night=Decimal('0.00'),  # Configurable by hotel staff
                    status=RoomStatus.AVAILABLE,
                    description="Hotel Lara International physical guest room.",
                    is_active=True
                )
                created_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"Successfully initialized {created_count} rooms (Total rooms: {Room.objects.count()}).\n"
            f"Hotel management can now enter real room numbers, types, and tariffs via the Staff Dashboard."
        ))
