import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class LiftComponent extends Component {
  constructor() {
    super()
    this.state = {
    
    }
  }


  render() {
   console.log(this.props)
    return (
        <Form>
            <h3>{this.props.title}: </h3>
        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Sets:
          </Form.Label>
          <Col xs="5">
            <Form.Control value={this.props.sets}/>
          </Col>
        </Form.Group>
      
        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Reps:
          </Form.Label>
          <Col xs="5">
            <Form.Control value={this.props.reps} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Weight:
          </Form.Label>
          <Col xs="5">
            <Form.Control value={this.props.weight} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column xs="5">
            Notes:
          </Form.Label>
          <Col xs="5">
            <Form.Control type="textarea" value={this.props.notes} />
          </Col>
        </Form.Group>
      </Form>

      

      
    )
  }
}

export default LiftComponent;