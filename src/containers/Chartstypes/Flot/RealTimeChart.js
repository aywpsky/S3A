import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import RTChart from 'react-rt-chart';

class RealTimeChart extends Component{

    componentDidMount() {
        setInterval(() => this.forceUpdate(), 1000);
    }

render(){

      var flow = {
        duration: 200
    };
   
    var data = {
        date: new Date(),
        Car:  Math.random()
      };
      
    return(
            <AUX>
                <RTChart
                flow={flow}
                fields={['Car']}
                data={data} />
            </AUX>
        );
    }
}

export default RealTimeChart;   