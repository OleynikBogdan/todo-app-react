import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");

    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const completedTasks = tasks.filter((item) => item.complete).length;
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (!task.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      complete: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  }

  function deleteTask(idToDelete) {
    const updatedTasks = tasks.filter((item) => item.id !== idToDelete);

    setTasks(updatedTasks);
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          complete: !item.complete,
        };
      }
      return item;
    });
    setTasks(updatedTasks);
  }

  function clearCompletedTasks() {
    const updatedTasks = tasks.filter((item) => !item.complete);
    setTasks(updatedTasks);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((item) => {
    if (filter === "active") {
      return !item.complete;
    }
    if (filter === "completed") {
      return item.complete;
    }
    return true;
  });

  return (
    <div>
      <AddTaskForm task={task} setTask={setTask} addTask={addTask} />
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <ul>
        {filteredTasks.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}

        <p>
          Completed {completedTasks} of {tasks.length} tasks
        </p>
        <button onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      </ul>
    </div>
  );
};

export default App;
