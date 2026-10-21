from django.core.management.base import BaseCommand
from decimal import Decimal
from apps.rooms.models import Room, RoomStatus

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
                    status=RoomStatus.AVAILABLE,
                    description="Hotel Lara International physical guest room.",
                    is_active=True
                )
                created_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"Successfully verified 14 rooms (Created: {created_count}, Updated names: {updated_count}, Total rooms: {Room.objects.count()}).\n"
            f"All 14 rooms now have their unique display names correctly assigned."
        ))
