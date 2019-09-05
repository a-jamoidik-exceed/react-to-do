import React from 'react';
import Form from './Form';
import List from './List';

class Todo extends React.Component {
    render () {
        return (
            <section class="section-outer">
                <section className="section-todo">
                    <Form />
                    <List />
                </section>
            </section>
        )
    }
}

export default Todo;