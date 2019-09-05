import React from 'react';
import Header from './components/Header';
import Todo from './components/Todo';
import style from './style.scss';

import './App.css';

class App extends React.Component {
    render () {
        return (
            <div className="App">
                <div className="wrapper">
                    <Header />
                </div>
            </div>
        )
    }
}

export default App;
