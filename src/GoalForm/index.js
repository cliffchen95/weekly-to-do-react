import React, { Component } from 'react';
import { Header, Button, Form, TextArea} from 'semantic-ui-react';

export default class GoalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = async (e) => {
    try {
      e.preventDefault();
      await this.props.updateGoal(this.state)
      this.props.closeModal();
    } catch (err) {
      console.log(err)   
    }
  }
  render() {
    return(
      <Form onSubmit={this.onSubmit}>
        <Header size='medium' textAlign='center'>This Week Gaol</Header>
        <Form.Field>
          <label>Goal:</label>
          <TextArea 
          placeholder='goal'
          name="goal"
          value={this.state.goal}
          onChange={this.onChange}
          />
        </Form.Field>
        <Button 
        type='submit'
        content='Submit' 
        icon="add"
        />
      </Form>
    )
  }
}