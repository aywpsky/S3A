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
import GroupButton from '../../CustomComponents/GroupButton';

class FinishProduct extends Component{
    constructor ( props ) {
        super( props );
    }
    render(){
        const data = {
            columns: [
                {
                    label: 'Items',
                    field: 'mat_name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'BEG.Balance',
                    field: 'beg',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Add',
                    field: 'add',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Ending Balance',
                    field: 'end_rec',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Ending Balance',
                    field: 'end_phy',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Variance',
                    field: 'variance',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Note',
                    field: 'notes',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'mat_name',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: this.state.data_inv
        }
        return(
            <AUX>
                <Row>
                  <Col sm={12} >
                        <Row>
                            <Col sm={12} className="card m-b-20">
                                <div className="card-body table_shift real_tbl real_tbl_finish">
                                   <MDBDataTable
                                       id='finish'
                                       responsive
                                       borderless
                                       hover
                                       data={data}
                                       />
                                </div>
                            </Col>
                        </Row>
                  </Col>
                </Row>



            </AUX>
        )
    }
}
export default FinishProduct;
