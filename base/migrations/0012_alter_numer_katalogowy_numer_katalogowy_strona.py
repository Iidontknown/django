# Generated by Django 4.1.3 on 2022-11-28 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_rename_numer_strony_numer_katalogowy_numer_katalogowy_strona'),
    ]

    operations = [
        migrations.AlterField(
            model_name='numer_katalogowy',
            name='numer_katalogowy_strona',
            field=models.TextField(),
        ),
    ]
