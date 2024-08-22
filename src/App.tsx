import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { TaskList } from "./assets/TaskList";
import { TaskForm } from "./assets/TaskForm";
import { TaskDetails } from "./assets/TaskDetails";
import { apiRequest } from "./utility";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await apiRequest("http://localhost:3004/tasks", "GET");
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleSaveTask = async (newTask: Task) => {
    if (tasks.some((task) => task.id === newTask.id)) {
      const updatedTasks = tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      setTasks(updatedTasks);
      await apiRequest(
        `http://localhost:3004/tasks/${newTask.id}`,
        "PUT",
        newTask
      );
    } else {
      setTasks([...tasks, newTask]);
      await apiRequest("http://localhost:3004/tasks", "POST", newTask);
    }
  };

  const handleDeleteTask = async (id: string) => {
    console.log(`Attempting to delete task with ID: ${id}`);

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    try {
      const response = await fetch(`http://localhost:3004/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Task with ID: ${id} successfully deleted.`);
      } else {
        console.error(
          `Failed to delete task. Server responded with status: ${response.status}`
        );
        setTasks(tasks);
      }
    } catch (error) {
      console.error("Error occurred while deleting task:", error);
      setTasks(tasks);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const taskToUpdate = updatedTasks.find((task) => task.id === id);
    if (taskToUpdate) {
      await apiRequest(
        `http://localhost:3004/tasks/${taskToUpdate.id}`,
        "PUT",
        taskToUpdate
      );
    }
  };

  const EditTaskForm = () => {
    const { id } = useParams<{ id: string }>();
    const taskToEdit = tasks.find((task) => task.id === id);
    return <TaskForm onSave={handleSaveTask} task={taskToEdit} />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          }
        />
        <Route
          path="/tasks/:id"
          element={<TaskDetails tasks={tasks} onSave={handleSaveTask} />}
        />
        <Route
          path="/add-task"
          element={<TaskForm onSave={handleSaveTask} />}
        />
        <Route path="/edit-task/:id" element={<EditTaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;
