import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Form from "./Form";
import List from "./List";
import Control from "./Control";

toast.configure({
  autoClose: 3000,
  draggable: false
});

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

  handleDelTodoItem = id => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:5000/todos/${id}/delete`
    }).then(res => {
      let newTodos = this.state.todos.filter((item) => {
        if (item._id === res.data._id) return false;
        return true;
      });
      this.setState({ todos: newTodos });
      this.notifyDelete();
    });
  };

  handleAddNewTodo = newTodo => {
    axios({
      method: "post",
      url: `http://127.0.0.1:5000/todos/create-todo`,
      data: newTodo
    }).then(res => {
      this.setState({ todos: res.data });
      this.notifyAdd();
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
      let newTodos = this.state.todos.map((item) => {
        if (item._id === res.data._id) return res.data;
        else return item;
      });
      this.setState({ todos: newTodos });
      if (todo.done) this.notifyDone();
    });
  };

  handleChangeFilter = newStatus => {
    this.setState({ filterStatus: newStatus });
  };

  handleClearCompleted = () => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:5000/todos/delete-completed`
    }).then(res => {
      this.setState({ todos: res.data });
      this.notifyDelete();
    });
  };

  handleAllCompleted = () => {
    if (!this.state.todos[0]) return;
    axios({
      method: "put",
      url: `http://127.0.0.1:5000/todos/all-completed`,
      data: { done: !this.state.todos[0].done }
    }).then(res => {
      this.setState({ todos: res.data });
      if (res.data[0].done) this.notifyDone();
    });
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
      axios({
        method: "put",
        url: `http://127.0.0.1:5000/todos/${data._id}/update`,
        data: todo
      }).then(res => {
        let newTodos = this.state.todos.map((item) => {
          if (item._id === res.data._id) return res.data;
          else return item;
        });
        this.setState({ todos: newTodos });
        this.notifyEdit();
      });
    }
  };

  notifyAdd = () =>
    toast("Added", { containerId: "topRight", hideProgressBar: true });
  notifyEdit = () =>
    toast("Edited", { containerId: "topRight", hideProgressBar: true });
  notifyDelete = () =>
    toast("Deleted", { containerId: "topRight", hideProgressBar: true });
  notifyCompleted = () =>
    toast("Completed", { containerId: "topRight", hideProgressBar: true });
  notifyDone = () =>
    toast("Done!", { containerId: "topRight", hideProgressBar: true });

  render() {
    return (
      <section className="section-outer">
        <section className="section-todo">
          <ToastContainer
            containerId={"topRight"}
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
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
