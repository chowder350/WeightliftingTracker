import React, {Component} from 'react'
import {Line}  from "react-chartjs-2";
import {Container} from 'react-bootstrap';

const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#FFFFFF",
    fontSize: 14
  }
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 1500,
          suggestedMax: 6000
        }
      }
    ]
  }
};

function ProgressionChart(props) {
  return (
    <Container>
      <h3 className="mt-5">{props.title}</h3>
      <Line data={props.data} options={{ responsive: true }} legend={legend} options={options}/>
    </Container>
  )
}
    

export default ProgressionChart;