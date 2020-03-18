import React , {Component } from 'react';
import {PieChart} from 'react-easy-chart';
import AUX from '../../../hoc/Aux_';

class Piecharts extends Component{

render(){

    return(
            <AUX>
                <PieChart
                            data={[
                                { key: 'A', value: 100, color: '#3c4ccf' },
                                { key: 'B', value: 200, color: '#02a499' },
                                { key: 'C', value: 50, color: '#f0f1f4' }
                            ]}
                            innerHoleSize={200}
                            padding={10}
                            size={300}
                    />
            </AUX>
        );
    }
}

export default Piecharts;   