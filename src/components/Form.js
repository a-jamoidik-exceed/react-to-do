import React from 'react';
import arrow from './../images/arrow-down.png';

class Form extends React.Component {
    handleOnKeyPress = (e) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            this.props.onAddNewTodo({
                content : e.currentTarget.value,
                done : false,
                date : new Date()
            })
            e.currentTarget.value = null;
        }
    }
    handleClkAllCompleted = () => {
        this.props.onClkAllCompleted();
    }
    render () {
        return (
            <div className="section-todo-form">
                <div className="section-todo-form-control">
                    <img className="section-todo-form-control__done" src={arrow} onClick={this.handleClkAllCompleted} />
                </div>
                <div className="section-todo-form-input">
                    <input className="section-todo-form-input__text" type="text" placeholder="What needs to be done?" onKeyDown={this.handleOnKeyPress}/>
                </div>
            </div>
        )
    }
}

export default Form;