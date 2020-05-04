import React from 'react';
import { Header, Divider, Button} from 'semantic-ui-react';

export default function HeaderContainer(props) {
  const headerStyle = {
    backgroundColor: "#769fcd",
    padding: "10px"
  }
  const titleStyle = {
    marginLeft: '20px'
  }
  const divStyle = {
    paddingLeft: "50px",
    color: "white"
  }
  const date = new Date(props.date)
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const weekDiv = (
    <div style={divStyle}>
      <h3>{month[date.getUTCMonth()]}</h3>
      <Button content="Prev Week" size="tiny" onClick={props.prev}/>
      <Button content="Next Week" size="tiny" onClick={props.next}/>
    </div>
  )
  return(
    <header style={headerStyle}>
      {
        props.loggedIn 
        ?
        <Button size='small' icon='sign-out' floated="right" content="Log out" onClick={props.logout}/>
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