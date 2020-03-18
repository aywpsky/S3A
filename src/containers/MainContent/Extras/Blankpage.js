import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import Tinycharts from '../../Chartstypes/Tinycharts';

class Blankpage extends Component{
    componentDidMount(){
        
    }
    
    render(){
        
  

        return(
        <AUX>
            <div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <h4 className="page-title">Blank page</h4>
                            <ol className="breadcrumb">
                            <li className="breadcrumb-item">Lexa</li>
                            <li className="breadcrumb-item">Charts</li>
                                <li className="breadcrumb-item active">Blank page</li>
                            </ol>

                            <Tinycharts />
                        </div>
                    </div>
                </div>
            </div>

        </AUX>               

        );
    }
}

export default Blankpage;   