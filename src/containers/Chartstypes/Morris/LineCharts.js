import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import {LineChart} from 'react-easy-chart';

class LineCharts extends Component{

render(){

    return(
            <AUX>
                 <LineChart
                    axes
                    yAxisOrientLeft
                    width={680}
                    interpolate={'cardinal'}
                    lineColors={['blue', 'cyan', 'pink']}
                    height={300}
                    data={[
                    [
                        { x: 1, y: 12, z: 5 },
                        { x: 2, y: 10, z: 15},
                        { x: 3, y: 25, z: 25}
                    ],[
                        { x: 1, y: 10, z: 15},
                        { x: 2, y: 12, z: 35 },
                        { x: 3, y: 4, z: 45 }
                    ],[
                        { x: 1, y: 4, z: 25},
                        { x: 2, y: 12, z: 12 },
                        { x: 3, y: 24, z: 18 }
                    ]
                    ]}
                />
            </AUX>
        );
    }
}

export default LineCharts;   