import React, {Component} from 'react';
import LiftComponent from './LiftComponent';
import {Container} from 'react-bootstrap';
import axios from 'axios';

class WorkoutComponent extends Component {
  constructor() {
    super()
    this.state = {
    liftData: [],
    }
  }


 componentDidMount = async () =>{
   //make call to node server to get lift data from DB
    var response = await axios.get('/api/liftdata');
    this.setState({
      liftData: response.data.recordset });
   

 }
 
  render() {
    const {liftData} = this.state;

  const liftList = liftData.map((lift) => {
    return(
     this.props.id === lift.WorkoutID ?
      <LiftComponent key={lift.WorkoutLiftLogID} WorkoutLiftLogID={lift.WorkoutLiftLogID} workoutId={lift.WorkoutID} liftId={lift.LiftID} title={lift.LiftTitle} sets={lift.Sets} reps={lift.Reps} weight={lift.Weight} notes={lift.Notes}/> : 
      <LiftComponent/>
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