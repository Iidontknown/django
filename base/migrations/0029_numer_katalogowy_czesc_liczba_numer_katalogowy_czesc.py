# Generated by Django 4.1.3 on 2023-01-17 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0028_numer_katalogowy_lista_liczba'),
    ]

    operations = [
        migrations.AddField(
            model_name='numer_katalogowy_czesc',
            name='liczba_Numer_katalogowy_Czesc',
            field=models.PositiveIntegerField(default=1),
        ),
    ]