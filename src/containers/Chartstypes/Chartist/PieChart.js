import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import CanvasJSReact from '../../../assets/js/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component{

render(){
    const options = {
        theme: "light2",
        animationEnabled: true,
        exportFileName: "",
        exportEnabled: true,
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "<strong>{y}</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: 32 },
                { y: 22 },
                { y: 15 },
                { y: 19 },
                { y: 5 },
                { y: 7 }
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

export default PieChart;   