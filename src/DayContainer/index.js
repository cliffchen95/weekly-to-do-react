import React, { Component } from 'react';
import { Card, List, Button, Icon, Modal, Popup } from 'semantic-ui-react';
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
  delete = (id) => {
    this.closeDetail()
    this.props.deleteEvent(id)
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
            <EventDetail event={event} delete={this.delete}/>
          </Modal>
        </List.Item>
      )
    })
    const cardStyle = {
      color: "#3d84a8",
      backgroundColor: "#f7fbfc"
    }
    const date = new Date()
    const today = new Date(date.getUTCFullYear(), date.getMonth(), date.getDate())
    console.log(today)
    console.log(today.getUTCDate())
    const isToday = (today.getUTCDate() == this.props.date.getUTCDate()) && (today.getUTCMonth() == this.props.date.getUTCMonth())
    return (
      <Card style={cardStyle} color={ isToday ? "red" : "blue" }>
        <Card.Content>
          <Card.Header textAlign='center'>
            {days[this.props.date.getUTCDay()]}, {this.props.date.getUTCDate()}
          </Card.Header>
          <Card.Description>
            {
              this.props.events.length === 0 ?
              "There is nothing going on!" :
              <List divided>{events}</List>
            }
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Modal 
        open={this.state.modalOpen}
        onClose={this.toggleModal}
        >
          <Modal.Header>{days[this.props.date.getUTCDay()]}, {this.props.date.getUTCDate()}</Modal.Header>
          <Modal.Content>
            <NewEventForm 
            date={this.props.date} 
            addEvent={this.props.addEvent}
            closeModel={this.toggleModal}
            />
          </Modal.Content>
        </Modal>
        <Popup
        trigger={<Button 
          icon='add' 
          circular 
          floated='right' 
          size='tiny'
          onClick={this.toggleModal}
          />}
        content="Click to add event"
        basic
        />
        </Card.Content>
      </Card>
    )
  }
}