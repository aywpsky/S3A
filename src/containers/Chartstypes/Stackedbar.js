import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

var data = {
    labels: ["x1", "x2", "x3"],
    datasets: [{
      label: "First",
      backgroundColor: '#7a6fbe',
      borderWidth: 1,
      data: [10, 20, 30],
      xAxisID: "bar-x-axis1",
    }, {
      label: "Second",
      backgroundColor: '#29bbe3',
      borderWidth: 1,
      data: [10,20,30],
      xAxisID: "bar-x-axis1",
    },{
        label: "Second",
        backgroundColor: '#f4c63d',
        borderWidth: 1,
        data: [20,20,20],
        xAxisID: "bar-x-axis1",
      }]
  };
  
  var options = {
    scales: {
      xAxes: [{
        stacked: true,
        id: "bar-x-axis1",
        barThickness: 35,
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: false
        },
      }]
  
    }
  };
export default class Overlapbar extends Component{ 
  

  render() {
    return (
      <div>
        <h2>Stacked  Example (custom size)</h2>
        <Bar
          data={data}
          width={100}
          height={60}
          options={
             options}
        />
      </div>
    );
  }
}