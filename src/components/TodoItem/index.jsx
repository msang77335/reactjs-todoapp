import React from "react";
import PropTypes from "prop-types";
import "./TodoItem.scss";
import className from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

TodoItem.propTypes = {
  todo: PropTypes.object,
  onTodoClick: PropTypes.func,
};

TodoItem.defaultProps = {
  todo: null,
  onTodoClick: null,
};

function TodoItem(props) {
  const { todo, onTodoClick } = props;

  function handleClink(todo, action) {
    if (onTodoClick) {
      onTodoClick(todo, action);
    }
  }

  return (
    <li className={className("todo__item", { isComplete: todo.isComplete })}>
      <div className="todo__content">
        <div className="todo__title" onClick={() => handleClink(todo)}>
          <label></label>
          <p>{props.children}</p>
        </div>
        <FontAwesomeIcon
          className="del"
          icon={faTimes}
          onClick={() => handleClink(todo, "del")}
        />
      </div>
    </li>
  );
}

export default TodoItem;
