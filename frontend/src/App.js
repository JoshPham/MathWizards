import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import Grades from './pages/grades/Grades';
import GradePage from './pages/grades/GradePage';
import NoPage from './pages/NoPage';
import axios from 'axios';
import "./App.css";

class App extends React.Component {
  state = { grades: [] };

  async componentDidMount() {
    try {
      const gradeResponse = await axios.get('http://localhost:8000/grades/');
      const grades = gradeResponse.data;
      this.setState({ grades });

      for (const grade of grades) {
        const unitResponse = await axios.get(`http://localhost:8000/units/${grade.grade_id}/`);
        const units = unitResponse.data;

        const updatedGrades = this.state.grades.map(g => {
          if (g.grade_id === grade.grade_id) {
            return { ...g, units: units };
          }
          return g;
        });

        this.setState({
          grades: updatedGrades,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Grades" element={<Grades data={this.state.grades} />} />
            <Route path="/grades/:gradeNumber" element={<GradePage grades={this.state.grades} />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;