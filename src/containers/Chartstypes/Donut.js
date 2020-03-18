import React , {Component } from 'react';
import { connect } from 'react-redux';
import {Doughnut} from 'react-chartjs-2';

const setBg = () => {
	const randomColor = Math.floor(Math.random()*16777215).toString(16);
	return  "#" + randomColor;
	console.log(randomColor);
}

const data = {
	labels: [
		'one',
		'two',
		'three',
		'matthew',
		'durk',
		'amaba'
	],
	datasets: [{
		data: [300, 500 , 200 , 700 , 200,111],
		backgroundColor: [
			setBg(),
			setBg(),
			setBg(),
			setBg(),
			setBg(),
			setBg()
		],
		hoverBackgroundColor: [
			setBg(),
			setBg(),
			setBg(),
			setBg(),
			setBg(),
			setBg()
		]
	}]
};

  class Donut extends Component{

			render() {
				return (
				  <div>
					<Doughnut height={265} data={data} />
				  </div>
				);
			  }
			}

const mapStatetoProps = state =>{
    return {
        tiny_data :state.tiny_red.tinydata
    };
  }


    export default connect(mapStatetoProps,null)(Donut);
