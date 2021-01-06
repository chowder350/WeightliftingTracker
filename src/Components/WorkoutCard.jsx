import React from 'react';
import { Card } from 'react-bootstrap';



function WorkoutCard(props) {
  return (  
    <Card onClick={(e) => props.handleCardClick(e, props.title, props.id)}>
    <Card.Body>
    <Card.Title style={{color: 'black'}}> {props.title} </Card.Title>
    </Card.Body>
    </Card>
  );
}

export default WorkoutCard;
