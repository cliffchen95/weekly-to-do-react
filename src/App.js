import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm';
import WeekContainer from './WeekContainer';
import HeaderContainer from './HeaderContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: "",
      startDate: ""
    }
  }

  register = async (info) => {
    const url = process.env.REACT_APP_API_URL + "api/v1/users"
    try {
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      if (json.status == 201) {
        this.setState({
          loggedIn: true,
          user: json.data.username
        })
      } 
    } catch(err) {
      console.error(err)
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
