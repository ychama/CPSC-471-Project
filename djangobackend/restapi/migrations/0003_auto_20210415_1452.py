# Generated by Django 3.1.7 on 2021-04-15 20:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0002_auto_20210409_2215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shift',
            name='driver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shifts', to='restapi.driver'),
        ),
    ]
