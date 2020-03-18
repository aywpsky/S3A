import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import CanvasJSReact from '../../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultiAreaChart extends Component{

render(){
   const options = {
			animationEnabled: true,
			exportEnabled: true,
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true
			},
			data: [
			{
				type: "stackedArea100",
				name: "US",
				showInLegend: true,
				xValueFormatString: "YYYY",
				dataPoints: [
					{ x: new Date(2000, 0), y: 40 },
					{ x: new Date(2001, 0), y: 62 },
					{ x: new Date(2002, 0), y: 53 },
					{ x: new Date(2003, 0), y: 49 },
					{ x: new Date(2004, 0), y: 52 },
					{ x: new Date(2005, 0), y: 32 },
					{ x: new Date(2006, 0), y: 28 },
					{ x: new Date(2007, 0), y: 46 },
					{ x: new Date(2008, 0), y: 55 },
					{ x: new Date(2009, 0), y: 88 },
					{ x: new Date(2010, 0), y: 68 },
					{ x: new Date(2011, 0), y: 63 },
					{ x: new Date(2012, 0), y: 65 },
					{ x: new Date(2013, 0), y: 68 },
					{ x: new Date(2014, 0), y: 48 },
					{ x: new Date(2015, 0), y: 39 },
					{ x: new Date(2016, 0), y: 20 },
					{ x: new Date(2017, 0), y: 26 }
				]
			},
			{
				type: "stackedArea100",
				name: "France",
				showInLegend: true,
				xValueFormatString: "YYYY",
				dataPoints: [
					{ x: new Date(2000, 0), y: 20 },
					{ x: new Date(2001, 0), y: 12 },
					{ x: new Date(2002, 0), y: 19 },
					{ x: new Date(2003, 0), y: 28 },
					{ x: new Date(2004, 0), y: 42 },
					{ x: new Date(2005, 0), y: 75 },
					{ x: new Date(2006, 0), y: 85 },
					{ x: new Date(2007, 0), y: 55 },
					{ x: new Date(2008, 0), y: 45 },
					{ x: new Date(2009, 0), y: 38 },
					{ x: new Date(2010, 0), y: 29 },
					{ x: new Date(2011, 0), y: 19 },
					{ x: new Date(2012, 0), y: 14 },
					{ x: new Date(2013, 0), y: 18 },
					{ x: new Date(2014, 0), y: 16 },
					{ x: new Date(2015, 0), y: 13 },
					{ x: new Date(2016, 0), y: 10 },
					{ x: new Date(2017, 0), y: 14 }
				]
			},
			{
				type: "stackedArea100",
				name: "UK",
				showInLegend: true,
				xValueFormatString: "YYYY",
				dataPoints: [
					{ x: new Date(2000, 0), y: 0 },
					{ x: new Date(2001, 0), y: 6 },
					{ x: new Date(2002, 0), y: 8 },
					{ x: new Date(2003, 0), y: 10 },
					{ x: new Date(2004, 0), y: 12 },
					{ x: new Date(2005, 0), y: 15 },
					{ x: new Date(2006, 0), y: 17 },
					{ x: new Date(2007, 0), y: 18 },
					{ x: new Date(2008, 0), y: 25 },
					{ x: new Date(2009, 0), y: 18 },
					{ x: new Date(2010, 0), y: 24 },
					{ x: new Date(2011, 0), y: 29 },
					{ x: new Date(2012, 0), y: 31 },
					{ x: new Date(2013, 0), y: 52 },
					{ x: new Date(2014, 0), y: 72 },
					{ x: new Date(2015, 0), y: 63 },
					{ x: new Date(2016, 0), y: 20 },
					{ x: new Date(2017, 0), y: 18 }
				]
			}
		]
		}
    return(
            <AUX>
         <CanvasJSChart  options = {options}
			/>
            </AUX>
        );
    }
}

export default MultiAreaChart;   