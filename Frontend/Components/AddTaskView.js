import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function AddTaskView({ addTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      alert("Please enter a task title");
      return;
    }

    // Add a timestamp field here
    addTask({
      title: taskTitle,
      description: description,
      priority: priority,
      dateCreated: new Date().toLocaleString(),
    });

    setTaskTitle("");
    setDescription("");
    setPriority("Low");
    navigate("/");
  };

  return (
    <div className="add-task-container">
      <h2>Add Task</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            rows={3}
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div>
            <button type="submit" className="btn btn-primary">
              + Add Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskView;
