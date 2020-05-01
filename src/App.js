import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    }
  }

  render() {
    return (
      <div className="App">
        <LoginRegisterForm />
      </div>
    );
  }
}

export default App;
