import React, { Component } from 'react';
import { Header, Button, Popup, Grid, Container, Modal } from 'semantic-ui-react'
import DayContainer from '../DayContainer';
import GoalForm from '../GoalForm';

export default class WeekContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      startDate: props.date,
      dates: [],
      goalModal: false,
      goal: props.goal.goal
    }
  }

  getEvents = async () => {
    const date = new Date(this.state.startDate)
    const query = `?year=${date.getUTCFullYear()}&month=${date.getUTCMonth()+1}&day=${date.getUTCDate()}`
    const url = process.env.REACT_APP_API_URL + 'api/v1/events/' + query
    try {
      const res = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      const json = await res.json()
      this.setState({ events: json.data })
    } catch (err) {
      console.log(err)
    }
  }

  addEvent = async (info) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/events/';
      const res = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json();
      await this.getEvents();
      return json;
    } catch (err) {
      console.log(err)
    }
  }

  deleteEvent = async (id) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/events/' + id
      const res = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const json = await res.json()
      await this.getEvents();
      return json;
    } catch (err) {
      console.log(err)
    }
  }

  updateEvent = async (id, info) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'api/v1/events/' + id;
      const res = await fetch(url, {
        credentials: 'include',
        method: 'PATCH',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      await this.getEvents();
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }
  async componentDidMount() {
    await this.getEvents();
    this.generateDays(this.state.startDate);
  }
  async componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date || this.props.goal !== prevProps.goal ) {
      console.log("there has been a change in props date")
      console.log('this is props.date')
      console.log(this.props.goal)
      console.log("this is prevProps")
      console.log(prevProps.goal)
      await this.setState({ 
        startDate: this.props.date,
        goal: this.props.goal.goal 
      })
      await this.getEvents();
      this.generateDays(this.state.startDate);
    }
  }
  toggleGoalForm = () => {
    this.setState({ goalModal: !this.state.goalModal })
  }
  generateDays(startDate) {
    let date = new Date(startDate);
    const dates = []
    for (let i = 0; i < 7; i++) {
      dates.push(date.toGMTString())
      date.setDate(date.getDate() + 1)
    }
    this.setState({ dates: dates })
  }
  updateGoal = async (info) => {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/goals/" + this.props.goal.id;
      const res = await fetch(url, {
        credentials: 'include',
        method: 'PATCH',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json();
      this.setState({ goal: json.data.goal })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const dayContainers = (
      this.state.dates.map((date, key) => {
        return (
          <DayContainer 
          date={new Date(date)} key={key} 
          events={this.state.events.filter( event => new Date(event.date).getDate() === new Date(date).getDate())}
          addEvent={this.addEvent}
          deleteEvent={this.deleteEvent}
          updateEvent={this.updateEvent}
          />
        )
      })
    )
    const containerStyle = {
      paddingTop: "10px"
    }
    console.log(this.state)
    return (
      <Container >
      <Grid style={containerStyle}>
        <Grid.Row>
          <Header as='h3'>Goal: {this.state.goal}</Header>
          <Modal open={this.state.goalModal} onClose={this.toggleGoalForm}>
            <GoalForm updateGoal={this.updateGoal} closeModal={this.toggleGoalForm} />
          </Modal>
          <Grid.Column floated='right'>
            <Popup
            trigger={<Button icon='edit' circular onClick={this.toggleGoalForm}/>}
            content="Click to edit weekly goal"
            basic
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row  className="ui four doubling stackable cards">
          {dayContainers}
        </Grid.Row>
      </Grid>
      </Container>
    )
  }
}