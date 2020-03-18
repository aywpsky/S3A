import React , {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import Config from '../../../config/Config';
import axios from 'axios';
//
// const option = {}
//
// const datas = {
// 	labels: [
// 		'Total cost of material used',
// 		'Labor',
// 		'Electricity',
// 		'Other material used',
// 		'Other expenses',
// 	],
// 	datasets: [{
// 	  data: [254178, 223829 , 223829 ,223829,223829],
// 	  backgroundColor: [
// 	  '#FF4961',
// 	  '#1E9FF2',
// 	  '#28D094',
// 	  '#FFC000',
// 	  '#FC8F48'
// 	  ],
// 	  hoverBackgroundColor: [
// 		'#f27283',
// 		'#6dbef2',
// 		'#ffb3b3',
// 		'#f0d992',
// 		'#f2af83'
// 	  ]
// 	}]
//   };

class ProductionCost extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {},
            option : {},
			data_object_new:{}
        }
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData = () => {
        let url = Config.base_url + 'dashboard/doughNut';
		var bgArray = ['#FF4961','#1E9FF2','#28D094','#FFC000','#FC8F48'];
		var bgHoverArray = ['#f27283','#6dbef2','#ffb3b3','#f0d992','#f2af83'];
		var data = {};
		const data_object_new = {
			labels: [],
			datasets: [{
				data: [],
			  	backgroundColor: [],
			  	hoverBackgroundColor: []
			}]
		}
        let res = axios.get(url).then(res => {

            const {data , total_cost} = res.data;
			data.map((val,index) => {
				data_object_new.labels.push(val.account);
				data_object_new.datasets[0].data[index] = parseInt(val.amount);
				data_object_new.datasets[0].backgroundColor.push(bgArray[index]);
				data_object_new.datasets[0].hoverBackgroundColor.push(bgHoverArray[index]);
            });

			this.setState({data_object_new:data_object_new});

			  const option = {
			  	tooltips: {
			  		callbacks: {
			  			label: function(tooltipItem) {
			  				var dataset = this.state.data_object_new.datasets[tooltipItem.datasetIndex];
			  				var meta = dataset._meta[Object.keys(dataset._meta)[0]];
			  				var total = meta.total;
			  				var currentValue = dataset.data[tooltipItem.index];
			  				var percentage = parseFloat((currentValue/total*100).toFixed(1));
			  				return currentValue + ' (' + percentage + '%)';
			  			},
			  			title: function(tooltipItem, data) {
			  				return this.state.data_object_new.labels[tooltipItem[0].index];
			  			}
			  		}
			  	}
			  }
			this.setState({option : option});
		});
	}

    render() {
		return(
            <Doughnut data={this.state.data_object_new} option = {this.state.option} />
        )
    }
}
export default ProductionCost;
