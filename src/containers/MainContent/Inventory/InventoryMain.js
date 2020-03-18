import React , {Component, Suspense} from 'react';
import AUX from '../../../hoc/Aux_';
import { BallBeat } from 'react-pure-loaders';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import qs from "qs";
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import classnames from 'classnames';
import Editable from 'react-x-editable';
import DailyInventory from './DailyInventory';
import MonthlyInventory from './MonthlyInventory';
import FinishProduct from './FinishProduct';

import $ from 'jquery';


class InventoryMain extends Component{

    constructor ( props ) {
        super( props );

        this.state ={
            button: "daily",
            click_count: 0
        }
    }

    changeButton = (data) => {
        this.setState({button: data});
    }

    render(){

        const active = {
          backgroundColor: "#d63451",
        };

        $(document).ready(function() {


        });

        return(
            <AUX>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <h4 className="page-title">Inventory</h4>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                Inventory List
                                </li>
                            </ol>
                        </div>
                        <div className="page-btn">
                            <button type="button" className="btn btn-primary real-btn clicker btn btn-secondary daily" onClick={() => this.changeButton('daily')}>Daily Inventory</button>
                            <button type="button" className="btn btn-primary real-btn btn clicker btn-secondary monthly" onClick={() => this.changeButton('monthly')}>Monthly Inventory</button>
                            <button type="button" className="btn btn-primary real-btn btn clicker btn-secondary finish" onClick={() => this.changeButton('finish')}>Finished Goods Inventory</button>
                        {/* this.state.activeTab == 1 ? <Button type="button" className="btn btn-primary real-btn" onClick={() => this.addRawBtn()}>Add Raw Material</Button>:<Button type="button" className="btn btn-primary real-btn" onClick={() => this.setState({isModalOpen : true , action : 'Add'})}>Add Supplier</Button>*/}
                      </div>
                    </div>
                </div>
                {this.state.button == 'daily' ? (<DailyInventory />) : this.state.button == 'monthly' ? (<MonthlyInventory />) : (<FinishProduct />)}

            </AUX>

        )
    }

}

export default InventoryMain;
