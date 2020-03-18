import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import CanvasJSReact from '../../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component{

render(){
   
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label}",
            dataPoints: [
                { y: 18, label: "Laptop" },
                { y: 25, label: "Desktop" },
                { y: 19, label: "Other" },
                { y: 5, label: "Tablets" },
                { y: 19, label: "Mobile" }
            ],
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

export default PieChart;   