
import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import {AreaChart,Area, XAxis, YAxis, Tooltip} from 'recharts';
class areacharts extends Component{
    
    
    render(){
        const data01 = [
            {names: 'Series 1',color:'#5EC5F3' ,data: [
                { day: '05-01', weather: 'sunny' },
                { day: '05-02', weather: 'sunny' },
                { day: '05-03', weather: 'cloudy' },
                { day: '05-04', weather: 'rain' },
                { day: '05-05', weather: 'cloudy' },
                { day: '05-06', weather: 'cloudy' },
                { day: '05-07', weather: 'cloudy' },
                { day: '05-08', weather: 'sunny' },
                { day: '05-09', weather: 'sunny' },
            ]},{names: 'Series 2',color:'#A29BCD' ,data: [
                { day: '05-01', weather: 'sunny' },
                { day: '05-02', weather: 'cloudy' },
                { day: '05-03', weather: 'sunny' },
                { day: '05-04', weather: 'rain' },
                { day: '05-05', weather: 'cloudy' },
                { day: '05-06', weather: 'sunny' },
                { day: '05-07', weather: 'cloudy' },
                { day: '05-08', weather: 'rain' },
                { day: '05-09', weather: 'sunny' },
            ]},{names: 'Series 2',color:'#A29BCD' ,data: [
                { day: '05-01', weather: 'sunny' },
                { day: '05-02', weather: 'cloudy' },
                { day: '05-03', weather: 'sunny' },
                { day: '05-04', weather: 'rain' },
                { day: '05-05', weather: 'rain' },
                { day: '05-06', weather: 'sunny' },
                { day: '05-07', weather: 'cloudy' },
                { day: '05-08', weather: 'rain' },
                { day: '05-10', weather: 'sunny' },
            ]}
          ];
         
       // const data = this.props.tiny_data;
        return(
            <AUX>
                <AreaChart
                    width='100%' height={this.props.height} 
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="day" allowDuplicatedCategory={false} />
                    <YAxis type="category"   />
                    <Tooltip />
                   
                    {data01.map(s => (
             
              <Area type="monotone" data={s.data}  key={s.names} fill={s.color}  dataKey="weather"  />
            ))}
                </AreaChart>
            </AUX>
        );
            
        
    }
}

const mapStatetoProps = state =>{
    return {
        tiny_data :state.tiny_red.tinydata
    };
  }
 
  
    export default connect(mapStatetoProps,null)(areacharts);