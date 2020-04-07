import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import axios from 'axios';
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import { MDBDataTable } from 'mdbreact';
import { Row,Col,Modal, ModalHeader, ModalBody, Button, ModalFooter, } from 'reactstrap';
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
            modalOpenDeliver: false,
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

    updateDeliverBtn = async() => {
        let response;
        let id = this.state.id
        let url = Config.base_url + 'warehouse/updateDelivery/' + id;
        response = await axios.post(url, '');


        if (response.data) {
           Alertify.success('Successfully Approved!');
           this.setState({modalOpenDeliver: false});
           this.props.refresh(this.props.job_sheet_id);
       }else if(response.data == 0){
           Alertify.error('Stocks not available!');
       }else{
           Alertify.error('Something went wrong!');
       }
    }

    modalOpen = async (id) => {
			this.setState({
				modalOpenDeliver : !this.state.modalOpenDeliver,
	  		  	id:id,
			})
	}
    toggleDel = () =>{
	   this.setState({
		  modalOpenDeliver : !this.state.modalOpenDeliver,
	   })
	 }
    render() {
        let temp_data =[];
        let salesData = '';
        let job_name_title = '';
        const { job_order_job_sheet_data } = this.props;
        if (job_order_job_sheet_data.length) {
            const m = job_order_job_sheet_data.map((key, idx) => {
                let status = '';
                job_name_title = key.job_order_name;
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


                let percent = '';
                let completed = '';
                let delivered = '';
                let num_to_complete = '';
                let work_in_prog = '';
                let total = '';
                if(key.department == 0){
                    completed = key.dep_completed_qty ? key.dep_completed_qty : '0';
                    num_to_complete = key.max_approved_laminate_with;
                    delivered = key.dep_delivered_qty ? key.dep_delivered_qty : '0';
                    total = parseInt(completed) + parseInt(delivered);
                    work_in_prog = parseInt(num_to_complete - total);
                    percent = ((parseInt(total) / parseInt(key.max_approved_laminate_with)) * 100);

                }else{
                    completed = key.prod_completed_qty ? key.prod_completed_qty : '0';
                    num_to_complete = key.max_approved_cap_with;
                    delivered = key.prod_delivered_qty ? key.prod_delivered_qty : '0';
                    total = parseInt(completed) + parseInt(delivered);
                    work_in_prog = parseInt(num_to_complete - total);
                    percent = ((parseInt(total) / parseInt(key.max_approved_cap_with)) * 100);

                }
                let x = {
                    jobSheetID: "JSID" + key.job_sheet_id,
                    jobName: key.job,
                    com_per:   <ProgressBar now={percent.toFixed(2)} label={`${percent.toFixed(2)}%`} /> ,
                    total_com:  total,
                    work_in_prog: work_in_prog,
                    for_del:   completed != 0 ? <button className="btn btn-success" onClick={() => this.modalOpen(key.job_sheet_id)} type="button">{completed} - Deliver Now</button> : 0,
                    del: delivered,
                    num_com:  num_to_complete,
                    status: status
                }
                temp_data.push(x);
            });
            salesData =  temp_data ;
        }
        const data = {
            columns: [
                { label: 'Job Sheet ID', field: 'jobSheetID', width: 150 },
                { label: 'Job', field: 'jobName', width: 150 },
                { label: 'Completed Percentage', field: 'com_per', width: 200 },
                { label: 'Total Completed', field: 'total_com', width: 200 },
                { label: 'Work in Progress', field: 'work_in_prog', width: 200 },
                { label: 'For Delivery', field: 'for_del', width: 200 },
                { label: 'Delivered', field: 'del', width: 200 },
                { label: 'To Complete', field: 'num_com', width: 200 },
                { label: 'Status', field: 'status', width: 200 },
            ],
            rows: salesData
        };
        return (
            <AUX>
                <JobSheetModal refresh={() => this.props.refresh(this.props.job_sheet_id)}/>

                <Modal size="xl" isOpen={this.props.displayJSModal} toggle={() => this.props.set_toggle_modal('displayJSModal')} className="">
                    <ModalHeader toggle={() => this.props.set_toggle_modal('displayJSModal')}>{job_name_title} Jobsheet Details</ModalHeader>
                    <ModalBody>

                        <Row className="create_js_table" style={{display: this.props.is_job_sheet_complete == false ?'block':'none'}}>
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

                <Modal isOpen={this.state.modalOpenDeliver} toggle={this.toggleDel}>
                  <ModalHeader toggle={this.toggleDel}>Approve Request</ModalHeader>
                  <ModalBody>
                      <p>Are you sure you to update it to delivered?</p>
                      <p>It will be added to delivered data automatically once update.</p>
                   <ModalFooter>
                        <Button color="primary" className="btn btn-secondary waves-effect" onClick={this.toggleDel}>Cancel</Button>
                        <Button type="submit" onClick={this.updateDeliverBtn} color="success" className="btn btn-secondary waves-effect">OK</Button>
                   </ModalFooter>
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
        is_job_sheet_complete: state.warehouseReducer.is_job_sheet_complete,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL' ,state: state}),
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(ModalViewDetails);
