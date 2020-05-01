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
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const options = [
      { key: 'all', text: 'All', value: 'all' },
      { key: 'articles', text: 'Articles', value: 'articles' },
      { key: 'products', text: 'Products', value: 'products' },
    ]
    return(
      <Form >
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
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
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