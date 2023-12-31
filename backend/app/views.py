from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import *
from .serializer import * 
from django.http import JsonResponse

def home(request):
    return render(request, "home.html")

# All data
def grades(request):
    grades = Grade.objects.all()
    return render(request, 'grades.html', {'grades': grades})

def units(request):
    units = Unit.objects.all()
    return render(request, 'units.html', {'units': units})

def lessons(request):
    lessons = Lesson.objects.all()
    return render(request, 'lessons.html', {'lessons': lessons})

def problems(request):
    problems = Problem.objects.all()
    return render(request, 'problems.html', {'problems': problems})

# Query data by id (data sent to frontend)
def get_grades(request):
    grades = Grade.objects.all()
    serializer = GradeSerializer(grades, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_units(request, grade_id):
    units = Unit.objects.filter(grade__grade_id=grade_id)
    serializer = UnitSerializer(units, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_lessons(request, grade_id, unit_id):
    lessons = Lesson.objects.filter(unit__grade__grade_id=grade_id, unit__unit_id=unit_id)
    serializer = LessonSerializer(lessons, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_problems(request, grade_id, unit_id, lesson_id):
    problems = Problem.objects.filter(lesson__unit__grade__grade_id=grade_id, lesson__unit__unit_id=unit_id, lesson__lesson_id=lesson_id)
    serializer = ProblemSerializer(problems, many=True)
    return JsonResponse(serializer.data, safe=False)