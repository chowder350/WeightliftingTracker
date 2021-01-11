import React, {Component} from 'react';
import LiftComponent from './LiftComponent';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import ProgressionChart from './ProgressionChart'

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
 
 renderCharts = () => {
  const {liftLogData} = this.state;

  if(liftLogData.length > 0){
    for(var x = 0; x< liftLogData.length; x++){
      let liftdates = [];
      let liftdata = [];
      let lifttitle = ""
      for(var y = 0; y < liftLogData[x].length; y++){
        liftdates.push(liftLogData[x][y].date)
        liftdata.push(liftLogData[x][y].sets * liftLogData[x][y].reps * liftLogData[x][y].weight)
        lifttitle = liftLogData[x][y].lifttitle
      }
      let data = {
        "labels": liftdates,
        "datasets": [
          {
            "label": "Total Weight",
            "data": liftdata,
            "fill": false,
            "backgroundColor": "#00FF00",
            "borderColor": "#00FF00"
          }
        ],
      }
      return(
        <ProgressionChart data={data} title={lifttitle}/>
      )
    }   
 }
}
 
  render() {
    const {liftLogData} = this.state;

    if(liftLogData){
      var ProgressionCharts = liftLogData.map((lift) => {
        let liftdates = [];
        let liftdata = [];
        let lifttitle = ""
        for(var y = 0; y < lift.length; y++){
          console.log(lift[y].length)
          liftdates.push(lift[y].date)
          liftdata.push(lift[y].sets * lift[y].reps * lift[y].weight)
          lifttitle = lift[y].lifttitle
        }
        let data = {
          "labels": liftdates,
          "datasets": [
            {
              "label": "Total Weight",
              "data": liftdata,
              "fill": false,
              "backgroundColor": "#00FF00",
              "borderColor": "#00FF00"
            }
          ],
        }
        return(
          <ProgressionChart data={data} title={lifttitle}/>
        )
      })
    }
    

    return (
      <>
      <Container>
        {ProgressionCharts}
      </Container>
      </>
    )
  }
}

export default ProgressionDashboard;