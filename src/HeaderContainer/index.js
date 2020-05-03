import React from 'react';
import { Header, Button, Popup, Divider} from 'semantic-ui-react';

export default function HeaderContainer(props) {
  const headerStyle = {
    backgroundColor: "#769fcd",
    padding: "10px"
  }

  return(
    <header style={headerStyle}>
      {
        props.loggedIn 
        ?
        <Header as='h4' textAlign='right' inverted>the current user: (log out)</Header>
        :
        <Header as='h4' textAlign='right' inverted>You are not logged in</Header>
      }
      <Header as='h1' textAlign='center' inverted>Weekly-To-Do</Header>
      <Divider />
    </header>
  )
}