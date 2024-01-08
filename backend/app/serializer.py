from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Grade, Unit, Lesson, Problem, Notification, AssignmentReport

class GradeSerializer(ModelSerializer):
    class Meta:
        model = Grade
        fields = ['grade_id', 'title', 'description', 'units']
        
class UnitSerializer(ModelSerializer):
    class Meta:
        model = Unit
        fields = ['grade', 'unit_id', 'title', 'description', 'lessons']

class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['unit', 'lesson_id', 'title', 'description', 'content', 'problems']

class ProblemSerializer(ModelSerializer):
    class Meta:
        model = Problem
        fields = ['lesson', 'text_question', 'num_answer', 'answer_a', 'answer_b', 'answer_c', 'answer_d']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['user', 'message', 'notified', 'isRead']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentReport
        fields = '__all__'