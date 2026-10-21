from rest_framework import serializers
from .models import Room, RoomStatus

class RoomSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
<<<<<<< HEAD
=======
<<<<<<< HEAD
    display_name = serializers.CharField(read_only=True)
    photo_url = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f

    class Meta:
        model = Room
        fields = [
            'id',
            'room_number',
<<<<<<< HEAD
=======
<<<<<<< HEAD
            'name',
            'display_name',
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
            'room_type',
            'bed_type',
            'floor',
            'capacity',
            'base_price_per_night',
            'status',
            'status_display',
            'amenities',
            'description',
<<<<<<< HEAD
=======
<<<<<<< HEAD
            'image',
            'image_url',
            'photo_url',
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
            'is_active',
            'created_at',
            'updated_at',
        ]
<<<<<<< HEAD
        read_only_fields = ['id', 'created_at', 'updated_at']
=======
<<<<<<< HEAD
        read_only_fields = ['id', 'display_name', 'created_at', 'updated_at', 'photo_url']

    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            try:
                url = obj.image.url
                if request:
                    return request.build_absolute_uri(url)
                return url
            except Exception:
                pass
        if obj.image_url:
            return obj.image_url
        return None

    def to_internal_value(self, data):
        # If client passes existing image string or empty string instead of a File, don't fail validation
        if hasattr(data, '_mutable'):
            data = data.copy()
        elif isinstance(data, dict):
            data = dict(data)
        if 'image' in data and not hasattr(data['image'], 'read'):
            # It's not an uploaded file (could be string or null), remove it so existing image is retained
            data.pop('image', None)
        return super().to_internal_value(data)

=======
        read_only_fields = ['id', 'created_at', 'updated_at']
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f

class RoomStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['status']
