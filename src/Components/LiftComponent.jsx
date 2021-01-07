import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import stylesheet from '../assets/LiftComponent.css'
import { Container } from 'react-bootstrap';

class LiftComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Title: props.title,
      Sets: props.sets,
      Reps: props.reps,
      Weight: props.weight,
      Notes: props.notes,
      WorkoutLiftLogID: props.WorkoutLiftLogID,
      successfullySaved: false,
    }
  }

  

  //textbox handlers
handleSetsChange = (e) => {
  this.setState({Sets: e.target.value})
}
handleRepsChange = (e) => {
  this.setState({Reps: e.target.value})
}
handleWeightChange = (e) => {
  this.setState({Weight: e.target.value})
}
handleNotesChange = (e) => {
  this.setState({Notes: e.target.value})
}
handleSaveLift = async () =>{
  var today = new Date();
  var updatedLift = {
    WorkoutLiftLogID: this.state.WorkoutLiftLogID,
    Sets: this.state.Sets,
    Reps: this.state.Reps,
    Weight: this.state.Weight,
    Notes: this.state.Notes,
    Date: today
  }
  var response = await axios.put('/api/workoutliftlog', updatedLift, null);
  console.log(response);
  if(response.data === "success")
  {
    this.setState({successfullySaved: true});
  }
  else{
    this.setState({successfullySaved: false});
  }

}


  render() {
  const{Title, Sets, Reps, Weight, Notes, successfullySaved} = this.state;

  const redDot = (
    <span className="redDot"/>
  )
  const greenDot = (
    <span className="greenDot"/>
  )
    return (
        <Form>
        <Form.Group as={Row}>
          <Col xs={8}>
          <Form.Label> <h4>{Title}:</h4> </Form.Label> 
          </Col>
          <Col xs={1}>
          {successfullySaved === false ? redDot : greenDot}
          </Col>
        </Form.Group>
            
        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Sets:
          </Form.Label>
          <Col xs="5">
            <Form.Control onChange={this.handleSetsChange} value={Sets}/>
          </Col>
        </Form.Group>
      
        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Reps:
          </Form.Label>
          <Col xs="5">
            <Form.Control onChange={this.handleRepsChange} value={Reps} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Weight:
          </Form.Label>
          <Col xs="5">
            <Form.Control onChange={this.handleWeightChange} value={Weight} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Notes:
          </Form.Label>
          <Col xs="5">
            <Form.Control type="textarea" onChange={this.handleNotesChange} value={Notes} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col>
            <Button column xs={6} variant="success" onClick={this.handleSaveLift}>
            Save {Title}
          </Button>
          </Col>
        </Form.Group>
      </Form>

      

      
    )
  }
}

export default LiftComponent;