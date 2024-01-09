from django.contrib import admin
from .models import Grade, Unit, Lesson, Problem, AssignmentReport, Notification

# Register your models here.
admin.site.register(Grade)
admin.site.register(Unit)
admin.site.register(Lesson)
admin.site.register(Problem)
admin.site.register(AssignmentReport)
admin.site.register(Notification)