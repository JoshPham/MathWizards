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
        <NavLink to="/Grades" className='back-button'>Back to All Grades</NavLink>
          <div className="gradepage">
            <br />
            <div className="all-units">
              <h2>Units:</h2>
              <ul className='unit-list'>
              {Array.isArray(gradeData.units) && gradeData.units.length > 0 ? (
                  gradeData.units.map(unit => (
                    <li key={unit.unit_id}>
                      <p className='unit-label'>{unit.title}</p>
                      <p>{unit.description}</p>
                      <hr className='line'/>
                    </li>
                  ))
                ) : (
                  <p>No units available</p>
                )}
              </ul>
            </div>
            <div className="unit-container">
              <h1>{gradeData.title}</h1>
              <p className='grade-description'>{gradeData.description}</p>
              <ul className='unit-list'>
                {Array.isArray(gradeData.units) && gradeData.units.length > 0 ? (
                  gradeData.units.map(unit => (
                    <li key={unit.unit_id} className='grade-container'>
                      <strong className='unit-title'>{unit.title}</strong>
                      <p>Description: {unit.description}</p>

                      <h3>Lessons:</h3>
                      <ul className='unit-list'>
                        {Array.isArray(unit.lessons) && unit.lessons.length > 0 ? (
                          unit.lessons.map(lesson => (
                            <li key={lesson.lesson_id}><NavLink to={`/grades/${gradeData.grade_id}/lessons/${lesson.lesson_id}`}>
                            <strong>{lesson.title}</strong>
                          </NavLink>  
                              <p>{lesson.description}</p>
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
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default GradePage;