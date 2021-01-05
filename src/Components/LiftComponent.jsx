import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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
  var updatedLift = {
    WorkoutLiftLogID: this.state.WorkoutLiftLogID,
    Sets: this.state.Sets,
    Reps: this.state.Reps,
    Weight: this.state.Weight,
    Notes: this.state.Notes.toString()
  }
  var response = await axios.put('/api/workoutliftlog', updatedLift, null);
  console.log(response);

}


  render() {
  const{Title, Sets, Reps, Weight, Notes} = this.state;
    return (
        <Form>
            <h3>{Title}: </h3> 
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