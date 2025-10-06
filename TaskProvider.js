import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext"; // import your context

function TaskListView() {
  return (
    <div className="container mt-4">
      <h2>Task List View</h2>
      <p>This is where all tasks will be displayed.</p>
    </div>
  );
}

function AddTaskView() {
  return (
    <div className="container mt-4">
      <h2>Add Task View</h2>
      <p>This is where the add task form will appear.</p>
    </div>
  );
}

function Main() {
  return (
    <TaskProvider>
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
                  <Link className="nav-link" to="/add-task">Add Task</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<TaskListView />} />
          <Route path="/add-task" element={<AddTaskView />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default Main;
