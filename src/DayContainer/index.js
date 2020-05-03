import React, { Component } from 'react';
import { Header, Card, List, Button, Icon, Popup, Modal } from 'semantic-ui-react';
import NewEventForm from '../NewEventForm';
import EventDetail from '../EventDetail';

export default class DayContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      modalDetail: -1
    }
  }
  toggleModal = () => {
    console.log(this.props.date)
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  showDetail = (e) => {
    this.setState({ modalDetail: e.target.name })
  }
  closeDetail = () => {
    this.setState({ modalDetail: -1 })
  }
  render() {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const events = this.props.events.map((event, key) => {
      return (
        <List.Item key={key}>
          <List.Content floated='right'>
            <Icon name={event.category} />
          </List.Content>
          <List.Content>
            <List.Header as='a' onClick={this.showDetail} name={key}>{event.title}</List.Header>
            <List.Description>
              {event.description.length > 38 ? event.description.substring(0, 34) + "..." : event.description}
            </List.Description>
          </List.Content>
          <Modal key={key} open={this.state.modalDetail == key} onClose={this.closeDetail}>
            <EventDetail event={event} />
          </Modal>
        </List.Item>
      )
    })
    const cardStyle = {
      color: "#3d84a8",
      backgroundColor: "#f7fbfc"
    }
    return (
      <Card style={cardStyle}>
        <Card.Content>
          <Card.Header textAlign='center'>
            {days[this.props.date.getUTCDay()]}, {this.props.date.getUTCDate()}
          </Card.Header>
          <Card.Description>
            <List divided>{events}</List>
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