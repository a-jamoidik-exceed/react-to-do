import React from "react";

const Control = props => {
  const handleClickLink = e => {
    e.preventDefault();
    props.onChangeFilter(e.currentTarget.id);
  };

  const handleClickClearCompleted = e => {
    e.preventDefault();
    props.onClearCompleted();
  };

  const countActiveTodo = () => {
    let activeTodos = props.todos.filter(item => {
      if (!item.done) return true;
      else return false;
    });
    return activeTodos.length + " items left";
  };

  return (
    <div className="section-todo-control">
      <div className="section-todo-control-left">{countActiveTodo()}</div>
      <div className="section-todo-control-filter">
        <a
          href="/"
          className={
            props.filterStatus === "all"
              ? "section-todo-control-filter__link current"
              : "section-todo-control-filter__link"
          }
          onClick={handleClickLink}
          id="all"
        >
          All
        </a>
        <a
          href="/"
          className={
            props.filterStatus === "active"
              ? "section-todo-control-filter__link current"
              : "section-todo-control-filter__link"
          }
          onClick={handleClickLink}
          id="active"
        >
          Active
        </a>
        <a
          href="/"
          className={
            props.filterStatus === "completed"
              ? "section-todo-control-filter__link current"
              : "section-todo-control-filter__link"
          }
          onClick={handleClickLink}
          id="completed"
        >
          Completed
        </a>
      </div>
      <div className="section-todo-control-clear">
        <a
          href="/"
          className="section-todo-control-clear__link"
          onClick={handleClickClearCompleted}
          id="completed"
        >
          Clear completed
        </a>
      </div>
    </div>
  );
};

export default Control;
