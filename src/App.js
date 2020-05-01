import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm';
import WeekContainer from './WeekContainer';
import HeaderContainer from './HeaderContainer';
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
        <HeaderContainer loggedIn={this.state.loggedIn}/>
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
