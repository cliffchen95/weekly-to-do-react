import React, { Component } from 'react';
import { Header, Button, Form, TextArea} from 'semantic-ui-react';

export default class EditEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.event.category,
      title: props.event.title,
      description: props.event.description,
      date: props.event.date
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = async (e) => {
    try {
      e.preventDefault()
      const date = new Date(this.state.date)
      const year = date.getFullYear()
      const month = date.getUTCMonth() + 1
      const day = date.getUTCDate()
      await this.props.update(this.props.event.id, {
        category: this.state.category,
        title: this.state.title,
        description: this.state.description,
        year: year,
        month: month,
        day: day
      })
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
        <Header size='medium' textAlign='center'>Edit Event</Header>
        <Form.Field>
          <label>Title</label>
          <input 
          placeholder='Title'
          name='title'
          value={this.state.title}
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
        content='Edit Event' 
        icon="edit"
        />
      </Form>
    )
  }
}