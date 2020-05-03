import React from 'react';
import { Header, Divider, Button} from 'semantic-ui-react';

export default function HeaderContainer(props) {
  const headerStyle = {
    backgroundColor: "#769fcd",
    padding: "10px",
  }
  const titleStyle = {
    marginLeft: '20px'
  }
  const weekDiv = (
    <div>
      <Button content="Prev Week" size="tiny"/>
      <Button content="Next Week" size="tiny"/>
    </div>
  )
  return(
    <header style={headerStyle}>
      {
        props.loggedIn 
        ?
        <Button size='small' icon='sign-out' floated="right" content="Log out"/>
        :
        <Header as='h4' textAlign='right' inverted>You are not logged in</Header>
      }
      <Header as='h1' style={titleStyle} inverted>Weekly-To-Do</Header>
      {
        props.loggedIn
        &&
        weekDiv
      }
      <Divider />
    </header>
  )
}