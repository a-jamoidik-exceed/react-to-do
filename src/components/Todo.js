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

  componentDidMount() {
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/todos"
    }).then(res => {
      this.setState({ todos: res.data });
    });
  }

  todosGet = () => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/${localStorage.user}`
    }).then(res => {
      this.setState({ todos: res.data.todos });
    });
  };

  handleDelTodoItem = id => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:5000/todos/${id}/delete`
    }).then(res => {
      this.setState({ todos: res.data });
    });
  };

  handleAddNewTodo = newTodo => {
    axios({
      method: "post",
      url: `http://127.0.0.1:5000/todos/create-todo`,
      data: newTodo
    }).then(res => {
      this.setState({ todos: res.data });
    });
  };

  handleDoneTodoItem = id => {
    let todo = this.state.todos.find(item => item._id === id);
    todo.done = !todo.done;
    axios({
      method: "put",
      url: `http://127.0.0.1:5000/todos/${id}/update`,
      data: todo
    }).then(res => {
      this.setState({ todos: res.data });
    });
  };

  handleChangeFilter = newStatus => {
    this.setState({ filterStatus: newStatus });
  };

  handleClearCompleted = () => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:5000/todos/delete-completed`,
    }).then(res => {
      this.setState({ todos: res.data });
    })
  };

  handleAllCompleted = () => {
    axios({
      method: "put",
      url: `http://127.0.0.1:5000/todos/all-completed`,
      data: { done: !this.state.todos[0].done}
    }).then(res => {
      this.setState({ todos: res.data });
    });
    // let newTodos = this.state.todos.map(item => {
    //   item.done = !item.done;
    //   return item;
    // });
    // this.setState({ todos: newTodos });    
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
    let todo = this.state.todos.find(item => item.id === data.id);
    if (todo) {
      todo.content = data.content;
      delete todo._id;
      axios({
        method: "put",
        url: `http://127.0.0.1:5000/todos/${data._id}/update`,
        data: todo
      }).then(res => {
        this.setState({ todos: res.data });
      });
    }
  };

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
