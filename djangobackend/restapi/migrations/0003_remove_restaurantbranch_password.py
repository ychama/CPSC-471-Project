# Generated by Django 3.1.7 on 2021-04-03 21:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0002_user_user_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurantbranch',
            name='password',
        ),
    ]
