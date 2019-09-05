import React from 'react';
import Item from './Item';

class List extends React.Component {
    render () {
        return (
            <section class="section-outer">
                <section className="section-todo">
                    <Item />
                </section>
            </section>
        )
    }
}

export default List;