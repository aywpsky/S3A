import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import Config from '../../../config/Config';
import Helpers from '../../../Helpers';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

class ViewProcess extends Component {

    constructor(props) {
        super(props);
        Alertify.defaults = Config.AlertConfig
        this.validator = new SimpleReactValidator();
        this.state = {
            js_data: [],
        }
    }


    render() {
        Moment.locale('en');
        return (
            <AUX>
                <Modal size="lg" isOpen={this.props.isModalOpenProcess} toggle={() => this.props.set_toggle_modal('isModalOpenProcess')} className="">
                    <ModalHeader toggle={() => this.props.set_toggle_modal('isModalOpenProcess')}>View Job Order Process</ModalHeader>
                    <ModalBody>

                        <table id="view_js_table" className="table table-bordered mb-0 view_js_table">
                            <tbody style={{textAlign:'center'}}>
                                <tr>
                                    <td>
                                        <Label>Date</Label>
                                    </td>
                                    <td>
                                        <Label>Job Name</Label>
                                    </td>
                                    <td>
                                        <Label>Completed</Label>
                                    </td>
                                    <td>
                                        <Label>Work In Progress</Label>
                                    </td>
                                    <td>
                                        <Label>Delivered</Label>
                                    </td>
                                </tr>
                                {

                                    this.props.job_order_process_data.map((data, idk) => {
                                        return (


                                                <tr>
                                                    <td>
                                                        <p>{Moment(data.date_added).format('MMMM DD YYYY')}</p>
                                                    </td>
                                                    <td>
                                                        <p>{data.job}</p>
                                                    </td>
                                                    <td>
                                                        <p>{data.work_in_progress}</p>
                                                    </td>
                                                    <td>
                                                        <p>{data.completed}</p>
                                                    </td>
                                                    <td>
                                                        <p>{data.delivered}</p>
                                                    </td>
                                                </tr>


                                        )
                                    })
                                }

                            </tbody>

                        </table>

                    </ModalBody>
                </Modal>
            </AUX>

        )
    }
}
const mapStateToProps = state => {
    return {
        isModalOpenProcess: state.warehouseReducer.isModalOpenProcess,
        salesOrder_job: state.warehouseReducer.salesOrder_job,
        job_order_data: state.warehouseReducer.job_order_data,
        job_order_data_company: state.warehouseReducer.job_order_data_company,
        job_order_data_cust: state.warehouseReducer.job_order_data_cust,
        job_order_process_data: state.warehouseReducer.job_order_process_data,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL', state: state }),
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(ViewProcess);
