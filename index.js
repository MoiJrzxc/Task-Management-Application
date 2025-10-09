import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskProvider } from "./Task-Management-Application/Components/TaskContext";
import Main from "./Task-Management-Application/Main";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskProvider>
      <Main />
    </TaskProvider>
  </React.StrictMode>
);
