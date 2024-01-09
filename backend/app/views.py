from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
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

class GradeView(APIView):
    def get(self, request, *args, **kwargs):
        grades = Grade.objects.all()
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)

class UnitView(APIView):
    def get(self, request, *args, **kwargs):
        units = Unit.objects.all()
        serializer = UnitSerializer(units, many=True)
        return Response(serializer.data)

class LessonView(APIView):
    def get(self, request, *args, **kwargs):
        lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

class ProblemView(APIView):
    def get(self, request, *args, **kwargs):
        problems = Problem.objects.all()
        serializer = ProblemSerializer(problems, many=True)
        return Response(serializer.data)

class NotificationsView(APIView):
    def get(self, request, user_id):
        notifications = Notification.objects.filter(user_id=user_id)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AssignmentList(APIView):
    def get(self, request, user_id):
        assignment_reports = AssignmentReport.objects.filter(user_id=user_id)
        serializer = AssignmentSerializer(assignment_reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateNotificationView(APIView):
    def post(self, request):
        # Assuming you pass user_id and message in the request data
        user_id = request.data.get('user_id')
        message = request.data.get('message')

        if user_id and message:
            Notification.objects.create(user_id=user_id, message=message, isRead=False)
            return Response({'message': 'Notification created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid data. Both user_id and message are required.'}, status=status.HTTP_400_BAD_REQUEST)

class CreateAssignmentView(APIView):
    def post(self, request):
        # Assuming you pass user_id and message in the request data
        user_id = request.data.get('user_id')
        date = request.data.get('date')
        grade = request.data.get('grade')
        unit = request.data.get('unit')
        lesson = request.data.get('lesson')
        completedStatus = request.data.get('completedStatus')
        score = request.data.get('score')

        if user_id and date and grade and unit and lesson and completedStatus:
            AssignmentReport.objects.create(user_id=user_id, date=date, grade=grade, unit=unit, lesson=lesson, completedStatus=completedStatus, score=score)
            return Response({'message': 'Assignment created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid data. user_id, grade, unit, and lesson are required.'}, status=status.HTTP_400_BAD_REQUEST)