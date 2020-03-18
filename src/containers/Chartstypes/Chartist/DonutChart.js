import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import CanvasJSReact from '../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DonutChart extends Component{

    


render(){
    const options = {
        animationEnabled: true,
        subtitles: [{
            text: "71% Positive",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            // indexLabel: "{y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                {  y: 5 },
                {  y: 31 },
                {  y: 40 },
                {  y: 17 },
                {  y: 7 }
            ]   
        }]
    }
    return(
            <AUX>
            <CanvasJSChart options = {options}
			/>
            </AUX>
        );
    }
}

export default DonutChart;   