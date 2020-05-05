import React from 'react';
import { Button, Modal } from 'semantic-ui-react'
import EditEventForm from '../EditEventForm';

export default function EventDetail(props) {
  return (
    <React.Fragment>
      <div className="header">{props.event.title}</div>
      <div className="content">
        <p>{props.event.description}</p>
      </div>
      <Button content="delete" onClick={ () => props.delete(props.event.id) }/>
      <Button content="edit" onClick={() => props.openEdit(props.event.id)} />
      { 
        props.event.id === props.edit 
        &&
        <EditEventForm event={props.event} />
      }

    </React.Fragment>
  )
}