import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { BallBeat } from 'react-pure-loaders';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import qs from "qs";
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import GroupButton from '../../CustomComponents/GroupButton';
import AddSalesOrder from './AddSalesOrder';
import EditSalesOrder from './EditSalesOrder';

class SalesOrder extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            total: 1, AddCustomerModal: false, activeTab: '1',
            modalOpen: false, modalTitle: '', action: '', salesOrder_job: '', customer: '', cap: '', quantity: '',
            topSeal: '', post_date: '', startDate: new Date(), type: '', dispatch_date: '', substrate: '', salesData: '', special_inc: '', add_details: ''
        }
        this.UpdateSalesOrder = this.UpdateSalesOrder.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        Alertify.defaults = Config.AlertConfig
        this.GetSalesOrder();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    DeleteSales = async (salesId) => {
        const me = this;
        Alertify.confirm("Are you sure you want to remove this record?",
          async function(){
              let response;
              let formdata = {
                  sales_id: salesId
              };
              let temp_data = [];
              let url = Config.base_url + 'sales/archiveSalesOrder';
              response = await axios.post(url, qs.stringify(formdata));
              if (response.data.msg === "success") {
                  me.GetSalesOrder();
              }
          },
          function(){
                // cancel
          });

    }

    GetSalesOrder = async (e) => {
        let response;
        let temp_data = [];
        let url = Config.base_url + 'sales/getSalesOrder';
        response = await axios.post(url, '');
        if (response.data.status == 'ok') {
            const {list} = response.data;

            list.map((key, idx) => {
                let groupBtn = [
                    { title: "Edit", icon: "ion-edit", color: "info", function: () => this.getSalesData(key.sales_id , key.fk_customer_id) },
                    { title: "Remove", icon: "ion-trash-a", color: "primary", function: () => this.DeleteSales(key.id) }
                ];
                let x = {
                    salesID: "SOID" + key.sales_id.padStart(5, "0"),
                    job: key.description,
                    customer: key.company,
                    dispatch:key.dispatch_date,
                    action: <GroupButton data={groupBtn} />
                }
                temp_data.push(x);
            });
            this.setState({ salesData: temp_data })
        }
    }

    getSalesData = async(sales_id , company_fk_id) => {
        let url = Config.base_url + 'sales/getSO/' + sales_id;
        const res = await axios.get(url);
        if (res.data.status == 'ok') {
            const {list} = res.data;
            this.props.setSalesData(list ,sales_id , company_fk_id);
            this.props.editModal();
        }

    }

    UpdateSalesOrder = async (e) => {
        e.preventDefault();
        const { sales_id } = this.state;
        let url = Config.base_url + 'sales/updateSalesOrder/';
        const formData = new FormData(e.target);
        formData.append('sales_id', sales_id);
        const response = await axios.post(url, formData);

        if (response.data.success) {
            Alertify.success('Successfully updated!');
            this.GetSalesOrder();
            this.setState({ modalOpen: false });
        } else {
            Alertify.error('Something went wrong!');
        }
    }



    InputOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        const data = {
            columns: [
                { label: 'SALES ID', field: 'salesID', width: 150 },
                { label: 'JOB', field: 'job', width: 270 },
                { label: 'CUSTOMER', field: 'customer', width: 200 },
                { label: 'DISPATCH DATE', field: 'dispatch', width: 200 },
                { label: 'ACTION', field: 'action', width: 200 },

            ],
            rows: this.state.salesData
        };

        return (
            <AUX>

                <Row>
                    <Col sm={12} >
                        <div className="page-title-box">
                            <h4 className="page-title">Sales Order</h4>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    List of all sales order
                                     </li>
                            </ol>
                        </div>

                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <div className="card m-b-20">
                            <div className="card-body table_shift">
                                <Button type="button" className="btn btn-primary real-btn btn btn-secondary" onClick={() => this.props.toggle()}>Add Job Sheet</Button>

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

                <AddSalesOrder toggleModalSales={() => this.props.toggle()} updateTable = {() => this.GetSalesOrder()} />

                <EditSalesOrder updateTable = {() => this.GetSalesOrder()}/>

            </AUX>
        );
    }

}

const mapStateToProps = state => {
    return {
        modalOpen : state.salesReducers.modalOpen,
        editSalesOrderId : state.salesReducers.editSalesOrderId
    }
};

const mapActionToProps = dispatch => {
    return{
        toggle : () => dispatch({type : 'toggleModal'}),
        setSalesData : (salesData , id , company_fk_id) => dispatch({type : 'setSalesData'  , salesData : salesData  , sales_id : id ,company_fk_id:company_fk_id }),
        editModal : (salesData) => dispatch({type : 'editModal'}),
    }
}

export default connect(mapStateToProps,mapActionToProps)(SalesOrder);
