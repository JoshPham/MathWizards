import React from 'react';
import './Grades.css';
import { Link } from 'react-router-dom';
import background from './background.png';

class Grades extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    // Simulate a delay to demonstrate loading
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    const { data } = this.props;
    const { loading } = this.state;

    return (
      <>
        <div className='container grade-main'>
          <div className="main">
            <h1>All Grades</h1>
            <div className='sub-container'>
              {loading ? (
                <p>Loading...</p>
              ) : (
                data ? (
                  data.length > 0 ? (
                    data.map((grade) => (
                      <div key={grade.grade_id} className={`grade-container grade-${grade.grade_id}`}>
                        <div className="grade">
                          <h2><Link to={`/grades/${grade.grade_id}`} className="grade-title">{grade.title}</Link></h2>
                          <p>Description: {grade.description}</p>
                        </div>

                        <h3 className="unit-list-title">Units:</h3>
                        <ul className='unit-list'>
                          {grade.units.map((unit) => (
                            <li key={unit.unit_id} className='unit'>
                              <p className="unit-title">{unit.title}</p>
                              <p className="unit-description">{unit.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p>No grades available.</p>
                  )
                ) : (
                  <p>Error loading data.</p>
                )
              )}
            </div>
          </div>
          
        </div>
        <img src={background} alt="background image" className='background-image' />
      </>
    );
  }
}

export default Grades;