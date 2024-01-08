from django.db import models
from authentication.models import User

class Grade(models.Model):
    grade_id = models.IntegerField(default=1)
    title = models.CharField(max_length=255)
    description = models.TextField()
    units = models.ManyToManyField('Unit', related_name='grades')

    def __str__(self):
        return f"Grade {self.grade_id} - {self.title}"

class Unit(models.Model):
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    unit_id = models.IntegerField(default=1)
    title = models.CharField(max_length=255)
    description = models.TextField()
    lessons = models.ManyToManyField('Lesson', related_name='units')

    def __str__(self):
        return f"Unit {self.unit_id} - {self.title} (Grade: {self.grade.title})"

class Lesson(models.Model):
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    lesson_id = models.IntegerField(default=1)
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.TextField()
    problems = models.ManyToManyField('Problem', related_name='lessons')

    def __str__(self):
        return f"Lesson {self.lesson_id} - {self.title} (Grade: {self.unit.grade.title})"

class Problem(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    text_question = models.TextField()
    num_answer = models.IntegerField(null=True)
    answer_a = models.CharField(max_length=255, null=True)
    answer_b = models.CharField(max_length=255, null=True)
    answer_c = models.CharField(max_length=255, null=True)
    answer_d = models.CharField(max_length=255, null=True)
    letter_answer = models.CharField(max_length=1, default='a', null=True)

    def __str__(self):
        return f"Question: {self.text_question} (Lesson: {self.lesson.title}, Unit: {self.lesson.unit.title}, Grade: {self.lesson.unit.grade.title})"


class Notification(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    message = models.TextField()
    notified = models.DateTimeField(auto_now_add=True)
    isRead = models.BooleanField(False)

    def __str__(self):
        return f"{self.user}: {self.message}"
    
class AssignmentReport(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    unit = models.CharField(max_length=255)
    lesson = models.CharField(max_length=255)
    grade = models.IntegerField()
    completedStatus = models.CharField(max_length=255)
    score = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return f"{self.user}: {self.grade}: {self.lesson}"