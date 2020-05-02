import React from 'react';

export default function EventDetail(props) {
  return (
    <React.Fragment>
      <div className="header">{props.event.title}</div>
      <div className="content">
        <p>{props.event.description}</p>
      </div>
    </React.Fragment>
  )
}