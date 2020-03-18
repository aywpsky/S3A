
import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import {BarChart,Bar, XAxis, YAxis, Tooltip } from 'recharts';

        const data = [
            { name: 'food', uv: 250, pv: 200, amt: 48, time: 2000 },
            { name: 'cosmetic', uv: 3300, pv: 2000, amt: 6500, time: 2002, uvError: 120, pvError: 50 },
            { name: 'storage', uv: 3200, pv: 1398, amt: 5000, time: 2006, uvError: [120, 80], pvError: [200, 100] },
            { name: 'digital', uv: 2800, pv: 2800, amt: 4000, time: 2008, uvError: 100, pvError: 30 },
            { name: 'digital', uv: 2800, pv: 2500, amt: 4000, time: 2010, uvError: 100, pvError: 30 },
            { name: 'digital', uv: 1800, pv: 1500, amt: 4000, time: 2012, uvError: 100, pvError: 30 },
            { name: 'digital', uv: 800, pv: 500, amt: 4000, time: 2014, uvError: 100, pvError: 30 },
          ];
          
          const initialState = {
            data
          };
          class BarCharts extends Component{
            state = initialState;
            
          render(){  
                const { data } = this.state;
            return (
                <AUX>
            <div className="bar-charts">
                <button
                className="btn update btn btn-link"
                onClick={this.handleChangeData} >
                change data
                </button>
                <br/>

                <p>BarChart of layout vertical</p>
                <div className="">
                {this.props.side !=='single' ?
                <BarChart width={600} height={400} data={data} maxBarSize={10} >
                    <XAxis padding={{ left: 20, right: 0 }}  dataKey="time" />
                    <YAxis />
                    
                    <Tooltip />
                    <Bar dataKey="uv" fill="#7A6FBE"/><Bar dataKey="pv" fill="#28BBE3"/>
                </BarChart> :
                <BarChart width={900} height={400} barCategoryGap={40} data={data}  margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
                    <XAxis dataKey="name" />
                    <Bar dataKey="uv" barGap={20} fill="#7A6FBE" />
                </BarChart>
                }
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
 
  
    export default connect(mapStatetoProps,null)(BarCharts);