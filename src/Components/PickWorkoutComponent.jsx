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
    workoutTitle:null,
    workoutID: null,
    showWorkoutComponent: false,
    }
  }


 componentDidMount = async () =>{
   //make call to node server to get lift data from DB
    var response = await axios.get('/api/workouts');
    this.setState({workoutList: response.data.recordset});
   

 }

 handleCardClick = (e, workoutTitle, id) => {
    this.setState({
        workoutTitle: workoutTitle,
        workoutID: id,
        showWorkoutComponent: true,
    })

  }
 
  render() {
    const {workoutList, workoutID, workoutTitle, showWorkoutComponent} = this.state;
    console.log(workoutTitle, workoutID)

   

  const workoutCards = workoutList.map((workout) => {
      console.log(workout.WorkoutID)
    return(
        <div>
        <WorkoutCard key={workout.WorkoutID} id={workout.WorkoutID} title={workout.Title} handleCardClick={this.handleCardClick}/>
        <br/>
        </div>
    )
 })

    let View;
    //If a workout has not yet been selected, display our View as the options to select.
    if(showWorkoutComponent === false)
    {
        View = ( 
        <div>
        <h1>Select a Workout</h1>
        {workoutCards.length > 0 ? workoutCards : null} 
        </div>) 
    }
    else{ //Once a workout has been selected, display the Workout component in our view.
        View = (
            <WorkoutComponent id={workoutID} workoutTitle={workoutTitle}/>
        )
       
        
    }

    return (
      <>
      <Container>
      {showWorkoutComponent !== null ? View : null}
      </Container>
      </>
    )
  }
}

export default PickWorkoutComponent;