# Generated by Django 3.1.7 on 2021-04-03 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='f_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='l_name',
        ),
    ]
