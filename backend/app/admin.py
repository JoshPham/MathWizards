from django.contrib import admin
from .models import Grade, Unit, Lesson, Problem

# Register your models here.
admin.site.register(Grade)
admin.site.register(Unit)
admin.site.register(Lesson)
admin.site.register(Problem)