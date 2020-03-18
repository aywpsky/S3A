import React, { Component } from "react";
import AUX from '../../../hoc/Aux_';
import {Row, Col, Card, CardBody, Badge } from "reactstrap";

import { MDBDataTable } from 'mdbreact';
import Config from '../../../config/Config';
import axios from "axios";
import GroupButton from '../../CustomComponents/GroupButton';
import { BallBeat } from 'react-pure-loaders';
import EditRequested from "./EditRequested";


class RequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            req_id: '',
            jo_id: '',
            qty_req: '',
            date_req: '',
            status: '',
            editData: {
                modalOpen: false,
                data: [],
                id: ''
            },
        };

    }

    componentDidMount() {
        this.GetRequestList();
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
            <EditRequested
                modalOpen={this.state.editData.modalOpen}
                data={this.state.editData.data}
                toggle={() => this.toggleModal()}
                refreshData={() => this.GetRequestList()}
            />
        );
    }

    GetRequestList = async () => {
        let url = Config.base_url + 'printingdepartment/getrequestedmat';
        const response = await axios.get(url);
        let temp_data = [];
        if (response.data.status == 'ok') {
            response.data.list.map((val, idx) => {

                let groupBtn = [
                    { title: "Edit", icon: "ion-edit", color: "success", function: () => this.editForm(val.request_id) },
                ];
                let x = {
                    request_no: "RID" + val.request_id.padStart(5, "0"),
                    jo_no: "JOID" + val.jo_id.padStart(5, "0"),
                    mat_req: val.material_name,
                    qty_req: val.quantity_requested,
                    date_req: val.date_requested,
                    status: (val.status == 1) ? <Badge title="Status" color="primary" pill >Approve</Badge> : <Badge title="Status" color="primary" outline>Pending</Badge>,
                    action: <GroupButton data={groupBtn} />
                }
                temp_data.push(x);
            });
            this.setState({ data: temp_data });
        }
    }

    render() {
        const data = {
            columns: [
                { label: 'Request #', field: 'request_no', sort: 'asc', width: 150 },
                { label: 'Job Order #', field: 'jo_no', sort: 'asc', width: 150 },
                { label: 'Mat. Req.', field: 'mat_req', sort: 'asc', width: 150 },
                { label: 'QTY Requested', field: 'qty_req', sort: 'asc', width: 150 },
                { label: 'Date Requested', field: 'date_req', sort: 'asc', width: 150 },
                { label: 'Status', field: 'status', sort: 'asc', width: 150 },
                { label: 'Action', field: 'action', sort: 'asc', width: 150 },
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
                        <Col className="printing-department-user m-b-20" md={12}>
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
                    {this.state.editData.modalOpen ? this.renderEditMat() : ''}
                    </Row>
                </AUX>
            );
        }
    }
}

export default RequestList;
