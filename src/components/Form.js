import React from "react";
import arrow from "./../images/arrow-down.png";

const Form = props => {
  const handleOnKeyPress = e => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      props.onAddNewTodo({
        content: e.currentTarget.value,
        done: false,
        date: new Date(),
        id: Math.floor(100000 + Math.random() * 900000)
      });
      e.currentTarget.value = null;
    }
  };
  const handleClkAllCompleted = () => {
    props.onClkAllCompleted();
  };
  return (
    <div className="section-todo-form">
      <div className="section-todo-form-control">
        <img
          className="section-todo-form-control__done"
          src={arrow}
          alt="done"
          onClick={handleClkAllCompleted}
        />
      </div>
      <div className="section-todo-form-input">
        <input
          className="section-todo-form-input__text"
          type="text"
          placeholder="What needs to be done?"
          onKeyDown={handleOnKeyPress}
        />
      </div>
    </div>
  );
};

export default Form;
