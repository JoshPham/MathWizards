# MathWizards
This is my TSA Project for Software Design. This is a math tutor for grades K-5.

Members:
- Josh Pham
- Mahdi Salloum
- Syed Rizvi
- Tarang Teredesai
- Aditya Kruthiventi
- Nathaniel Jocson

## Additional Info
If you are trying to pull from this repository, and want to import some example grades, units, lessons, and problems, you can use the following code statements in a python shell (in the django root direction):

```python
from app.models import Grade, Unit, Lesson, Problem

# Create instances for each model
grade_instance = Grade.objects.create(grade_id=1, title='First Grade', description='Description for First Grade')

unit_instance = Unit.objects.create(grade=grade_instance, unit_id=1, title='First Unit', description='Description for First Unit')

lesson_instance = Lesson.objects.create(unit=unit_instance, lesson_id=1, title='First Lesson', description='Description for First Lesson', content='Lesson content')

problem_instance = Problem.objects.create(lesson=lesson_instance, text_question='What is 2 + 2?', num_answer=4, answer_a='3', answer_b='4', answer_c='5', answer_d='6', letter_answer='b')
```