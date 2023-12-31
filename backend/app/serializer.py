from rest_framework.serializers import ModelSerializer
from .models import Grade, Unit, Lesson, Problem

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