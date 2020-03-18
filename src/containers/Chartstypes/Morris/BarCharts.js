import React , {Component } from 'react';
import {BarChart} from 'react-easy-chart';
import AUX from '../../../hoc/Aux_';

class BarCharts extends Component{

render(){
    return(
            <AUX>
                  <BarChart
                    axes
                    axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                    yAxisOrientLeft
                    height={300}
                    width={700}
                    data={[
                    {
                        x: 'A',
                        y: 46
                    },
                    {
                        x: 'B',
                        y: 26
                    },
                    {
                        x: 'C',
                        y: 15
                    },
                    {
                        x: 'D',
                        y: 12
                    },
                    {
                        x: 'E',
                        y: 36
                    },
                    {
                        x: 'F',
                        y: 36
                    },
                    {
                        x: 'G',
                        y: 19
                    },
                    {
                        x: 'H',
                        y: 35
                    },
                    {
                        x: 'I',
                        y: 15
                    },
                    {
                        x: 'J',
                        y: 10
                    },
                    {
                        x: 'K',
                        y: 36
                    },
                    {
                        x: 'L',
                        y: 13
                    },
                    {
                        x: 'M',
                        y: 43
                    },
                    {
                        x: 'N',
                        y: 18
                    },
                    {
                        x: 'O',
                        y: 16
                    },
                    {
                        x: 'P',
                        y: 32
                    }
                    ]}
                />
            </AUX>
        );
    }
}

export default BarCharts;   