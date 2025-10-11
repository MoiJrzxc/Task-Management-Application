import React from "react";
import "./style.css";

function TaskListView({ tasks, deleteTask }) {
  return (
    <>
      {/* ===== Task List Container ===== */}
      <div className="container">
        <h2>Task List</h2>

        {tasks.length === 0 ? (
          <div className="card">
            <p className="card-text">
              No tasks available. Add a task to get started!
            </p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Date Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        task.priority === "High"
                          ? "bg-danger"
                          : task.priority === "Medium"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.dateCreated}</td>
                  <td>
                    <button
                      className="icon-btn btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this task?"
                          )
                        ) {
                          deleteTask(task.id);
                        }
                      }}
                      title="Delete Task"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default TaskListView;
