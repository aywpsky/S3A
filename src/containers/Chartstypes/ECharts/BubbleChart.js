import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import CanvasJSReact from '../../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BubbleChart extends Component{

render(){
   
    const options = {
        animationEnabled: true,
        theme: "light2", 
        axisX: {
        logarithmic: true
        },
        data: [{
            type: "bubble",
            toolTipContent: "<b>{label}</b>",
            dataPoints: [
                { label: "Jan", x: 36, y: 452, z: 3031 },
                { label: "Feb", x: 67.2, y: 726, z: 7521 },
                { label: "Mar", x: 93, y: 285, z: 7926 },
                { label: "Apr", x: 141.6, y: 230, z: 4222 },
                { label: "May", x: 483.6, y: 120, z: 88729 },
                { label: "Jun", x: 886.7, y: 88, z: 74600 },
                { label: "Jul", x: 1784.0, y: 409, z: 32600 },
                { label: "Aug", x: 2794.4, y: 408, z: 30200 },
                { label: "Sep", x: 93, y: 285, z: 7926 },
                { label: "Oct", x: 141.6, y: 230, z: 4222 },
                { label: "Nov", x: 173.6, y: 560, z: 79026 },
                { label: "Dec", x: 623.6, y: 520, z: 87926 },
            ]
        }]
    }

    return(
            <AUX>
             <CanvasJSChart options = {options} />
            </AUX>
        );
    }
}

export default BubbleChart;   