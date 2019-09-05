import React from 'react';
import Header from './components/Header';
import Todo from './components/Todo';
import style from './style.scss';
import normalize from './normalize.css'

import './App.css';

class App extends React.Component {
    render () {
        return (
            <div className="wrapper">
                <div className="App">
                    <Header />
                    <Todo />
                </div>
            </div>
        )
    }
}

export default App;
