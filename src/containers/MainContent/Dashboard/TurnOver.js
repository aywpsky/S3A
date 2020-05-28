import React,{ Component } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import Config from '../../../config/Config';
let label = [];
// let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export default class TurnOver extends Component{
  constructor(props){
      super(props);
      this.state={
        data: [],
        label : []
      }
  }

  componentDidMount(){
      this.getdata();
  }
  getdata = async() => {
      const res = await axios.get(Config.base_url + 'dashboard/turnover');
      const {rmi , deliverd} = res.data;
      const {data} = this.state;

      rmi.map((val ,idx) => {
          label.push(val.material_name);
          let to = val.avg / deliverd[0].total_Mats;
          data.push(to.toFixed());
      });
      this.setState({label : label , data : data});

  }

  render() {
      const data = {
  labels: this.state.label,
  datasets: [
    {
        label: 'Inventory Turnover',
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
        data: this.state.data
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
