import React, {Component} from 'react';
import LiftComponent from './LiftComponent';
import {Container} from 'react-bootstrap';

class WorkoutComponent extends Component {
  constructor() {
    super()
    this.state = {
    
    }
  }


 componentDidMount = async () =>{
 
 }
 
  render() {
    return (
      <>
      <Container>
        <h2>Push Day</h2>
        <LiftComponent title={'Bench Press'} sets={3} reps={5} weight={135}/>
        </Container>
      </>
    )
  }
}

export default WorkoutComponent;