# Generated by Django 4.1.3 on 2022-11-30 18:17

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_remove_zdjecie_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='zdjecie',
            name='image_url',
            field=imagekit.models.fields.ProcessedImageField(blank=True, null=True, upload_to='images'),
        ),
    ]