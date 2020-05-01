import React, { Component } from 'react';
import { Header, Button, Form, Checkbox, Divider, Grid, Segment } from 'semantic-ui-react';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      username: "",
      password: "",
      checkPassword: ""
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  switchLoginRegister = () => {
    this.setState({ 
      register: !this.state.register,
      username: "",
      password: "",
      checkPassword: "" 
    })
  }

  render() {
    const LoginForm = (
      <Form>
        <Header size='medium' textAlign='center'>Log in</Header>
        <Form.Field>
          <label>Username</label>
          <input 
          placeholder='Username'
          name='username'
          value={this.state.username}
          onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
          placeholder='Password' 
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.onChange}
          />
        </Form.Field>
        <Button 
        type='submit'
        content={!this.state.register ? 'Log in' : 'Register'} 
        icon={!this.state.register ? 'sign-in' : 'signup'} 
        />
      </Form>
    )
    const RegisterForm = (
      <Form>
        <Header size='medium' textAlign='center'>Register</Header>
        <Form.Field>
          <label>Username</label>
          <input 
          placeholder='Username'
          name='username'
          value={this.state.username}
          onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
          placeholder='Password' 
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input 
          placeholder='Re-enter Password' 
          type='password'
          name='checkPassword'
          value={this.state.checkPassword}
          onChange={this.onChange}
          />
        </Form.Field>
        <Button 
        type='submit'
        content={!this.state.register ? 'Log in' : 'Register'} 
        icon={!this.state.register ? 'sign-in' : 'signup'} 
        />
      </Form>
    )
    return (
      <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              {this.state.register ? RegisterForm : LoginForm}
            </Grid.Column>

            <Grid.Column verticalAlign='middle' textAlign='center'>
              {this.state.register ? "Already have an account?" : "Does not have an account?"}
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
