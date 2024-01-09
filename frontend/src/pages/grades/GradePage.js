import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import "./GradePage.css"

const GradePage = ({ grades }) => {
  const { gradeNumber } = useParams();
  const gradeData = grades.find(grade => grade.grade_id.toString() === gradeNumber);

  if (!gradeData || !gradeData.units) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="gradepage-container">
        <div className="main">
        <NavLink to="/Grades">Back to All Grades</NavLink>
          <div className="gradepage">
            <br />
            <div className="all-units">
              <h2>Units:</h2>
              <ul className='unit-list'>
              {Array.isArray(gradeData.units) && gradeData.units.length > 0 ? (
                  gradeData.units.map(unit => (
                    <li key={unit.unit_id}>
                      <p className='unit-label'>{unit.title}</p>
                      <p className='unit-description'>{unit.description}</p>
                      <hr className='line' />
                    </li>
                  ))
                ) : (
                  <p>No units available</p>
                )}
              </ul>
            </div>
            <div className="unit-container">
              <h1>{gradeData.title}</h1>
              <p>Description: {gradeData.description}</p>
              {Array.isArray(gradeData.units) && gradeData.units.length > 0 ? (
                  gradeData.units.map(unit => (
                    <li key={unit.unit_id}>
                      <strong>{unit.title}</strong>
                      <p>Description: {unit.description}</p>

                      <h3>Lessons:</h3>
                      <ul>
                        {Array.isArray(unit.lessons) && unit.lessons.length > 0 ? (
                          unit.lessons.map(lesson => (
                            <li key={lesson.lesson_id}>
                              <strong>{lesson.title}</strong>
                              <p>Description: {lesson.description}</p>
                              <p>Content: {lesson.content}</p>

                              <h4>Problems:</h4>
                              <ul>
                                {Array.isArray(lesson.problems) && lesson.problems.length > 0 ? (
                                  lesson.problems.map(problem => (
                                    <li key={problem.id}>
                                      <p>Question: {problem.text_question}</p>
                                      <p>Answer: {problem.num_answer}</p>
                                    </li>
                                  ))
                                ) : (
                                  <p>No problems available</p>
                                )}
                              </ul>
                            </li>
                          ))
                        ) : (
                          <p>No lessons available</p>
                        )}
                      </ul>
                    </li>
                  ))
                ) : (
                  <p>No units available</p>
                )}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default GradePage;