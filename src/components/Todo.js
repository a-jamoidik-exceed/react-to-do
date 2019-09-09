import React from "react";
import axios from "axios";
import Form from "./Form";
import List from "./List";
import Control from "./Control";

class Todo extends React.Component {
  state = {
    todos: [],
    filterStatus: "all",
    updating: false
  };

  todosUpdate = newTodos => {
    if (newTodos) {
      axios({
        method: "put",
        url: `http://127.0.0.1:5000/${localStorage.user}/todos/update`,
        data: newTodos
      });
    }
  };

  todosGet = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/${localStorage.user}`
    }).then(res => {
      this.setState({ todos: res.data.todos });
    });
  };

  handleDelTodoItem = id => {
    let indexDelTodo = this.state.todos.findIndex(item => item.id === id);
    let newTodos = [...this.state.todos];
    newTodos.splice(indexDelTodo, 1);
    this.setState({ todos: newTodos });
    this.todosUpdate(newTodos);
  };

  handleAddNewTodo = newTodo => {
    let newTodos = [newTodo, ...this.state.todos];
    this.setState(() => {
      return { todos: newTodos };
    });
    this.todosUpdate(newTodos);
  };

  handleDoneTodoItem = id => {
    let indexDoneTodo = this.state.todos.findIndex(item => item.id === id);
    let newTodos = [].concat(this.state.todos);
    newTodos[indexDoneTodo].done = true;
    this.setState({ todos: newTodos });
    this.todosUpdate(newTodos);
  };

  handleChangeFilter = newStatus => {
    this.setState({ filterStatus: newStatus });
  };

  handleClearCompleted = () => {
    let newTodos = this.state.todos.filter(item => {
      if (!item.done) return item;
      else return false;
    });
    this.setState({ todos: newTodos });
    this.todosUpdate(newTodos);
  };

  handleAllCompleted = () => {
    let newTodos = this.state.todos.map(item => {
      item.done = true;
      return item;
    });
    this.setState({ todos: newTodos });
  };

  countActiveTodo = () => {
    let activeTodo = this.state.todos.find(item => {
      if (!item.done) return item;
      else return false;
    });
    if (activeTodo.length > 0) return activeTodo.length;
    else return 0;
  };
  handleChangeDataTodo = data => {
    this.state.todos.map(item => {
      if (item.id === data.id) {
        item.content = data.content;
      }
      return item;
    });
  };
  componentDidMount() {
    if (!localStorage.user) {
      axios({
        method: "post",
        url: "http://127.0.0.1:5000/users/create"
      }).then(res => {
        localStorage.setItem("user", res.data);
      });
    } else {
      this.todosGet();
    }
  }
  componentDidUpdate() {}
  render() {
    return (
      <section className="section-outer">
        <section className="section-todo">
          <Form
            onAddNewTodo={this.handleAddNewTodo}
            onClkAllCompleted={this.handleAllCompleted}
          />
          {this.state.todos.length > 0 && (
            <>
              <List
                todos={this.state.todos}
                onDelTodoItem={this.handleDelTodoItem}
                onDoneTodoItem={this.handleDoneTodoItem}
                filterDone={this.state.filterDone}
                filterApply={this.state.filterApply}
                onChangeDataTodo={this.handleChangeDataTodo}
                filterStatus={this.state.filterStatus}
              />
              <Control
                todos={this.state.todos}
                onChangeFilter={this.handleChangeFilter}
                onClearCompleted={this.handleClearCompleted}
                filterStatus={this.state.filterStatus}
              />
            </>
          )}
        </section>
      </section>
    );
  }
}

export default Todo;
