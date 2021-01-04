import React, {Component} from 'react';
import LiftComponent from './LiftComponent';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import WorkoutCard from './WorkoutCard'
import WorkoutComponent from './WorkoutComponent'

class PickWorkoutComponent extends Component {
  constructor() {
    super()
    this.state = {
    workoutList: [],
    }
  }


 componentDidMount = async () =>{
   //make call to node server to get lift data from DB
    var response = await axios.get('/api/workouts');
    this.setState({workoutList: response.data.recordset});
   

 }

 handleCardClick = (e, workoutTitle, id) => {
    return(
      <WorkoutComponent key={id} id={id} workoutTitle={workoutTitle} />
    )
  }
 
  render() {
    const {workoutList} = this.state;
    //console.log(workoutList)
  const workoutCards = workoutList.map((workout) => {
      console.log(workout.WorkoutID)
    return(
        <div>
        <WorkoutCard key={workout.WorkoutID} id={workout.WorkoutID} title={workout.Title} handleCardClick={this.handleCardClick}/>
        <br/>
        </div>
    )
 })

    return (
      <>
      <Container>
        <h1>Select a Workout</h1>
       {workoutCards.length > 0 ? workoutCards : null} 
      </Container>
      </>
    )
  }
}

export default PickWorkoutComponent;