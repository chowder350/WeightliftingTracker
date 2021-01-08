import React, {Component} from 'react';
import LiftComponent from './LiftComponent';
import {Container} from 'react-bootstrap';
import axios from 'axios';

class ProgressionDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        historicalLifts: []

    }
  }


 componentDidMount = async () =>{
    var response = await axios.get('/api/historicallog');
    console.log(response)
    this.setState({historicalLifts: response.data});
 }
 
  render() {
  
    return (
      <>
      <Container>

    </Container>
      </>
    )
  }
}

export default ProgressionDashboard;