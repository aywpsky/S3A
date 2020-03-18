import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import CanvasJSReact from '../../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component{

render(){
    const options = {
        animationEnabled: true,
        theme: "light2", // "light1", "dark1", "dark2"
        
        axisY: {
            includeZero: false,
            suffix: "%"
        },
        axisX: {
            interval: 2
        },
        data: [{
            type: "line",
            dataPoints: [
                { x: 1, y: 63 },
                { x: 2, y: 65 },
                { x: 3, y: 64 },
                { x: 4, y: 64 },
                { x: 5, y: 67 },
                { x: 6, y: 65 },
                { x: 7, y: 66 },
                { x: 8, y: 68 },
                { x: 9, y: 69 },
            ]
        }]
    }
   
    return(
            <AUX>
             <CanvasJSChart options = {options}/>
            </AUX>
        );
    }
}

export default LineChart;   