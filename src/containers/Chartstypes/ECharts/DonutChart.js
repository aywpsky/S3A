import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import {Doughnut} from 'react-chartjs-2';

class DonutChart extends Component{

render(){
    const data = {
        labels: [
          'Laptop',
          'Tablets',
          'Mobile',
          'Others',
          'Desktop',
        ],
        datasets: [{
          data: [254178, 223829,125541,854785,56325],
          backgroundColor: [
            '#02a499','#f8b425','#ec4561','#38a4f8','#cccccc'
          ],
        }]
      };

      const option = {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue/total*100).toFixed(1));
              return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        }
      }

    return(
            <AUX>
                <Doughnut data={data} options={option} />
            </AUX>
        );
    }
}

export default DonutChart;
