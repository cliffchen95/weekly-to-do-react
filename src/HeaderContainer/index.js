import React from 'react';
import { Header, Button, Popup, Divider} from 'semantic-ui-react';

export default function HeaderContainer(props) {
  return(
    <header>
      {
        props.loggedIn 
        ?
        <Header as='h4' textAlign='right'>the current user: (log out)</Header>
        :
        <Header as='h4' textAlign='right'></Header>
      }
      <Header as='h1' textAlign='center'>Weekly-To-Do</Header>
      {
        props.loggedIn 
        &&
        <div>
          <Header as='h2'>April</Header>
          <Popup
          trigger={<Button icon='forward' circular floated='right'/>}
          content="Click to go to next week"
          basic
          />
          <Popup
          trigger={<Button icon='backward' circular floated='left'/>}
          content="Click to go to previous week"
          basic
          />
        </div>
      }
      <Divider />
    </header>
  )
}