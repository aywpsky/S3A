import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import CanvasJSReact from '../../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CandleStick extends Component{

render(){
    const options = {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        animationEnabled: true,
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            includeZero:false,
        },
        data: [{
            type: "candlestick",
            yValueFormatString: "$###0.00",
            xValueFormatString: "MMMM YY",
            dataPoints: [
                { x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] },
                { x: new Date("2017-02-01"), y: [36.82, 36.95, 34.84, 36.20] },
                { x: new Date("2017-03-01"), y: [35.85, 36.30, 34.66, 36.07] },
                { x: new Date("2017-04-01"), y: [36.19, 37.50, 35.21, 36.15] },
                { x: new Date("2017-05-01"), y: [36.11, 37.17, 35.02, 36.11] },
                { x: new Date("2017-06-01"), y: [36.12, 36.57, 33.34, 33.74] },
                { x: new Date("2017-07-01"), y: [33.51, 35.86, 33.23, 35.47] },
                { x: new Date("2017-08-01"), y: [35.66, 36.70, 34.38, 35.07] }
            ]
        }
      ]
    }
    return(
            <AUX>
                <CanvasJSChart options = {options}
				onRef={ref => this.chart = ref}
			/>
            </AUX>
        );
    }
}

export default CandleStick;   