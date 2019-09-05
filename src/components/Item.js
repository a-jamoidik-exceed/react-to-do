import React from 'react';

class Item extends React.Component {
    state = {
        editMode : false,
        currentValue : this.props.data.content
    }
    handleOnClickBtnDel = (e) => {
        e.preventDefault();
        this.props.onDelTodoItem(e.currentTarget.id);
    }
    handleOnClkDone = (e) => {
        e.preventDefault();
        this.props.onDoneTodoItem(e.currentTarget.id)
    }
    handleOnDblClk = (e) => {
        this.setState((state) => {
            return {editMode : !state.editMode}
        })
    }
    handleOnChangeTodo = (e) => {
        this.setState({currentValue : e.currentTarget.value});
    }
    handleOnKeyPress = (e) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            this.props.onChangeDataTodo({
                content : e.currentTarget.value,
                date : this.props.data.date
            })
            this.setState((state) => {
                return {editMode : !state.editMode}
            })
        }
    }
    render () {
        return (
            <li className="section-todo-list-item">
                <div className="section-todo-list-item-control">
                    <button
                    id={this.props.data.date}
                    className={this.props.data.done ? 'section-todo-list-item-control__done done' : 'section-todo-list-item-control__done'}
                    onClick={this.handleOnClkDone}
                    ></button>
                </div>
                <div className="section-todo-list-item-input">
                    <span 
                    className={this.state.editMode ? "section-todo-list-item-input__text-view hidden" : "section-todo-list-item-input__text-view"}
                    onDoubleClick={this.handleOnDblClk}
                    >{this.props.data.content}</span>
                    <input
                    className={this.state.editMode ? "section-todo-list-item-input__text-change" : "section-todo-list-item-input__text-change hidden"}
                    type="text"
                    value={this.state.currentValue}
                    onKeyPress={this.handleOnKeyPress}
                    onChange={this.handleOnChangeTodo}
                    id={this.props.data.date}/>
                </div>
                <div className="section-todo-list-item-delete">
                    <button
                    className="section-todo-list-item-delete__delete"
                    id={this.props.data.date}
                    onClick={this.handleOnClickBtnDel}
                    ></button>
                </div>
            </li>
        )
    }
}

export default Item;