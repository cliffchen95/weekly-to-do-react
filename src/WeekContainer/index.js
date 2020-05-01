import React, { Component } from 'react';
import { Header, Divider, Card, Button, Popup} from 'semantic-ui-react'
import DayContainer from '../DayContainer';

export default class WeekContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const events = [
      { 
        title: "interview",
        description: "this is very important!!",
        category: "cog"
      },
      { 
        title: "interview",
        description: "this is very important!",
        category: "circle"
      },
      { 
        title: "interview",
        description: "this is very important",
        category: "coffee"
      }
    ]

    const events2 = [
      { 
        title: "interview",
        description: "this is very important!!",
        category: "cog"
      },
      { 
        title: "interview",
        description: "this is very important!",
        category: "circle"
      },
      { 
        title: "grocery shopping",
        description: "meat, vegitable, garlic, and so on...",
        category: "coffee"
      },
      { 
        title: "interview",
        description: "this is very important",
        category: "dollar sign"
      },
      { 
        title: "interview",
        description: "this is very important",
        category: "exclamation circle"
      }
    ]
    return (
      <React.Fragment>
        <Header as='h3'>Weekly Goals: I want to be famous</Header>
        <Popup
        trigger={<Button icon='edit' circular floated='right'/>}
        content="Click to edit weekly goal"
        basic
        />
        <Divider />
        <Card.Group>
          <DayContainer events={events} date="Mon, April 24" />
          <DayContainer events={events} date="Tues, April 25" />
          <DayContainer events={events} date="Wed, April 26" />
          <DayContainer events={events2} date="Thur, April 27" />
          <DayContainer events={events} date="Fri, April 28" />
          <DayContainer events={events} date="Sat, April 29" />
          <DayContainer events={events} date="Sun, April 30" />
        </Card.Group>
      </React.Fragment>
    )
  }
}

