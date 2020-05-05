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
      currentDate: new Date(),
      goal: "",
      date: new Date()
    }
  }

  logout = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/users/logout"
      const res = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      const json = await res.json();
      this.setState({
        loggedIn: false,
        user: ""
      })
    } catch (err) {
      console.log(err);
    }
  }
  nextWeek = async () => {
    const date = new Date(this.state.date)
    date.setDate(date.getDate() + 7)
    await this.setState({ date: new Date(date) })
    const goal = await this.getGoal()
    await this.setState({ goal: goal.data.goal })
  }
  prevWeek = async () => {
    const date = new Date(this.state.date)
    date.setDate(date.getDate() - 7)
    await this.setState({ date: new Date(date) })
    const goal = await this.getGoal()
    await this.setState({ goal: goal.data.goal })
  }
  getGoal = async () => {
    try {
      const date = new Date(this.state.date)
      const query = `?year=${date.getUTCFullYear()}&month=${date.getUTCMonth()+1}&day=${date.getUTCDate()}`
      const url = process.env.REACT_APP_API_URL + "api/v1/goals/" + query
      const res = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      const json = await res.json();
      if (json.status === 404) {
        return await this.createGoal({ goal: "" })
      } else {
        return json;
      }
    } catch (err) {
      console.log(err);
    }
  }
  createGoal = async (info) => {
    try {
      const date = new Date(this.state.date)
      const query = `?year=${date.getUTCFullYear()}&month=${date.getUTCMonth()+1}&day=${date.getUTCDate()}`
      const url = process.env.REACT_APP_API_URL + "api/v1/goals/" + query
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err)
    }
  }

  register = async (info) => {
    const url = process.env.REACT_APP_API_URL + "api/v1/users/"
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
      const goal = await this.getGoal()
      if (json.status === 201) {
        this.setState({
          loggedIn: true,
          user: json.data.username
        })
      }
      return json;
    } catch (err) {
      console.error("there has been an error")
    }
  }

  login = async (info) => {
    const url = process.env.REACT_APP_API_URL + "api/v1/users/login"
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
      const goal = await this.getGoal()
      if (json.status === 200) {
        this.setState({
          loggedIn: true,
          user: json.data.username,
          goal: goal.data.goal,
          date: goal.data.start_date
        });
      }
      console.log(goal)
      return json;
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    console.log("this is in APP")
    console.log(this.state)
    return (
      <div className="App">
        <HeaderContainer 
        loggedIn={this.state.loggedIn}
        date={this.state.date}
        logout={this.logout}
        next={this.nextWeek}
        prev={this.prevWeek}
        />
        {
          this.state.loggedIn ?
          <WeekContainer 
          user={this.state.user}
          date={this.state.date}
          goal={this.state.goal}
          /> :
          <LoginRegisterForm 
          register={this.register}
          login={this.login}
          />
        }
      </div>
    );
  }
}

export default App;