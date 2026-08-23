"use client";

import { useState } from "react";

const TodoParent = () => {
  const [editingId, setEditingId] = useState(null);
  const [todo, setTodo] = useState({
    name: "",
    id: "",
  });

  const [todoList, setTodoList] = useState([]);

  const handleAddTask = () => {
    if (!todo.name.trim()) return;

    if (editingId) {
      setTodoList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingId
            ? {
              ...task,
              name: todo.name,
            }
            : task,
        ),
      );
      setEditingId(null);
      setTodo({
        name: "",
        id: "",
      });
      return;
    }

    setTodoList((prev) => [
      ...prev,
      {
        ...todo,
        id: crypto.randomUUID(),
        completed: false,
      },
    ]);

    //update the original value to null
    setTodo({
      name: "",
      id: "",
    });
  };

  const handleDeleteTask = (id) => {
    setTodoList((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  const handleUpdateTask = (id) => {
    const taskToUpdate = todoList.find((task) => task.id === id);
    setTodo({
      name: taskToUpdate.name,
      id: taskToUpdate.id,
    });
    setEditingId(id);
  };

  const handleTaskStatus = (id) => {
    setTodoList((prevList) =>
      prevList.map((task) =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed,
          }
          : task,
      ),
    );
  };

  return (
    <div>
      <input
        type="text"
        value={todo.name}
        onChange={(e) =>
          setTodo((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        placeholder="Enter Task"
      />
      <button onClick={handleAddTask}>{!editingId ? "Add" : "Update"}</button>
      {todoList?.map((todo) => (
        <div key={todo.id}>
            <p
            style={{textDecoration : todo?.completed             
                ? "line-through"
                : "none"
            }}
          >{todo.name}</p>
          <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
          <button onClick={() => handleUpdateTask(todo.id)}>Update</button>
          <input checked={todo.completed} onChange={() => handleTaskStatus(todo.id)} type="checkbox" />
        </div>
  ))
}
    </div >
  );
};

export default TodoParent;
