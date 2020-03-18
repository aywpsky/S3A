import React, {Component} from "react";
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import {Row,Col,Form,FormGroup , Input , Label , Button ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Config from "../../../config/Config";
import Helper from "../../../config/Helper";
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
import SimpleReactValidator from 'simple-react-validator';
import Alertify from 'alertifyjs';
import qs from "qs";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class WorkInProgress extends Component {
    constructor ( props ) {
       super( props );
    }

    render(){
        const data = {
             columns: [
                 {
                   label: 'Date',
                   field: 'date',
                   sort: 'asc',
                   width: 150
                 },
                {
                  label: 'Product Name',
                  field: 'prod_name',
                  sort: 'asc',
                  width: 150
                },
                {
                 label: 'Jobsheet #',
                 field: 'job_sheet',
                 sort: 'asc',
                 width: 150
                },
                {
                 label: 'Due Date',
                 field: 'due_date',
                 sort: 'asc',
                 width: 150
                },
                {
                 label: 'Qty. To Finish',
                 field: 'qty_to_finished',
                 sort: 'asc',
                 width: 150
                },
                {
                 label: 'Finished Today',
                 field: 'finished',
                 sort: 'asc',
                 width: 150
                },
                // {
                //  label: 'Total Finished',
                //  field: 'total',
                //  sort: 'asc',
                //  width: 150
                // },
                // {
                //  label: '% of Work Done',
                //  field: 'workdone',
                //  sort: 'asc',
                //  width: 150
                // },
                {
                 label: 'Department',
                 field: 'department',
                 sort: 'asc',
                 width: 150
                },

             ],
             rows    : this.props.data
        };
        return(
            <AUX>
                <Row>
                <Col sm={12} className="card m-b-20">
                    <div className="card-body table_shift real_tbl">
                       <MDBDataTable
                           responsive
                           bordered
                           hover
                           data={data}
                           />
                    </div>
                </Col>
                </Row>
            </AUX>
        )
    }

}
export default WorkInProgress;
