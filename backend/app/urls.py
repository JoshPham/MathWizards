from . import views
from .views import *
from django.urls import path

urlpatterns = [
    path('', views.home, name="home"),
    
    # View data
    path('all-grades/', grades, name="all_grades"),
    path('all-units/', units, name='all_units'),
    path('all-lessons/', lessons, name='all_lessons'),
    path('all-problems/', problems, name='all_problems'),
    
    # Frontend data
    path('grades/', get_grades, name="get_grades_by_id"),
    path('units/<int:grade_id>/', get_units, name='get_units_by_grade'),
    path('lessons/<int:grade_id>/<int:unit_id>/', get_lessons, name='get_lessons_by_unit'),
    path('problems/<int:grade_id>/<int:unit_id>/<int:lesson_id>/', get_problems, name='get_problems_by_lesson'),
    
    
    path('serializedgrades/', GradeView.as_view(), name='grade-list'),
    path('serializedunits/', UnitView.as_view(), name='unit-list'),
    path('serializedlessons/', LessonView.as_view(), name='lesson-list'),
    path('serializedproblems/', ProblemView.as_view(), name='problem-list'),

    # Assignments and Notifications
    path('assignments/<int:user_id>/', views.AssignmentList.as_view()),
    path('create-notification/', views.CreateNotificationView.as_view()),
    path('create-assignment-report/', views.CreateAssignmentView.as_view()),
    path('notifications/<int:user_id>/', views.NotificationsView.as_view()),
]