import React , {Component } from 'react';
import {AreaChart} from 'react-easy-chart';
import AUX from '../../../hoc/Aux_';

class Areacharts extends Component{

render(){
    return(
            <AUX>
                   <AreaChart
                      axes
                      margin={{top: 10, right: 10, bottom: 50, left: 50}}
                      axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                      width={780}
                      interpolate={'cardinal'}
                      height={300}
                      areaColors={['#6dd6cf', '#a6ade4']}
                      data={[
                        [
                          { x: 1, y: 20 },
                          { x: 2, y: 30 },
                          { x: 3, y: 85 },
                          { x: 4, y: 55 },
                          { x: 5, y: 75 },
                          { x: 6, y: 65 },
                          { x: 7, y: 15 },
                          { x: 8, y: 55 },
                          { x: 9, y: 18 },
                          { x: 10, y: 39 }
                        ], [
                          { x: 1, y: 10 },
                          { x: 2, y: 22 },
                          { x: 3, y: 45 },
                          { x: 4, y: 78 },
                          { x: 5, y: 14 },
                          { x: 6, y: 65 },
                          { x: 7, y: 45 },
                          { x: 8, y: 12 },
                          { x: 9, y: 77 },
                          { x: 10, y: 84 }
                        ]
                      ]}
                    />
            </AUX>
        );
    }
}

export default Areacharts;   