import React, {Component} from 'react';
import LiftComponent from './LiftComponent';
import {Container} from 'react-bootstrap';
import axios from 'axios';

class WorkoutComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    liftData: [],
    selectedWorkoutID: this.props.id,
    }
  }


 componentDidMount = async () =>{
   //make call to node server to get lift data from DB
    var response = await axios.get('/api/liftdata');
    this.setState({liftData: response.data});
 }
 
  render() {
    const {liftData, selectedWorkoutID} = this.state;

  const liftList = liftData.map((lift) => {
    return(
     lift.workoutid === selectedWorkoutID ?
      <LiftComponent key={lift.workoutliftlogid} WorkoutLiftLogID={lift.workoutliftlogid} title={lift.lifttitle} sets={lift.sets} reps={lift.reps} weight={lift.weight} notes={lift.notes}/> : null
      
    )
  })
    return (
      <>
      <Container>
        <h1>{this.props.workoutTitle}</h1>
        {liftList}
        </Container>
      </>
    )
  }
}

export default WorkoutComponent;