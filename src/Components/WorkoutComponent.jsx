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
    this.setState({
      liftData: response.data.recordset });
   

 }
 
  render() {
    const {liftData, selectedWorkoutID} = this.state;
    console.log(liftData)

  const liftList = liftData.map((lift) => {
    return(
     lift.WorkoutID === selectedWorkoutID ?
      <LiftComponent key={lift.WorkoutLiftLogID} WorkoutLiftLogID={lift.WorkoutLiftLogID} title={lift.LiftTitle} sets={lift.Sets} reps={lift.Reps} weight={lift.Weight} notes={lift.Notes}/> : null
      
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