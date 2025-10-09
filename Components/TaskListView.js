import React from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useTaskContext } from "./TaskContext";

function TaskListView() {
  const { tasks, deleteTask } = useTaskContext();

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <Card className="mt-3">
          <Card.Body>
            <Card.Text className="text-muted text-center">
              No tasks available. Add a task to get started!
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <span className={`badge bg-${
                    task.priority === 'High' ? 'danger' : 
                    task.priority === 'Medium' ? 'warning' : 
                    'success'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TaskListView;
