# Generated by Django 4.1.3 on 2022-11-27 20:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0006_rename_wlasciciel_zdjecie_wlasciciel_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='katalog_nadrzedny',
            name='katalog_wlascicel',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='grupa',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='katalog_nadrzedny',
            name='modell',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.modell'),
        ),
        migrations.AlterField(
            model_name='zdjecie',
            name='wlasciciel',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Katalog_Grupa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('modell', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.modell')),
            ],
        ),
    ]
