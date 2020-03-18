
import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import {BarChart,Bar } from 'recharts';
import { Button} from 'reactstrap';

class CustomButton extends Component{

   constructor ( props ) {
       super( props );
       console.log(this.props.props1);
    }

    render(){
        const data = this.props.tiny_data;
        return(
            <AUX>
                <div className="state-information d-none d-sm-block">
                    <Button type="button" className="btn btn-lg btn-primary real-btn">{this.props.props1}</Button>
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


    export default connect(mapStatetoProps,null)(CustomButton);
