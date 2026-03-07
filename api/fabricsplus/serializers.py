from rest_framework import serializers
from .models import ContactListModel, ItemListModel, DataPostingCMSModel, FileUploadModel

class ContactListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactListModel
        fields = '__all__'

def filter_heic_files(images):
    """Filter out .heic files from images array"""
    if not images:
        return images

    filtered_images = []
    seen_urls = set()

    for image in images:
        if isinstance(image, dict) and 'url' in image:
            url = image['url']
            # Check if it's a .heic file
            if url.lower().endswith('.heic'):
                continue
            # Check for duplicates
            if url in seen_urls:
                continue
            seen_urls.add(url)
            filtered_images.append(image)
        elif isinstance(image, str):
            # Handle direct URL strings
            if image.lower().endswith('.heic'):
                continue
            if image in seen_urls:
                continue
            seen_urls.add(image)
            filtered_images.append(image)

    return filtered_images

class ItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemListModel
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Filter .heic files and duplicates from thumbnail array
        if data.get('thumbnail'):
            data['thumbnail'] = filter_heic_files(data['thumbnail'])

        # Filter .heic files from banner_image if it's a .heic file
        if data.get('banner_image') and data['banner_image'].lower().endswith('.heic'):
            # Try to find a replacement from thumbnails
            if data.get('thumbnail') and len(data['thumbnail']) > 0:
                data['banner_image'] = data['thumbnail'][0].get('url', data['banner_image'])
            else:
                data['banner_image'] = ''

        return data

class DataPostingCMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataPostingCMSModel
        fields = '__all__'

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUploadModel
        fields = '__all__'

    def validate_file(self, value):
        """Validate uploaded file to reject .heic files"""
        if value:
            filename = value.name.lower()
            if filename.endswith('.heic'):
                raise serializers.ValidationError(
                    "HEIC files are not supported. Please upload JPG, PNG, or WebP images."
                )
        return value