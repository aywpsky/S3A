import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import CanvasJSReact from '../../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineBarChart extends Component
{
    constructor() {
		super();
		this.createPareto = this.createPareto.bind(this);
	}
	componentDidMount(){
		this.createPareto();
	}
	createPareto(){
		var dps = [];
		var chart = this.chart;
		var yValue, yTotal = 0, yPercent = 0;
		for(var i = 0; i < chart.data[0].dataPoints.length; i++)
			yTotal += chart.data[0].dataPoints[i].y;
		for(var i = 0; i < chart.data[0].dataPoints.length; i++){
			yValue = chart.data[0].dataPoints[i].y;
			yPercent += (yValue / yTotal * 100);
			dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
		}
		chart.addTo("data",{type:"line", yValueFormatString: "0.##"%"", dataPoints: dps});
		chart.data[1].set("axisYType", "secondary", false);
		chart.axisY[0].set("maximum", Math.round(yTotal / 20) * 20);
		chart.axisY2[0].set("maximum", 100);
	}
render(){
    
    const options = {
        axisY: {
            lineColor: "#4F81BC",
            tickColor: "#4F81BC",
            labelFontColor: "#4F81BC"
        },
        axisY2: {
            lineColor: "#C0504E",
            tickColor: "#C0504E",
            labelFontColor: "#C0504E"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Strain", y: 8 },
                { label: "Scratch", y: 14 },
                { label: "Pinhole", y: 10 },
                { label: "Crack", y: 12 },
                { label: "Gap", y: 42 },
                { label: "Others", y: 104 }
            ]
        }]
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

export default LineBarChart;   