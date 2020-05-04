import React from 'react';
import { Button } from 'semantic-ui-react'

export default function EventDetail(props) {
  return (
    <React.Fragment>
      <div className="header">{props.event.title}</div>
      <div className="content">
        <p>{props.event.description}</p>
      </div>
      <Button content="delete" onClick={ () => props.delete(props.event.id) }/>
    </React.Fragment>
  )
}