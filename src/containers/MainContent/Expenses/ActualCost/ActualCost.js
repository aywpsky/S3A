import React, { Component } from "react";
import AUX from '../../../../hoc/Aux_';
import { Row, Col, Card, CardBody, Badge } from "reactstrap";
import { BallBeat } from 'react-pure-loaders';
import { MDBDataTable } from 'mdbreact';
import Config from '../../../../config/Config';
import axios from "axios";

import EditAmount from "./EditAmount";

import Moment from 'moment';
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

class ActualCost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            req_id: '',
            id: '',
            qty_req: '',
            date_req: '',
            status: '',
            dateNow : new Date(),
            amount: '',
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


    toggleModal() {
        this.setState({
            editData: {
                modalOpen: !this.state.editData.modalOpen,
            }
        })
    }

    renderEditMat() {
        return (
            <EditAmount
                modalOpen={this.state.editData.modalOpen}
                prodCostID={this.state.id}
                prodCostAmount={this.state.amount}
                refreshData={() =>this.GetRequestList(this.state.dateNow)}
                toggle={() => this.toggleModal()}
            />
        );
    }


    GetRequestList = async (current_date) => {
      this.setState({ loading: true, data: [], dateNow: current_date})
        let url = Config.base_url + 'expenses/getActualCost/'+current_date;
        const response = await axios.get(url);
        let temp_data = [];
        if (response.data.status == 'ok') {
            response.data.list.map((val, idx) => {

                let groupBtn = [
                    { title: "Edit", icon: "ion-edit", color: "success", function: () => this.editForm(val.request_id) },
                ];
                let x = {
                    account: val.account,
                    category:  val.category,
                    amount: val.amount,
                    clickEvent: () => this.handleClick(val.id,val.amount),

                }
                temp_data.push(x);
            });
            this.setState({ data: temp_data });
        }
        this.setState({ loading: false })
    }

    handleClick(prodCostID,prodCostAmount){
        this.toggleModal()
        this.renderEditMat()
        this.setState({id:prodCostID, amount: prodCostAmount})
    }

    render() {
        const data = {
            columns: [
                { label: 'Account', field: 'account', sort: 'asc', width: 150 },
                { label: 'Category', field: 'category', sort: 'asc', width: 150 },
                { label: 'Amount', field: 'amount', sort: 'asc', width: 150 },

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
                        <Col className="expenses_modal" md={12}>
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

export default ActualCost;
