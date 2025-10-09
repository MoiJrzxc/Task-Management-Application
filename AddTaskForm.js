import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useTaskContext } from "../context/TaskContext"; 

function AddTaskForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const navigate = useNavigate();

  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      alert("Please enter a task title.");
      return;
    }

    // Add new task
    addTask({
      title: taskTitle,
      description: description,
      priority: priority,
    });

    // Reset form
    setTaskTitle("");
    setDescription("");
    setPriority("Low");

    // Navigate back to home
    navigate("/");
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "650px", fontFamily: "'Poppins', sans-serif" }}
    >
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-primary text-white text-center py-3 rounded-top-4">
          <h3 className="mb-0">📝 Add New Task</h3>
          <small>Plan smarter. Achieve faster.</small>
        </Card.Header>

        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Task Title */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a descriptive title..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                className="rounded-3 shadow-sm"
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add task details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-3 shadow-sm"
              />
            </Form.Group>

            {/* Priority */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Priority</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`rounded-3 shadow-sm ${
                  priority === "High"
                    ? "border-danger"
                    : priority === "Medium"
                    ? "border-warning"
                    : "border-success"
                }`}
              >
                <option value="Low"> Low</option>
                <option value="Medium"> Medium</option>
                <option value="High"> High</option>
              </Form.Select>
            </Form.Group>

            {/* Buttons */}
            <Row>
              <Col className="text-center">
                <Button
                  type="submit"
                  variant="success"
                  className="px-4 py-2 rounded-pill shadow-sm"
                >
                  ➕ Add Task
                </Button>
                <Button
                  variant="outline-secondary"
                  className="ms-3 px-4 py-2 rounded-pill"
                  onClick={() => navigate("/")}
                >
                  ⬅️ Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>

        <Card.Footer className="text-center text-muted py-2 small">
          Task Manager | Built with React + Bootstrap 💡
        </Card.Footer>
      </Card>
    </div>
  );
}

export default AddTaskForm;
