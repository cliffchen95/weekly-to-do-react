import React, { Component } from 'react';
import { Header, Button, Popup, Grid, Container, Modal} from 'semantic-ui-react'
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
      goal: this.props.goal.goal
    }
  }

  getEvents = async () => {
    const date = new Date(this.state.startDate)
    console.log("this is in get Event")
    const query = `?year=${date.getUTCFullYear()}&month=${date.getUTCMonth()+1}&day=${date.getUTCDate()}`
    console.log(query)
    const url = process.env.REACT_APP_API_URL + 'api/v1/events/' + query
    try {
      const res = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      const json = await res.json()
      console.log(json)
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
  async componentDidMount() {
    await this.getEvents();
    this.generateDays(this.state.startDate);
  }
  async componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      console.log("there has been a change in props date")
      console.log('this is props.date')
      console.log(this.props.date)
      console.log("this is prevProps")
      console.log(prevProps.date)
      await this.setState({ startDate: this.props.date })
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
    this.setState({ dates: dates})
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
          />
        )
      })
    )
    const containerStyle = {
      paddingTop: "10px"
    }

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

