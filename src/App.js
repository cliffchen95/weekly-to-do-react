import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm';
import WeekContainer from './WeekContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.loggedIn ?
          <WeekContainer /> :
          <LoginRegisterForm />
        }
        }
      </div>
    );
  }
}

export default App;
