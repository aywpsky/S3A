import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import axios from 'axios';
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import { MDBDataTable } from 'mdbreact';
import { Row,Col,Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ProgressBar  } from 'react-bootstrap';
import { connect } from 'react-redux';
import JobSheetModal from './JobSheetModal';
import GroupButton from '../../CustomComponents/GroupButton';

class ModalViewDetails extends Component {

    constructor(props) {
        super(props);
        Alertify.defaults = Config.AlertConfig
        this.validator = new SimpleReactValidator();
        this.state = {
            salesData: '',
        }
    }

    CreateSalesOrder = async (e) => {
        e.preventDefault();
    }

    createJobSheetNow = async (e) =>{
        if(this.props.job_sheet_id){
            let id = this.props.job_sheet_id;
            let url = Config.base_url + 'warehouse/getJobOrderData/' + id,
            response = await axios.get(url);

            this.props.handle_changes('create_js_data',response.data.create_js_data);
            this.props.handle_changes('js_last_id',response.data.last_data);
        }
        this.props.set_toggle_modal('createJSModal');
    }
    componentDidMount() {
        // this.getJobSheet();
    }

    render() {
        let temp_data =[];
        let salesData = '';
        const { job_order_job_sheet_data } = this.props;
        if (job_order_job_sheet_data.length) {
            const m = job_order_job_sheet_data.map((key, idx) => {
                let status = '';
                switch (key.printing_dep_status) {

                    case '1':
                        status = 'In-Progress';
                       break;
                    case '2':
                        status = 'On-hold';
                       break;
                    case '3':
                        status = 'Off-track';
                       break;
                    case '4':
                        status = 'Completed';
                       break;

                    default:
                        status = 'Pending';
                       break;
                 }


                let percent = ((key.dep_completed_qty / key.max_approved_laminate_with) * 100);
                let deparment = '';
                let completed = '';
                let num_to_complete = '';
                if(key.dep_completed_qty != key.max_approved_laminate_with){
                    deparment = 'Printing';
                    completed = key.dep_completed_qty ? key.dep_completed_qty : '0';
                    num_to_complete = key.max_approved_laminate_with;
                }else{
                    deparment = 'Production';
                    completed = key.prod_completed_qty ? key.prod_completed_qty : '0';
                    num_to_complete = key.max_approved_cap_with;
                }
                let x = {
                    jobOrderID: "JOID" + key.fk_sales_order_id,
                    jobSheetID: "JSID" + key.job_sheet_id,
                    jobName: key.job,
                    department: deparment ,
                    com_per:   <ProgressBar now={percent.toFixed(2)} label={`${percent.toFixed(2)}%`} /> ,
                    num_com:  completed,
                    num_item_com: num_to_complete,
                    status: status
                }
                temp_data.push(x);
            });
            salesData =  temp_data ;
        }
        const data = {
            columns: [
                { label: 'Job Order ID', field: 'jobOrderID', width: 150 },
                { label: 'Job Sheet ID', field: 'jobSheetID', width: 150 },
                { label: 'Job', field: 'jobName', width: 150 },
                { label: 'Department', field: 'department', width: 200 },
                { label: 'Completed Percentage', field: 'com_per', width: 200 },
                { label: 'No. of items Completed', field: 'num_item_com', width: 200 },
                { label: 'No. to Complete', field: 'num_com', width: 200 },
                { label: 'Status', field: 'status', width: 200 }
            ],
            rows: salesData
        };
        return (
            <AUX>
                <JobSheetModal refresh={() => this.props.refresh(this.props.job_sheet_id)}/>

                <Modal size="xl" isOpen={this.props.displayJSModal} toggle={() => this.props.set_toggle_modal('displayJSModal')} className="">
                    <ModalHeader toggle={() => this.props.set_toggle_modal('displayJSModal')}>Jobsheet Details</ModalHeader>
                    <ModalBody>
                        <Row className="create_js_table">
                            <Col sm={12}>
                                <button type="button" className="float-right btn btn-info real-btn btn btn-secondary" onClick={this.createJobSheetNow} name="fromDate">Create</button>
                            </Col>
                        </Row>
                        <MDBDataTable
                            responsive
                            bordered
                            hover
                            data={data}
                            className='job_sheet_details_modal'
                        />
                    </ModalBody>
                </Modal>
            </AUX>

        )
    }
}
const mapStateToProps = state => {
    return {
        isModalOpen: state.warehouseReducer.isModalOpen,
        displayJSModal: state.warehouseReducer.displayJSModal,
        createJSModal: state.warehouseReducer.createJSModal,
        job_order_job_sheet_data: state.warehouseReducer.job_order_job_sheet_data,
        job_order_data: state.warehouseReducer.job_order_data,
        create_js_data: state.warehouseReducer.create_js_data,
        js_last_id: state.warehouseReducer.js_last_id,
        job_sheet_id: state.warehouseReducer.job_sheet_id,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL' ,state: state}),
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(ModalViewDetails);
