import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    { 
        label:'',
        backgroundColor: '#7a6fbe', //violet
        borderWidth: 0,
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [77,66,55,44,3,22,11],
        width:5
    },
    {
        label:'',
        backgroundColor: '#29bbe3', //blue
        borderWidth: 0,
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [11,22,33,44,55,66,77]
      }
  ]
};

export default class Overlapbar extends Component{ 
  

  render() {
    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data}
          width={100}
          height={60}
          options={{
            display: false,
      stacked: true,
      id: "bar-x-axis2",
      barThickness: 70,
      // these are needed because the bar controller defaults set only the first x axis properties
      type: 'category',
      categoryPercentage: 0.8,
      barPercentage: 0.9,
      gridLines: {
        offsetGridLines: true
      }
          }}
        />
      </div>
    );
  }
}