import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
    ],
    
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
            '#7a6fbe',
            '#29bbe3',
            '#f4c63d'
		],
		hoverBackgroundColor: [
            '#7a6fbe',
            '#29bbe3',
            '#f4c63d'
		]
	}]
};

export default class SimplePiechart extends Component{


  render() {
    return (
      <div>
        <h2>Pie Example</h2>
        <Pie data={data} />
      </div>
    );
  }
}