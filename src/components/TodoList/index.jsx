import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoItem from "../TodoItem";
import "./TodoList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

Todolist.propTypes = {
  todos: PropTypes.array,
  ontodoClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

Todolist.defaultProps = {
  todos: [],
  onTodoClick: null,
  onSubmit: null,
};

function Todolist(props) {
  const {
    todos,
    itemLeft,
    onTodoClick,
    onSubmit,
    onSelectAll,
    onDelAllComplete,
    onFilterClick,
  } = props;
  const [value, setValue] = useState("");

  function handleValueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!onSubmit) return;
    const formValue = {
      title: value,
    };
    onSubmit(formValue);
    setValue("");
  }

  function handleFilterClick(statusFilter) {
    if (onFilterClick) {
      onFilterClick(statusFilter);
    }
  }

  return (
    <div>
      <form className="todo__from" onSubmit={handleSubmit}>
        <FontAwesomeIcon
          className="selectAll"
          icon={faChevronDown}
          onClick={() => onSelectAll()}
        />
        <input
          className="todo__from-input"
          type="text"
          placeholder="What need to be done ?"
          value={value}
          onChange={handleValueChange}
        />
      </form>
      <ul className="todo__list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onTodoClick={onTodoClick}>
            {todo.title}
          </TodoItem>
        ))}
      </ul>
      <div className="todo__bottom">
        <label className="todo__bottom-lb">{itemLeft} item left</label>
        <div>
          <button className="btn" onClick={() => handleFilterClick("All")}>
            All
          </button>
          <button className="btn" onClick={() => handleFilterClick("Complete")}>
            Complete
          </button>
        </div>
        <button
          className="btn border-0"
          data-text="Clear completed"
          onClick={() => onDelAllComplete()}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default Todolist;
