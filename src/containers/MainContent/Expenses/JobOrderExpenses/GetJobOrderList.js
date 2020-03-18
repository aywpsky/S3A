import React, { Component } from "react";
import AUX from '../../../../hoc/Aux_';
import { Row, Col, Card, CardBody, Badge } from "reactstrap";
import { BallBeat } from 'react-pure-loaders';
import { MDBDataTable } from 'mdbreact';
import Config from '../../../../config/Config';
import axios from "axios";
import ViewJobOrderDetails from "./ViewJobOrderDetails";

import Moment from 'moment';
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

class GetJobOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            req_id: '',
            jo_id: '',
            qty_req: '',
            date_req: '',
            dateNow : new Date(),
            status: '',
            editData: {
                modalOpen: false,
                data: [],
                id: ''
            },
            loading: true,
        };

    }

    componentDidMount() {
        var current_date = Moment(this.props.monthData.toLocaleDateString('en-US', DATE_OPTIONS)).format('Y-MM')
        this.GetRequestList(current_date);
    }

    editForm = async (id) => {
        let url = Config.base_url + 'printingdepartment/reqMat/' + id;
        let response = await axios.get(url);
        let data = response.data;
        if (data.status == 'ok') {
            this.setState({
                editData: {
                    modalOpen: !this.state.editData.modalOpen,
                    data: data.list,
                },

            });
        }
    }

    toggleModal() {
        this.setState({
            editData: {
                modalOpen: !this.state.editData.modalOpen,
            }
        })
    }

    renderEditMat() {
        return (
            <ViewJobOrderDetails
                modalOpen={this.state.editData.modalOpen}
                jobOrderID={this.state.jo_id}
                selected_date = {this.state.dateNow}
                toggle={() => this.toggleModal()}
            />
        );
    }

    GetRequestList = async (current_date) => {
        this.setState({ loading: true, data: [], dateNow: current_date})
        let url = Config.base_url + 'expenses/getJobOrderList/'+current_date;
        const response = await axios.get(url);
        let temp_data = [];
        if (response.data.status == 'ok') {
            response.data.list.job_name.map((val, idx) => {

                let groupBtn = [
                    { title: "Edit", icon: "ion-edit", color: "success", function: () => this.editForm(val.request_id) },
                ];
                let x = {
                    requesjob_not_no: "Job Order " + val.sales_id,
                    description:  val.description,
                    total_cost: '₱ '+parseFloat(response.data.list.total_cost[idx]).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
                    clickEvent: () => this.handleClick(val.sales_id),

                }
                temp_data.push(x);
            });
            this.setState({ data: temp_data });
        }
        this.setState({ loading: false })
    }

    handleClick(jobOrderID){
        this.toggleModal()
        this.renderEditMat()
        this.setState({jo_id:jobOrderID})
    }

    render() {
        const data = {
            columns: [
                { label: '#', field: 'job_no', sort: 'asc', width: 150 },
                { label: 'Description', field: 'description', sort: 'asc', width: 150 },
                { label: 'Total Cost', field: 'total_cost', sort: 'asc', width: 150 },

            ],
            rows: this.state.data
        };
        if (this.state.loading) {
            return (
                <BallBeat loading='true' color='#EB3B5A' />
            );
        } else {
            return (

                <AUX>
                    <Row>
                        <Col className="jo_expenses" md={12}>
                            <Card>
                                <CardBody>
                                    <MDBDataTable
                                        responsive
                                        bordered
                                        hover
                                        data={data}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {this.state.editData.modalOpen ? this.renderEditMat() : ''}
                </AUX>

            );
        }



    }
}

export default GetJobOrderList;
