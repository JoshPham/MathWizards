// packages
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import axios from 'axios';
import "./App.css";

// authentication files
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";
import Dashboard from './pages/authentication/Dashboard';
import Settings from './pages/authentication/Settings'
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';

// components
import Navbar from './components/Navbar';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Grades from './pages/grades/Grades';
import GradePage from './pages/grades/GradePage';
import NoPage from './pages/NoPage';

const history = createBrowserHistory()

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
      <AuthProvider>
        <Router history={history}>
          <div>
            <Navbar />
            <Switch>
              <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
              <PrivateRoute path="/settings"><Settings /></PrivateRoute>
              <Route exact path={['/', '/home']} component={Home} />
              <Route component={Login} path='/login' />
              <Route component={Register} path='/register' />
              <Route component={About} path='/about'/>
              <Route component={<Grades data={this.state.grades} />} path='/Grades'/>
              <Route path="/grades/:gradeNumber" element={<GradePage grades={this.state.grades} />} />
              <Route path="*" element={<NoPage />} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;