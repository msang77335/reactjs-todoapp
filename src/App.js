import React, { useState, useEffect } from "react";
import "./App.scss";
import Todolist from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Fronend !", isComplete: true },
    { id: 2, title: "We love Easy Fronend !", isComplete: false },
    { id: 3, title: "They love Easy Fronend !", isComplete: false },
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const [itemLeft, setItemLeft] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  function countComplete() {
    setItemLeft(todoList.filter((x) => x.isComplete === true).length);
  }

  function checkSelectAll() {
    const index = todoList.findIndex((x) => x.isComplete === false);
    if (index >= 0) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }

  function getTodoList() {
    switch (statusFilter) {
      case "All":
        return todoList;
      case "Complete":
        const newTodoList = todoList.filter((x) => x.isComplete === true);
        return newTodoList;
    }
  }

  function handleTodoClink(todo, action) {
    const isComplete = todo.isComplete;
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;
    let newTodoList = [];

    if (action === "del") {
      newTodoList = [...todoList];
      newTodoList.splice(index, 1);
    } else {
      newTodoList = [
        ...todoList.slice(0, index),
        {
          ...todo,
          isComplete: !isComplete,
        },
        ...todoList.slice(index + 1),
      ];
    }
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValue) {
    const newTodoList = [...todoList];
    const newTodo = {
      id: uuidv4(),
      ...formValue,
    };
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleSelectAll() {
    console.log(selectAll);
    if (!selectAll) {
      const newTodoList = todoList.map((todo) => {
        todo.isComplete = true;
        return todo;
      });
      setTodoList(newTodoList);
    } else {
      console.log("Go");
      const newTodoList = todoList.map((todo) => {
        todo.isComplete = false;
        return todo;
      });
      setTodoList(newTodoList);
    }
  }

  function handleDelAllComplete() {
    const newTodoList = todoList.filter((todo) => todo.isComplete === false);
    setTodoList(newTodoList);
  }

  function handleFilterClick(statusFilter) {
    setStatusFilter(statusFilter);
  }

  useEffect(() => {
    countComplete();
    checkSelectAll();
  });

  return (
    <div className="App">
      <h1 className="title" data-text="todos">
        todos
      </h1>
      <Todolist
        todos={getTodoList()}
        itemLeft={itemLeft}
        onTodoClick={handleTodoClink}
        onSubmit={handleTodoFormSubmit}
        onSelectAll={handleSelectAll}
        onDelAllComplete={handleDelAllComplete}
        onFilterClick={handleFilterClick}
      ></Todolist>
    </div>
  );
}

export default App;
