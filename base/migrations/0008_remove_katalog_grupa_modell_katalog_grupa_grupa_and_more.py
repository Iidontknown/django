# Generated by Django 4.1.3 on 2022-11-27 21:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_katalog_nadrzedny_katalog_wlascicel_alter_grupa_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='katalog_grupa',
            name='modell',
        ),
        migrations.AddField(
            model_name='katalog_grupa',
            name='grupa',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.grupa'),
        ),
        migrations.AddField(
            model_name='katalog_grupa',
            name='katalog',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.katalog_nadrzedny'),
        ),
    ]
