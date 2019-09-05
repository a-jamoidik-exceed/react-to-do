import React from 'react';

class Control extends React.Component {
    state = {
        currentLink : 'all'
    }
    handleClickLink = (e) => {
        this.setState({currentLink : e.currentTarget.id});
        this.props.onChangeFilter(e.currentTarget.id);
    }
    handleClickClearCompleted = (e) => {
        this.props.onClearCompleted();
    }
    countActiveTodo = () => {
        let activeTodos = this.props.todos.filter((item) => {
            if (!item.done) return true;
        })
        return activeTodos.length + ' items left';
    }
    render () {
        return (
            <div className="section-todo-control">
                <div className="section-todo-control-left">{this.countActiveTodo()}</div>
                <div className="section-todo-control-filter">
                    <a href="#" className={this.state.currentLink === "all" ? "section-todo-control-filter__link current" : "section-todo-control-filter__link"} onClick={this.handleClickLink} id="all">All</a>
                    <a href="#" className={this.state.currentLink === "active" ? "section-todo-control-filter__link current" : "section-todo-control-filter__link"} onClick={this.handleClickLink} id="active">Active</a>
                    <a href="#" className={this.state.currentLink === "completed" ? "section-todo-control-filter__link current" : "section-todo-control-filter__link"} onClick={this.handleClickLink} id="completed">Completed</a>
                </div>
                <div className="section-todo-control-clear">
                    <a href="#" className="section-todo-control-clear__link" onClick={this.handleClickClearCompleted} id="completed">Clear completed</a>
                </div>
            </div>
        )
    }
}

export default Control;