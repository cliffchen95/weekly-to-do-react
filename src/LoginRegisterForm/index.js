import React, { Component } from 'react';
import { Header, Button, Form, Checkbox, Divider, Grid, Segment } from 'semantic-ui-react';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false
    }
  }

  switchLoginRegister = () => {
    this.setState({ register: !this.state.register })
  }

  render() {
    const LoginForm = (
      <Form>
        <Header size='medium' textAlign='center'>Login</Header>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' type='password'/>
        </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
    )
    const RegisterForm = (
      <Form>
        <Header size='medium' textAlign='center'>Register</Header>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' type='password'/>
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input placeholder='Re-enter Password' type='password'/>
        </Form.Field>
        <Button type='submit'>Register</Button>
      </Form>
    )
    return (
      <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              {this.state.register ? RegisterForm : LoginForm}
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Button 
              content={this.state.register ? 'Log in' : 'Register'} 
              icon={this.state.register ? 'sign-in' : 'signup'} 
              size='big' 
              onClick={this.switchLoginRegister}
              />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
    )
  }
}

export default LoginRegisterForm
