from django.core.management.base import BaseCommand
from decimal import Decimal
from apps.rooms.models import Room, RoomStatus

<<<<<<< HEAD
class Command(BaseCommand):
    help = "Initializes the 14 physical rooms for Hotel Lara International without inventing real prices or categories."
=======
<<<<<<< HEAD
INITIAL_ROOMS = [
    {'number': '001', 'name': 'Standard Double Room', 'floor': 'Ground Floor', 'bed': 'Double Bed'},
    {'number': '002', 'name': 'Standard Double Room', 'floor': 'Ground Floor', 'bed': 'Double Bed'},
    {'number': '101', 'name': 'Twin Room', 'floor': 'First Floor', 'bed': 'Twin Beds'},
    {'number': '102', 'name': 'Standard Double Room', 'floor': 'First Floor', 'bed': 'Double Bed'},
    {'number': '103', 'name': 'Standard Double Room', 'floor': 'First Floor', 'bed': 'Double Bed'},
    {'number': '104', 'name': 'Standard Double Room', 'floor': 'First Floor', 'bed': 'Double Bed'},
    {'number': '105', 'name': 'Standard Double Room', 'floor': 'First Floor', 'bed': 'Double Bed'},
    {'number': '106', 'name': 'Standard Double Room', 'floor': 'First Floor', 'bed': 'Double Bed'},
    {'number': '201', 'name': 'Twin Room', 'floor': 'Second Floor', 'bed': 'Twin Beds'},
    {'number': '202', 'name': 'Standard Double Room', 'floor': 'Second Floor', 'bed': 'Double Bed'},
    {'number': '203', 'name': 'Standard Double Room', 'floor': 'Second Floor', 'bed': 'Double Bed'},
    {'number': '204', 'name': 'Standard Double Room', 'floor': 'Second Floor', 'bed': 'Double Bed'},
    {'number': '205', 'name': 'Standard Double Room', 'floor': 'Second Floor', 'bed': 'Double Bed'},
    {'number': '206', 'name': 'Standard Double Room', 'floor': 'Second Floor', 'bed': 'Double Bed'},
]

class Command(BaseCommand):
    help = "Initializes the 14 physical rooms with unique display names across Ground, First, and Second floors."
=======
class Command(BaseCommand):
    help = "Initializes the 14 physical rooms for Hotel Lara International without inventing real prices or categories."
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f

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

<<<<<<< HEAD
=======
<<<<<<< HEAD
        created_count = 0
        updated_count = 0

        # Ensure all 14 physical rooms exist and have their unique display names and floors assigned
        for item in INITIAL_ROOMS:
            room_num = item['number']
            room = Room.objects.filter(room_number=room_num).first()

            if room:
                updates = []
                if room.name != item['name']:
                    room.name = item['name']
                    updates.append('name')
                if room.floor != item['floor']:
                    room.floor = item['floor']
                    updates.append('floor')
                if room.bed_type != item['bed']:
                    room.bed_type = item['bed']
                    updates.append('bed_type')
                if updates:
                    updates.append('updated_at')
                    room.save(update_fields=updates)
                    updated_count += 1
            else:
                Room.objects.create(
                    room_number=room_num,
                    name=item['name'],
                    room_type="Standard Room",
                    floor=item['floor'],
                    bed_type=item['bed'],
                    capacity=2,
                    base_price_per_night=Decimal('0.00'),
=======
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
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
<<<<<<< HEAD
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
                    status=RoomStatus.AVAILABLE,
                    description="Hotel Lara International physical guest room.",
                    is_active=True
                )
                created_count += 1

        self.stdout.write(self.style.SUCCESS(
<<<<<<< HEAD
            f"Successfully initialized {created_count} rooms (Total rooms: {Room.objects.count()}).\n"
            f"Hotel management can now enter real room numbers, types, and tariffs via the Staff Dashboard."
=======
<<<<<<< HEAD
            f"Successfully verified 14 rooms (Created: {created_count}, Updated names: {updated_count}, Total rooms: {Room.objects.count()}).\n"
            f"All 14 rooms now have their unique display names correctly assigned."
=======
            f"Successfully initialized {created_count} rooms (Total rooms: {Room.objects.count()}).\n"
            f"Hotel management can now enter real room numbers, types, and tariffs via the Staff Dashboard."
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
        ))
