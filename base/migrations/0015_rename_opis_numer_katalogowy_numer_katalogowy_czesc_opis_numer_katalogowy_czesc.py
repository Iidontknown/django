# Generated by Django 4.1.3 on 2022-11-28 21:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_alter_czesc_numer_katalogowy'),
    ]

    operations = [
        migrations.RenameField(
            model_name='numer_katalogowy_czesc',
            old_name='opis_Numer_katalogowy',
            new_name='opis_Numer_katalogowy_Czesc',
        ),
    ]