import React, {Component} from 'react';
import LiftComponent from './LiftComponent';
import {Container} from 'react-bootstrap';
import axios from 'axios';

class ProgressionDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        historicalLifts: [],
        countoflifts: null,
        liftLogData: []

    }
  }


 componentDidMount = async () =>{
    var historicallogresponse = await axios.get('/api/historicallog');
    var countoflifts = await axios.get('/api/numberoflifts');
    this.setState({historicalLifts: historicallogresponse.data, countoflifts: countoflifts.data[0].count});
    await this.groupLiftData();

 }

 groupLiftData = async  () => {
    var LiftLogData = [];
    for(var x = 1; x <= this.state.countoflifts; x++){
        LiftLogData.push(await this.filterResponses(this.state.historicalLifts, x));
    }
    this.setState({liftLogData: LiftLogData});
 }

 filterResponses = (historicalLifts, x) => {
    return historicalLifts.filter(lift => lift.liftid === x);
 }
 
  render() {
      const {liftLogData} = this.state;
    console.log(liftLogData)
   
      if(liftLogData.length > 0){
        let sets = liftLogData[0][0]["sets"] 
        let reps = liftLogData[0][0]["reps"] 
        let weight = liftLogData[0][0]["weight"] 
        let totalWeightLifted = sets * reps * weight;
        console.log(totalWeightLifted)
    //       for(var x = 0; x < liftLogData.length; x++){
    //           for(var y=0; y < liftLogData[x].length; y++){
    //             //   let sets = liftLogData[x][y]["sets"] 
    //             //   let reps = liftLogData[x][y]["reps"] 
    //             //   let weight = liftLogData[x][y]["weight"] 
    //             //   let totalWeightLifted = sets * reps * weight;
    //             //   console.log(totalWeightLifted)
    //             //   return(
    //             //       <ProgressionChart 
    //             //   )
    //           }
    //       }
     }

  
    return (
      <>
      <Container>

    </Container>
      </>
    )
  }
}

export default ProgressionDashboard;