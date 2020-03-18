
import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';

class GroupButton extends Component{
   constructor ( props ) {
       super( props );
    }
    render(){

        let primary = "btn-primary groupBtn btn btn_spec";
        let info = "btn-info groupBtn btn btn_spec";
        let warning = "btn-warning groupBtn btn btn_spec";
        let secondary = "btn-secondary groupBtn btn btn_spec";
        let def = "groupBtn btn";
        let dis = "nohover";
        return(
            <AUX>
                  <div className="">
                  {
                     this.props.data.map((key, idx) => {
                        if (key.disabled) {
                            return(
                                <Button
                                disabled
                                title={key.title}
                                onClick={key.function}
                                className={dis}
                                >
                                <i className={(key.icon != "")?key.icon:"ion-help"}></i>
                                </Button>
                            )
                        }else{
                            return(
                                <Button
                                title={key.title}
                                onClick={key.function}
                                className={(key.color == "primary")?primary:(key.color == "info")?info:(key.color=="warning")?warning:(key.color=="secondary")?secondary:def}
                                >
                                <i className={(key.icon != "")?key.icon:"ion-help"}></i>
                                </Button>
                            )
                        }
                     })
                  }
                     {this.props.children}
                  </div>
            </AUX>
        );
    }
}


export default GroupButton;
