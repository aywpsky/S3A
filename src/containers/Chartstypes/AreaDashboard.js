import React , {Component } from 'react';
import {AreaChart} from 'react-easy-chart';
import AUX from '../../hoc/Aux_';

class AreaDashboard extends Component{

render(){
    return(
            <AUX>
                   <AreaChart
                      axes
                      margin={{top: 10, right: 10, bottom: 50, left: 50}}
                      axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                      width={780}
                      interpolate={'cardinal'}
                      height={320}
                      areaColors={['#6dd6cf', '#a6ade4']}
                      data={[
                        [
                          { x: 2001, y: 20 },
                          { x: 2002, y: 30 },
                          { x: 2003, y: 85 },
                          { x: 2004, y: 55 },
                          { x: 2005, y: 75 },
                          { x: 2006, y: 65 },
                          { x: 2007, y: 15 },
                          { x: 2008, y: 55 },
                          { x: 2009, y: 18 },
                          { x: 2010, y: 39 }
                        ], [
                          { x: 2001, y: 10 },
                          { x: 2002, y: 22 },
                          { x: 2003, y: 45 },
                          { x: 2004, y: 78 },
                          { x: 2005, y: 14 },
                          { x: 2006, y: 65 },
                          { x: 2007, y: 45 },
                          { x: 2008, y: 12 },
                          { x: 2009, y: 77 },
                          { x: 2010, y: 84 }
                        ]
                      ]}
                    />
            </AUX>
        );
    }
}

export default AreaDashboard;   