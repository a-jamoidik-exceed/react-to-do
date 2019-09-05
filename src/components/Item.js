import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    state = {
        editMode : false,
        currentValue : this.props.data.content
    }
    handleOnClickBtnDel = (e) => {
        e.preventDefault();
        this.props.onDelTodoItem(this.props.data.id);
    }
    handleOnClkDone = (e) => {
        e.preventDefault();
        this.props.onDoneTodoItem(this.props.data.id)
    }
    handleOnDblClk = (e) => {
        this.setState((state) => {
            return {editMode : !state.editMode}
        })
        this.inputRef.current.focus();
    }
    handleOnChangeTodo = (e) => {
        this.setState({currentValue : e.currentTarget.value});
    }
    handleOnKeyPress = (e) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            this.props.onChangeDataTodo({
                content : e.currentTarget.value,
                id : this.props.data.id
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
                    ref={this.inputRef}
                    />
                </div>
                <div className="section-todo-list-item-delete">
                    <button
                    className="section-todo-list-item-delete__delete"
                    onClick={this.handleOnClickBtnDel}
                    ></button>
                </div>
            </li>
        )
    }
}

export default Item;