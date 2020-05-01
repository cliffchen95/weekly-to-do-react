import React, { Component } from 'react';
import { Header, Button, Form, Checkbox, Divider, Grid, Segment, Message } from 'semantic-ui-react';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      register: false,
      username: "",
      password: "",
      checkPassword: "",
      warning: 0
    };
  }

  componentWillMount() {
    this._isMounted = true;
  }

  async componentDidMount() {
    try {
      const url = process.env.REACT_APP_API_URL + "api/v1/users/logout"
      const res = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      const json = await res.json();
    } catch (err) {
      console.log(err);
    }
  }
  
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onRegister = async (e) => {
    e.preventDefault()
    if (this.state.checkPassword !== this.state.password) {
      this.setState({ warning: 1 })
    } else {
      try {
        const result = await this.props.register({
          username: this.state.username,
          password: this.state.password
        })

        this._isMounted && this.setState({
          register: result.status === 401,
          username: "",
          password: "",
          checkPassword: "",
          warning: result.status,
          message: result.message
        })
      } catch(err) {
        console.error(err)
      }
    }
  }

  onLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await this.props.login({
        username: this.state.username,
        password: this.state.password
      })

      this._isMounted && this.setState({
        warning: result.status,
        message: result.message
      })
    } catch(err) {
      console.error(err)
    }
  }
  switchLoginRegister = () => {
    this.setState({ 
      register: !this.state.register,
      username: "",
      password: "",
      checkPassword: "" 
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const WarningMessage = () => {
      if (this.state.warning === 1) {
        return(
        <Message>
          <Message.Header>Your password does not match!</Message.Header>
          <p>Please try again!</p>
        </Message>
      )}
      if (this.state.warning === 401) {
        return(
        <Message>
          <Message.Header>{this.state.message}</Message.Header>
          <p>Please try again!</p>
        </Message>
      )}
      if (this.state.warning === 412) {
        return(
        <Message>
          <Message.Header>{this.state.message}</Message.Header>
          <p>Please try again!</p>
        </Message>
      )}
    }
    const LoginForm = (
      <Form onSubmit={this.onLogin}>
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
        {WarningMessage()}
      </Form>
    )
    const RegisterForm = (
      <Form onSubmit={this.onRegister}>
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
        {WarningMessage()}
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
