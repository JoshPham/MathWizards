// App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/authentication/Dashboard';
import Settings from './pages/authentication/Settings';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import UserProgress from './pages/authentication/UserProgress';
import TenFrame from './pages/authentication/TenFrame'
import PosCoordinatePlane from './pages/authentication/PosCoordinatePlane'
import CoordinatePlane from './pages/authentication/CoordinatePlane'
import NumberLine from './pages/authentication/NumberLine'
import Home from './pages/Home';
import About from './pages/About';
import Grades from './pages/grades/Grades';
import GradePage from './pages/grades/GradePage';
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';

class App extends Component {
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
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/grades" element={<Grades data={this.state.grades} />} />
            <Route path="/grades/:gradeNumber" element={<GradePage grades={this.state.grades} />} />
            <Route path='/dashboard' element={<PrivateRoute component={Dashboard} redirectTo="/login" />} />
            <Route path='/settings' element={<PrivateRoute component={Settings} redirectTo="/login" />} />
            <Route path='/progress' element={<PrivateRoute component={UserProgress} redirectTo="/login" />} />
            <Route path='/number-line' element={<PrivateRoute component={NumberLine} redirectTo="/login" />} />
            <Route path='/10-frame' element={<PrivateRoute component={TenFrame} redirectTo="/login" />} />
            <Route path='/coordinate-plane' element={<PrivateRoute component={CoordinatePlane} redirectTo="/login" />} />
            <Route path='/pos-coordinate-plane' element={<PrivateRoute component={PosCoordinatePlane} redirectTo="/login" />} />
            <Route path="*" element={<NoPage />} />
            {/* NumberLine, CoordinatePlane, PosCoordinatePlane */}
          </Routes>
        </div>
      </AuthProvider>
    );
  }
}

export default App;