import React from "react";
import Item from "./Item";

const List = props => {
  const filterFunc = todos => {
    let filteredArray = [...todos];
    if (props.filterStatus === "active") {
      filteredArray = props.todos.filter(item => !item.done);
    }
    if (props.filterStatus === "completed") {
      filteredArray = todos.filter(item => item.done);
    }
    return filteredArray.map(item => (
      <Item
        key={item.id}
        data={item}
        onDelTodoItem={props.onDelTodoItem}
        onDoneTodoItem={props.onDoneTodoItem}
        onChangeDataTodo={props.onChangeDataTodo}
      />
    ));
  };
  return <ul className="section-todo-list">{filterFunc(props.todos)}</ul>;
};

export default List;
