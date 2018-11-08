from django.db import models

# Create your models here.

class User(models.Model):
    phone = models.CharField(max_length=50)
    password = models.CharField(max_length=220)
    token = models.CharField(max_length=220)
