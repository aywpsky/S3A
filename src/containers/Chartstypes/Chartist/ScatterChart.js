import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import CanvasJSReact from '../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ScatterChart extends Component{


render(){
    const options = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        axisX: {
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY:{
            includeZero: false,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "",
            dataPoints: [
                { x: 14.2, y: 215},
                { x: 12.9, y: 175},
                { x: 16.4, y: 325},
                { x: 26.9, y: 625},
                { x: 32.5, y: 464},
                { x: 22.1, y: 522},
                { x: 19.4, y: 412},
                { x: 25.1, y: 544},
                { x: 34.9, y: 374},
                { x: 28.7, y: 541},
                { x: 23.4, y: 544},
                { x: 35.5, y: 600},
                { x: 44.2, y: 384},
                { x: 48.3, y: 389},
                { x: 33.9, y: 574},
                { x: 31.4, y: 502},
                { x: 40.8, y: 262},
                { x: 37.4, y: 312},
                { x: 42.3, y: 202},
                { x: 39.1, y: 302},
                { x: 17.2, y: 408},
                { x: 23.4, y: 544},
                { x: 31.4, y: 502},
                { x: 40.8, y: 262},
                { x: 37.4, y: 312},
                { x: 43.3, y: 222},
                { x: 40.1, y: 322},
                { x: 38.2, y: 418},
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

export default ScatterChart;   