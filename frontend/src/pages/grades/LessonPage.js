import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LessonPage = () => {
  const { gradeNumber, lessonNumber } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/lessons/${gradeNumber}/${lessonNumber}/`);
        console.log('Lesson Data:', response.data);
        setLesson(response.data[0]);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    };

    fetchLesson();
  }, [gradeNumber, lessonNumber]);

  return (
    <div className='container'>
        <div className="main">
            {lesson ? (
            <div>
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <p>{lesson.content}</p>

            <h3>Problems:</h3>
            <ul>
                {lesson.problems.map((problem) => (
                <li key={problem.id}>
                    <p>{problem.text_question}</p>
                    <p>Answer A: {problem.answer_a}</p>
                    <p>Answer B: {problem.answer_b}</p>
                    <p>Answer C: {problem.answer_c}</p>
                    <p>Answer D: {problem.answer_d}</p>
                    <p>Correct Answer: {problem.letter_answer}</p>
                </li>
                ))}
            </ul>
            </div>
        ) : (
            <p>Loading lesson...</p>
        )}
        </div>
    </div>
  );
};

export default LessonPage;