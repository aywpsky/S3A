
import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import {BarChart,Bar } from 'recharts';
class tinycharts extends Component{


    render(){
        const data = this.props.tiny_data;
        return(
            <AUX>
                <div className="state-information d-none d-sm-block">
                                        <div className="state-graph">
                                            <div id="">
                                            <BarChart side='0' width={110} height={40} data={data}>
                                                <Bar dataKey='uv' fill='#8884d8'/>
                                                </BarChart>
                                            </div>
                                            <div className="info">Balance $ 2,317</div>

                                        </div>
                                        <div className="state-graph">
                                            <div id="">
                                            <BarChart side='0' width={110} height={40} data={data}>
                                                <Bar dataKey='uv' fill='#17a2b8'/>
                                                </BarChart>
                                            </div>
                                            <div className="info">Item Sold 1230</div>
                                        </div>
                                    </div>
            </AUX>
        );
    }
}

const mapStatetoProps = state =>{
    return {
        tiny_data :state.tiny_red.tinydata
    };
  }


    export default connect(mapStatetoProps,null)(tinycharts);
