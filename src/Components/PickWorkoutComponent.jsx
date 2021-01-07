import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import WorkoutCard from './WorkoutCard'
import WorkoutComponent from './WorkoutComponent'

class PickWorkoutComponent extends Component {
  constructor() {
    super()
    this.state = {
    workoutList: [],
    selectedWorkoutTitle:null,
    selectedWorkoutID: null,
    showSelectedWorkoutComponent: false,
    }
  }


 componentDidMount = async () =>{
   //make call to node server to get lift data from DB
    var response = await axios.get('/api/workouts');
    this.setState({workoutList: response.data});
   

 }

 handleCardClick = (e, workoutTitle, id) => {
    this.setState({
        selectedWorkoutTitle: workoutTitle,
        selectedWorkoutID: id,
        showSelectedWorkoutComponent: true,
    })

  }


 
  render() {
    const {workoutList, selectedWorkoutID, selectedWorkoutTitle, showSelectedWorkoutComponent} = this.state;
    var workoutCards = {};

    if(workoutList){
      var workoutCards = workoutList.map((workout) => {
        return(
          <div>
          <WorkoutCard key={workout.workoutid} id={workout.workoutid} title={workout.title} handleCardClick={this.handleCardClick}/>
          <br/>
          </div>
      )
    })
    }
   

    let View;
    //If a workout has not yet been selected, display our View as the options to select.
    if(showSelectedWorkoutComponent === false)
    {
        View = ( 
        <div>
        <h1>Select a Workout</h1>
        {workoutCards.length > 0 ? workoutCards : null} 
        </div>) 
    }
    else{ //Once a workout has been selected, display the Workout component in our view.
        View = (
            <WorkoutComponent key={selectedWorkoutID} id={selectedWorkoutID} workoutTitle={selectedWorkoutTitle}/>
        ) 
    }

    return (
      <>
      <Container>
      {showSelectedWorkoutComponent !== null ? View : null}
      </Container>
      </>
    )
  }
}

export default PickWorkoutComponent;