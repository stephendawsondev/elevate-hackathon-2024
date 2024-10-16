# Generated by Django 4.2 on 2024-10-14 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0011_alter_project_deployed_url"),
        ("cv_template", "0004_alter_cvtemplate_cv_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="cvtemplate",
            name="projects",
            field=models.ManyToManyField(
                related_name="cv_projects", to="profiles.project"
            ),
        ),
    ]
