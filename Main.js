import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskListView from "./TaskListView";
import AddTaskView from "./AddTaskView";
import "./style.css";

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
      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
          <span className="navbar-title">iGit Task Manager</span>
        </div>
        <div className="navbar-right">
          <Link className="btn-home" to="/">Home</Link>
        </div>
      </nav>

      {/* ===== Routes ===== */}
      <Routes>
        <Route path="/" element={<TaskListView tasks={tasks} deleteTask={deleteTask} />} />
        <Route path="/add" element={<AddTaskView addTask={addTask} />} />
      </Routes>

      {/* ===== Floating Add Button ===== */}
      <Link to="/add" className="floating-btn">+</Link>
    </Router>
  );
}

export default Main;
