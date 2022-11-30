# Generated by Django 4.1.3 on 2022-11-28 21:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_alter_numer_katalogowy_numer_katalogowy_strona'),
    ]

    operations = [
        migrations.RenameField(
            model_name='czesc',
            old_name='opis_Numer_katalogowy',
            new_name='nazwa_Czesc',
        ),
        migrations.RemoveField(
            model_name='czesc',
            name='Strona_katalog',
        ),
        migrations.RemoveField(
            model_name='czesc',
            name='numer_strony',
        ),
        migrations.AddField(
            model_name='czesc',
            name='numer_katalogowy',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, to='base.numer_katalogowy'),
        ),
        migrations.AddField(
            model_name='czesc',
            name='opis_Czesc',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='numer_katalogowy_czesc',
            name='numer_katalogowy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.numer_katalogowy'),
        ),
    ]