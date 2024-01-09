from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Grade, Unit, Lesson, Problem, Notification, AssignmentReport

from rest_framework import serializers

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    problems = ProblemSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'

class UnitSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True, read_only=True)

    class Meta:
        model = Grade
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['user', 'message', 'notified', 'isRead']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentReport
        fields = '__all__'