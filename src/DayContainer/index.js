import React from 'react';
import { Header, Card, List, Button, Icon, Popup, Modal } from 'semantic-ui-react';
import NewEventForm from '../NewEventForm';

export default function DayContainer(props) {
  const events = props.events.map((event, key) => {
    return (
      <List.Item key={key}>
        <List.Content floated='right'>
          <Icon name={event.category}/>
        </List.Content>
        <List.Content>
          <List.Header as='a'>{event.title}</List.Header>
          <List.Description>
            {event.description}
          </List.Description>
        </List.Content>
      </List.Item>
    )
  })
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.date.toDateString()}</Card.Header>
        <Card.Description>
          <List >{events}</List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Modal trigger={<Button icon='add' circular floated='right' size='tiny'/>}>
        <Modal.Header>Date</Modal.Header>
        <Modal.Content><NewEventForm /></Modal.Content>
      </Modal>
      </Card.Content>
    </Card>
  )
}