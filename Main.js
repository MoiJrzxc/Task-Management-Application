import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskListView from "./TaskListView";
import AddTaskView from "./AddTaskView";
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskDetails) => {
    setTasks([...tasks, { ...taskDetails, id: Date.now() }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Task Manager</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Task</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<TaskListView tasks={tasks} deleteTask={deleteTask} />} />
        <Route path="/add" element={<AddTaskView addTask={addTask} />} />
      </Routes>
    </Router>
  );
}

export default Main;
