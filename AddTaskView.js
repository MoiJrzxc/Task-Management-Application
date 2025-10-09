import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

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

    addTask({
      title: taskTitle,
      description: description,
      priority: priority,
    });

    setTaskTitle("");
    setDescription("");
    setPriority("Low");
    
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
      <Card className="mt-3">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Task
            </Button>
            <Button 
              variant="secondary" 
              className="ms-2" 
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddTaskView;
