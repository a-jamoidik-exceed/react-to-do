import React from 'react';
import Item from './Item';

class List extends React.Component {
    listRender = (todos) => {
        let list = [];
        list = todos.map((item, index) => {
            if (this.props.filterApply) {
                if (this.props.filterDone) {
                    if (item.done) {
                        return (<Item
                            key={item.id}
                            data={item}
                            onDelTodoItem={this.props.onDelTodoItem}
                            onDoneTodoItem={this.props.onDoneTodoItem}
                            onChangeDataTodo={this.props.onChangeDataTodo}
                            />
                        );
                    }
                } else {
                    if (!item.done) {
                        return (<Item
                            key={item.id}
                            data={item}
                            onDelTodoItem={this.props.onDelTodoItem}
                            onDoneTodoItem={this.props.onDoneTodoItem}
                            onChangeDataTodo={this.props.onChangeDataTodo}
                            />
                        );
                    }
                }
            } else {
                return (<Item
                    key={item.id}
                    data={item}
                    onDelTodoItem={this.props.onDelTodoItem}
                    onDoneTodoItem={this.props.onDoneTodoItem}
                    onChangeDataTodo={this.props.onChangeDataTodo}
                    />
                );
            }
            return [];
        })
        return list;
    }
    
    render () {
        return (
            <ul className="section-todo-list">
                {this.listRender(this.props.todos)}
            </ul>      
        )
    }
}

export default List;