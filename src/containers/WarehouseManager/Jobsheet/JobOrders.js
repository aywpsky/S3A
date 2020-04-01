import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import axios from 'axios';
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import { MDBDataTable } from 'mdbreact';
import { Row, Col, } from 'reactstrap';
import GroupButton from '../../CustomComponents/GroupButton';
import ModalView from './ModalView';
import ModalViewDetails from './ModalViewDetails';
import { ProgressBar  } from 'react-bootstrap';
import { connect } from 'react-redux';


import "react-datepicker/dist/react-datepicker.css";


class JobOrders extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            salesData: '',
        }

    }

    componentDidMount() {
        Alertify.defaults = Config.AlertConfig
        this.GetSalesOrder();
    }


    GetSalesOrder = async (e) => {
        let response;
        let temp_data = [];
        let url = Config.base_url + 'warehouse/getSalesOrder';
        response = await axios.post(url, '');
        if (response.data) {
            const m = response.data.list.map((key, idx) => {
                let groupBtn = [
                    { title: "Create Job Sheet",    icon: "ion-plus",      color: "primary",    function: () => this.creatJobSheetModal(key.sales_id)},
                    { title: "View Job Order",      icon: "ion-eye",        color: "info",      function: () => this.openViewJobOrderDetails(key.sales_id) }
                ];
                let x = {
                    salesID :      "SOID" + key.sales_id.padStart(5, "0"),
                    joborder:      key.description,
                    company :      key.company,
                    dispatch_date: key.dispatch_date,
                    action: <GroupButton data={groupBtn} />
                }
                temp_data.push(x);
            });
            this.setState({ salesData: temp_data })
        }
    }

    openViewJobOrderDetails = async (e) =>{
        let id = e;
        let url = Config.base_url + 'warehouse/getJobOrder/' + id,
        response = await axios.get(url);
        let temp_data =[];
        let main_data = [];
        let cust = [];
        if (response.data.msg == 'success') {
            let data_temp_id = 1;
            response.data.result.map((data)=>{
                let first = [];
                if(data_temp_id != data.id){
                    data_temp_id = data.id;
                    cust = {
                        company: data.company,
                        description: data.description,
                    }
                    temp_data = {
                        id: data.id,
                        job:data.job,
                        dispatch_date: data.dispatch_date,
                        additional_details: data.additional_details,
                        special_instruction: data.special_instruction,
                    }

                    main_data.push(temp_data);
                }
            })
            this.props.handle_changes('job_order_data',response.data.result);
            this.props.handle_changes('job_order_data_cust',cust);
            this.props.handle_changes('job_order_data_company',main_data);
            this.props.set_toggle_modal('isModalOpen');
        }

    }

    creatJobSheetModal = async (e) =>{
            let id = e;
            this.props.handle_changes('job_sheet_id',id);

            let url = Config.base_url + 'warehouse/GetJobSheet/' + id,
            response = await axios.get(url);
            let temp_data =[];
            this.props.handle_changes('job_order_job_sheet_data',response.data);
            this.props.set_toggle_modal('displayJSModal');

    }

    render() {

        const data = {
            columns: [
                { label: 'SALES ID',      field: 'salesID',       width: 150 },
                { label: 'JOB ORDER',     field: 'customer',      width: 200 },
                { label: 'CUSTOMER',      field: 'company',       width: 200 },
                { label: 'DISPATCH DATE', field: 'dispatch_date', width: 200 },
                { label: 'ACTION',        field: 'action',        width: 200 }
            ],
            rows: this.state.salesData
        };

        return (
            <AUX>

                <ModalView/>
                <ModalViewDetails />

                <Row>
                    <Col sm={12}>
                        <div className="card m-b-20">
                            <div className="card-body ">
                                <br />
                                <br />
                                <MDBDataTable
                                    responsive
                                    bordered
                                    hover
                                    data={data}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </AUX>
        );
    }

}

const mapStateToProps = state => {
    return {
        isModalOpen             : state.warehouseReducer.isModalOpen,
        displayJSModal          : state.warehouseReducer.displayJSModal,
        job_order_data          : state.warehouseReducer.job_order_data,
        job_order_data_company  : state.warehouseReducer.job_order_data_company,
        job_order_job_sheet_data  : state.warehouseReducer.job_order_job_sheet_data,
        job_order_data_cust  : state.warehouseReducer.job_order_data_cust,
        job_sheet_id  : state.warehouseReducer.job_sheet_id,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL', state: state }),
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(JobOrders);
