# Generated by Django 3.1.7 on 2021-04-10 00:18

import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('phone_num', models.CharField(max_length=255)),
                ('house_num', models.CharField(max_length=255)),
                ('postal_code', models.CharField(max_length=255)),
                ('street_num', models.CharField(max_length=255)),
                ('user_role', models.CharField(default='customer', max_length=255)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='RestaurantBranch',
            fields=[
                ('branch_id', models.IntegerField(primary_key=True, serialize=False)),
                ('phone_num', models.CharField(max_length=255)),
                ('house_num', models.CharField(max_length=255)),
                ('postal_code', models.CharField(max_length=255)),
                ('street_num', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('supplier_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('house_num', models.CharField(max_length=255)),
                ('postal_code', models.CharField(max_length=255)),
                ('street_num', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='restapi.user')),
                ('salary', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='restapi.user')),
                ('card_num', models.CharField(max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='restapi.user')),
                ('salary', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('ingredient_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('quantity', models.IntegerField()),
                ('supplier', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restapi.supplier')),
            ],
        ),
        migrations.CreateModel(
            name='FoodItem',
            fields=[
                ('name', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('price', models.FloatField()),
                ('restaurant_branches', models.ManyToManyField(related_name='food_items', to='restapi.RestaurantBranch')),
            ],
        ),
        migrations.AddField(
            model_name='restaurantbranch',
            name='manager',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='branch', to='restapi.manager'),
        ),
        migrations.CreateModel(
            name='FoodUses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('food_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.fooditem')),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.ingredient')),
            ],
            options={
                'unique_together': {('ingredient', 'food_item')},
            },
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('salary', models.FloatField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='restapi.user')),
                ('branch', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restapi.restaurantbranch')),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('vin', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('model', models.CharField(max_length=255)),
                ('make', models.CharField(max_length=255)),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.restaurantbranch')),
                ('drivers', models.ManyToManyField(related_name='vehicles', to='restapi.Driver')),
            ],
            options={
                'unique_together': {('vin', 'branch')},
            },
        ),
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('start_time', models.DateTimeField()),
                ('duration', models.IntegerField()),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.driver')),
                ('manager', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restapi.manager')),
            ],
            options={
                'unique_together': {('start_time', 'driver')},
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField()),
                ('order_delivered', models.BooleanField(default=False)),
                ('food_items', models.ManyToManyField(related_name='orders', to='restapi.FoodItem')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.customer')),
                ('driver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restapi.driver')),
            ],
            options={
                'unique_together': {('order_date', 'customer')},
            },
        ),
    ]
