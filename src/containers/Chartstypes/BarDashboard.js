import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import CanvasJSReact from '../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarDashboard extends Component{

    constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}


render(){
    const options = {
        animationEnabled: true,
        axisY: {
        },
        toolTip: {
            shared: true,
            reversed: true
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true,
            cursor: "pointer",
            itemclick: this.toggleDataSeries
        },
        data: [
        {
            type: "stackedColumn",
            name: "General",
            showInLegend: true,
            yValueFormatString: "#,###k",
            dataPoints: [
                { label: "Jan", y: 14 },
                { label: "Feb", y: 12 },
                { label: "Mar", y: 14 },
                { label: "Apr", y: 13 },
                { label: "May", y: 13 },
                { label: "Jun", y: 13 },
                { label: "Jul", y: 14 },
                { label: "Aug", y: 14 },
                { label: "Sept", y: 13 },
                { label: "Oct", y: 14 },
                { label: "Nov", y: 14 },
                { label: "Dec", y: 14 }
            ]
        },
        {
            type: "stackedColumn",
            name: "IT",
            showInLegend: true,
            yValueFormatString: "#,###k",
            dataPoints: [
                { label: "Jan", y: 14 },
                { label: "Feb", y: 8 },
                { label: "Mar", y: 6 },
                { label: "Apr", y: 6 },
                { label: "May", y: 5 },
                { label: "Jun", y: 5 },
                { label: "Jul", y: 6 },
                { label: "Aug", y: 3 },
                { label: "Sept", y: 9 },
                { label: "Oct", y: 5 },
                { label: "Nov", y: 8 },
                { label: "Dec", y: 2 },
            ]
        }]
    }
    return(
            <AUX>
             <CanvasJSChart height='200' options = {options}  onRef={ref => this.chart = ref} />
            </AUX>
        );
    }
}

export default BarDashboard;   