# Generated by Django 4.1.3 on 2022-11-21 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_producent'),
    ]

    operations = [
        migrations.CreateModel(
            name='Modell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa_model', models.TextField()),
            ],
        ),
        migrations.RemoveField(
            model_name='producent',
            name='user',
        ),
    ]
