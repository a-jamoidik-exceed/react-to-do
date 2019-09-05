import React from 'react';
import Control from './Form/Control';
import Input from './Form/Input';

class Form extends React.Component {
    render () {
        return (
            <div>
                <Control />
                <Input />
            </div>
        )
    }
}

export default Form;