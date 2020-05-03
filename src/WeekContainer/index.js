import React, { Component } from 'react';
import { Header, Divider, Card, Button, Popup, Grid, Container } from 'semantic-ui-react'
import DayContainer from '../DayContainer';

export default class WeekContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      startDate: props.startDate,
      dates: []
    }
  }

  getEvents = async () => {
    const url = process.env.REACT_APP_API_URL + 'api/v1/events/'
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
      console.log(json);
      return json;
    } catch (err) {
      console.log(err)
    }
  }
  async componentDidMount() {
    await this.getEvents();
    this.generateDays(this.state.startDate);
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

  render() {
    const dayContainers = (
      this.state.dates.map((date, key) => {
        return (
          <DayContainer 
          date={new Date(date)} key={key} 
          events={this.state.events.filter( event => new Date(event.date).getDate() == new Date(date).getDate())}
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
          <Header as='h3'>Goals: I want to be famous</Header>
          <Grid.Column floated='right'>
            <Popup
            trigger={<Button icon='edit' circular/>}
            content="Click to edit weekly goal"
            basic
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Card.Group className="ui four doubling cards" stackable centered>
            {dayContainers}
          </Card.Group>
        </Grid.Row>
      </Grid>
      </Container>
    )
  }
}

