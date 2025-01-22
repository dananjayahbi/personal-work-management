import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://192.168.1.244:5000"; // Replace with your local IP

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); // Input state

  // Fetch tasks from backend
  useEffect(() => {
    axios.get(`${BACKEND_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Backend unreachable:", error));
  }, []);

  // Function to add a new task
  const addTask = () => {
    if (!newTask.trim()) return; // Prevent empty tasks

    axios.post(`${BACKEND_URL}/tasks`, { text: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]); // Update UI
        setNewTask(""); // Clear input field
      })
      .catch((error) => console.error("Failed to add task:", error));
  };

  return (
    <div>
      <h1>Todo App</h1>

      {/* Task Input Form */}
      <input
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
