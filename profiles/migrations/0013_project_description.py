# Generated by Django 4.2 on 2024-10-16 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0012_alter_education_grade"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="description",
            field=models.CharField(blank=True, max_length=160, null=True),
        ),
    ]
