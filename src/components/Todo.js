import React from 'react';
import Form from './Form';
import List from './List';
import Control from './Control';

class Todo extends React.Component {
    state = {
        todos : [],
        filterDone : false,
        filterApply : false
    }
    handleDelTodoItem = (id) => {
        let indexDelTodo = this.state.todos.findIndex((item) => item.id === id);
        let newTodos = [].concat(this.state.todos);
        newTodos.splice(indexDelTodo, 1);
        this.setState({todos : newTodos});
    }
    handleAddNewTodo = (newTodo) => {
        this.setState({
            todos : [newTodo, ...this.state.todos]
        })
    }
    handleDoneTodoItem = (id) => {
        let indexDoneTodo = this.state.todos.findIndex((item) => item.id === id);
        let newTodos = [].concat(this.state.todos);
        newTodos[indexDoneTodo].done = true;
        this.setState({todos : newTodos});
    }
    handleChangeFilter = (id) => {
        if (id === 'all') this.setState({filterApply : false})
        else if (id === 'active') this.setState({filterApply : true, filterDone : false})
        else if (id === 'completed') this.setState({filterApply : true, filterDone : true})
    }
    handleClearCompleted = () => {
        let newTodos = this.state.todos.filter((item) => {
            if (!item.done) return item;
            else return false;
        });
        this.setState({todos : newTodos});
    }
    handleAllCompleted = () => {
        let newTodos = this.state.todos.map((item) => {
            item.done = true;
            return item;
        });
        this.setState({todos : newTodos});
    }
    countActiveTodo = () => {
        let activeTodo = this.state.todos.find((item) => {
            if (!item.done) return item;
            else return false;
        })
        if (activeTodo.length > 0) return activeTodo.length;
        else return 0;
    }
    handleChangeDataTodo = (data) => {
        this.state.todos.map((item) => {
             if (item.id === data.id) {
                item.content = data.content;
            }
            return item;
        })
    } 
    componentDidMount () {
        fetch('/todoData.json')
        .then(res => {
            return res.json();
        })
        .then(data => {
            this.setState({todos : data})
        })
    }
    render () {
        return (
            <section className="section-outer">
                <section className="section-todo">
                    <Form
                    onAddNewTodo={this.handleAddNewTodo}
                    onClkAllCompleted={this.handleAllCompleted}
                    />
                    {this.state.todos.length > 0 &&
                        <List
                        todos={this.state.todos}
                        onDelTodoItem={this.handleDelTodoItem}
                        onDoneTodoItem={this.handleDoneTodoItem}
                        filterDone={this.state.filterDone}
                        filterApply={this.state.filterApply}
                        onChangeDataTodo={this.handleChangeDataTodo}
                        />
                    }
                    {this.state.todos.length > 0 &&
                        <Control
                        todos={this.state.todos}
                        onChangeFilter={this.handleChangeFilter}
                        onClearCompleted={this.handleClearCompleted}
                        />
                    }
                </section>
            </section>
        )
    }
}

export default Todo;