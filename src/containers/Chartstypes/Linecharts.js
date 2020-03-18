import React,{ Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class Linecharts extends Component{
  constructor(props){
      super(props);
      this.state={
        label: 'Sales Analyics',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 50,
        data: [65, 59, 80, 81, 56, 55, 40,10]
      }
  }

  render() {  
      const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August'],
  datasets: [
    {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 50,
        data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
    var option = {
        showLines: true,
        allowDataOverflow : true
    }
    return (
      <div>
        <Line width={600} height={250} data={data} options={option}/>
      </div>
    );
  }
}