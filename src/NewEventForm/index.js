import React, { Component } from 'react';
import { Header, Button, Form, TextArea} from 'semantic-ui-react';

export default class NewEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      title: "",
      description: "",
      date: props.date
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = async (e) => {
    try {
      e.preventDefault()
      const year = this.state.date.getFullYear()
      const month = this.state.date.getUTCMonth() + 1
      const day = this.state.date.getUTCDate()
      const result = await this.props.addEvent({
        category: this.state.category,
        title: this.state.title,
        description: this.state.description,
        year: year,
        month: month,
        day: day
      });
      this.props.closeModel();
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const options = [
      { key: "empty", text: "", value: "" },
      { key: 'minor', text: 'Minor', value: 'circle' },
      { key: 'important', text: 'Important', value: 'star' },
      { key: 'deadline', text: 'Deadline', value: 'exclamation' },
    ].map((option) => {
      return (
        <option key={option.key} value={option.value}>{option.text}</option>
      )
    })
    return(
      <Form onSubmit={this.onSubmit}>
        <Header size='medium' textAlign='center'>New Event</Header>
        <Form.Field>
          <label>Title</label>
          <input 
          placeholder='Title'
          name='title'
          value={this.state.title}
          name="title"
          onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <select value={this.state.category} onChange={this.onChange} name="category">
            {options}
          </select>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea 
          placeholder='Description'
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          />
        </Form.Field>
        <Button 
        type='submit'
        content='Add Event' 
        icon="add"
        />
      </Form>
    )
  }
}