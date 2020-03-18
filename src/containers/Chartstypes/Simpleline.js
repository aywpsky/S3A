import React , {Component } from 'react';
import { connect } from 'react-redux';
import {Bar} from 'react-chartjs-2';
          
  class Simpleline extends Component{

    constructor(props) {
        super(props);
        this.state ={
         }
    }

			render() {

                const data = {
                    labels: ['2015','2016','2017','2018','2018','2018'],
                    datasets: [
                      {
                          label: 'Monthly Earnings',
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: 'rgba(75,195,192,0.4)',
                          borderColor: 'rgba(75,196,192,1)',
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: 'round',
                          pointBorderColor: 'rgba(75,192,192,1)',
                          pointBackgroundColor: '#fff',
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                          pointHoverBorderColor: 'rgba(220,220,220,1)',
                          pointHoverBorderWidth: 2,
                          pointRadius: 3,
                          pointHitRadius: 50,
                          data: [46, 55, 75, 55, 70,65]
                      }
                    ]
                  };

				return (
                  <div>

                   {this.props.side !=='small' ? 
                    <Bar
                    data={data}
                    width={200}
                    height={400}
                    options={{ maintainAspectRatio: false  }}
                />
                :
                <Bar
                data={data}
                width={100}
                height={295}
                options={{ maintainAspectRatio: false  }}
            />
             }
                       

              </div>
				);
			  }
			}

const mapStatetoProps = state =>{
    return {
        tiny_data :state.tiny_red.tinydata
    };
  }
 
  
    export default connect(mapStatetoProps,null)(Simpleline);