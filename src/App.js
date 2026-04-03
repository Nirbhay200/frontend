import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const clearAllTasks = async () => {
    try {
      for (let task of tasks) {
        await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
      }
      fetchTasks();
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Manager 🚀 Day 2</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "8px", width: "200px" }}
      />
      <br /><br />

      <button onClick={addTask}>Add</button>
      <button onClick={clearAllTasks} style={{ marginLeft: "10px" }}>
        Clear All
      </button>

      <div style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <div key={task._id} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => toggleTask(task._id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;