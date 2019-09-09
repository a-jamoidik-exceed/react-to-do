import React from "react";

class Item extends React.Component {
  state = {
    editMode: false,
    currentValue: this.props.data.content
  };

  handleOnClickBtnDel = e => {
    e.preventDefault();
    this.props.onDelTodoItem(this.props.data._id);
  };

  handleOnClkDone = e => {
    e.preventDefault();
    this.props.onDoneTodoItem(this.props.data._id);
  };

  handleOnDblClk = e => {
    this.setState(state => {
      return { editMode: !state.editMode };
    });
  };

  handleOnChangeTodo = e => {
    this.setState({ currentValue: e.currentTarget.value });
  };

  handleOnKeyPress = e => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      this.props.onChangeDataTodo({
        content: e.currentTarget.value,
        _id: this.props.data._id
      });
      this.setState(state => {
        return { editMode: !state.editMode };
      });
    }
  };

  render() {
    return (
      <li className="section-todo-list-item">
        
        <div className="section-todo-list-item-control">
          <button
            className={
              this.props.data.done
                ? "section-todo-list-item-control__done done"
                : "section-todo-list-item-control__done"
            }
            onClick={this.handleOnClkDone}
          ></button>
        </div>
        <div className="section-todo-list-item-input">
          {this.state.editMode ? (
            <input
              className="section-todo-list-item-input__text-change"
              type="text"
              value={this.state.currentValue}
              onKeyPress={this.handleOnKeyPress}
              onChange={this.handleOnChangeTodo}
            />
          ) : (
            <span
              className="section-todo-list-item-input__text-view"
              onDoubleClick={this.handleOnDblClk}
            >
              {this.props.data.content}
            </span>
          )}
        </div>
        <div className="section-todo-list-item-delete">
          <button
            className="section-todo-list-item-delete__delete"
            onClick={this.handleOnClickBtnDel}
          ></button>
        </div>
      </li>
    );
  }
}

export default Item;
