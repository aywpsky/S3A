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
        this.props.set_toggle_modal('createJSModal');
    }
    componentDidMount() {
        // this.getJobSheet();
    }

    render() {
        let temp_data =[];
        const { job_order_job_sheet_data } = this.props;
        console.log(job_order_job_sheet_data)
        // if (this.props.job_order_job_sheet_data) {
        //     const m = this.props.job_order_job_sheet_data.map((key, idx) => {
        //         let status = '';
        //         switch (key.printing_dep_status) {
        //
        //             case '1':
        //                 status = 'In-Progress';
        //                break;
        //             case '2':
        //                 status = 'On-hold';
        //                break;
        //             case '3':
        //                 status = 'Off-track';
        //                break;
        //             case '4':
        //                 status = 'Completed';
        //                break;
        //
        //             default:
        //                 status = 'Pending';
        //                break;
        //          }
        //
        //
        //         let percent = ((key.completed_qty / key.max_approved_laminate_with) * 100);
        //
        //         let x = {
        //             jobOrderID: "JOID" + key.fk_sales_order_id,
        //             jobSheetID: "JSID" + key.job_sheet_id,
        //             department: key.company,
        //             com_per:   <ProgressBar now={percent.toFixed(2)} label={`${percent.toFixed(2)}%`} /> ,
        //             num_item_com: key.max_approved_laminate_with,
        //             num_com:  key.completed_qty ? key.completed_qty : '0',
        //             status: status
        //         }
        //         temp_data.push(x);
        //     });
        //     this.setState({ salesData: temp_data })
        // }
        const data = {
            columns: [
                { label: 'Job Order ID', field: 'jobOrderID', width: 150 },
                { label: 'Job Sheet ID', field: 'jobSheetID', width: 150 },
                { label: 'Department', field: 'department', width: 200 },
                { label: 'Completed Percentage', field: 'com_per', width: 200 },
                { label: 'No. of items Completed', field: 'num_item_com', width: 200 },
                { label: 'No. to Complete', field: 'num_com', width: 200 },
                { label: 'Status', field: 'status', width: 200 }
            ],
            rows: this.state.salesData
        };
        return (
            <AUX>
                <JobSheetModal />

                <Modal size="lg" isOpen={this.props.displayJSModal} toggle={() => this.props.set_toggle_modal('displayJSModal')} className="">
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
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL' ,state: state}),
    }
}
export default connect(mapStateToProps, mapActionToProps)(ModalViewDetails);
