import React, { useState, useEffect } from "react";
import { Trash2, ArrowUp, ArrowDown, Pencil, Plus, Save, X } from "lucide-react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const newTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(newTasks);
      setNewTask("");
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  }

  function saveEdit(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editingText;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditingIndex(null);
  }

  function toggleCompleted(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="to-do-list">
      <h1>To Do List</h1>

      <div>
        <input
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          <Plus size={20} />
        </button>
      </div>

      <div className="progress-container">
        <div className="progress-top">
          <span>Progress</span>
          <span>{completedCount} / {tasks.length}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: tasks.length === 0 ? "0%" : `${(completedCount / tasks.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  className="edit-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                />

                <button className="add-button" onClick={() => saveEdit(index)}>
                  <Save size={20} />
                </button>

                <button
                  className="delete-button"
                  onClick={() => setEditingIndex(null)}
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(index)}
                />

                <span className={task.completed ? "completed text" : "text"}>
                  {task.text}
                </span>

                <button className="move-button" onClick={() => startEditing(index)}>
                  <Pencil size={20} />
                </button>

                <button className="delete-button" onClick={() => deleteTask(index)}>
                  <Trash2 size={20} />
                </button>

                <button className="move-button" onClick={() => moveTaskUp(index)}>
                  <ArrowUp size={20} />
                </button>

                <button className="move-button" onClick={() => moveTaskDown(index)}>
                  <ArrowDown size={20} />
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
