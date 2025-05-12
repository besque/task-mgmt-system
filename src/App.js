import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';
import './App.css';
import './styles.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
            <div className="container">
              <Link to="/" className="navbar-brand">Task Manager</Link>
              <div className="navbar-nav">
                <Link to="/" className="nav-link">Dashboard</Link>
                <Link to="/add" className="nav-link">Add Task</Link>
              </div>
            </div>
          </nav>
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/task/:id" element={<TaskDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
