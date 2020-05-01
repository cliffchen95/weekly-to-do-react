import React, { Component } from 'react';
import { Header, Card, List, Button, Icon, Popup, Modal } from 'semantic-ui-react';
import NewEventForm from '../NewEventForm';

export default class DayContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  render() {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const events = this.props.events.map((event, key) => {
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
          <Card.Header>
            {days[this.props.date.getUTCDay()]}, {this.props.date.getUTCDate()}
          </Card.Header>
          <Card.Description>
            <List >{events}</List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Modal 
        trigger={
          <Button 
          icon='add' 
          circular 
          floated='right' 
          size='tiny'
          onClick={this.toggleModal}
          />}
        open={this.state.modalOpen}
        onClose={this.toggleModal}
          >
          <Modal.Header>{this.props.date.toDateString()}</Modal.Header>
          <Modal.Content>
            <NewEventForm 
            date={this.props.date} 
            addEvent={this.props.addEvent}
            closeModel={this.toggleModal}
            />
          </Modal.Content>
        </Modal>
        </Card.Content>
      </Card>
    )
  }
}