import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, Col, Row, Input, Label, FormGroup, Button } from 'reactstrap';
import Config from '../../../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import AUX from '../../../../hoc/Aux_';
import SimpleReactValidator from 'simple-react-validator';
import qs from "qs";

class ViewJobOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            editData: [],
            modalTitle: '',
            jobOrderDetails: [],
            DirectMaterialCost: [],
            VariableCost: 0,
            Cost_per_Unit: 0,
            Total_Cost: 0,
            totalJobOrderCost: 0,
        }
        this.validator = new SimpleReactValidator();
    }

    componentDidMount() {
        Alertify.defaults = Config.AlertConfig;
        this.getAllRaw();
        this.setState({
            modalOpen: this.props.modalOpen,
        });
    }

    getAllRaw = async () => {
        let temp_data = [];
        let formData = { sales_order_id: this.props.jobOrderID };
        let url = Config.base_url + '/expenses/viewJobOrder/'+this.props.selected_date;
        let response = await axios.post(url, qs.stringify(formData));
        let totalCostJobOrder = 0;
        console.log(response.data.total_cost);
        if (response.data.expenses_data) {
            this.forceUpdate();
            response.data.total_cost.map((val) =>{
               totalCostJobOrder = totalCostJobOrder+val;
            });
            await this.setState({ jobOrderDetails: response.data.expenses_data, DirectMaterialCost: response.data.direct_material_cost , VariableCost: (response.data.variable_cost.total == null)?0:response.data.variable_cost.total, Cost_per_Unit: response.data.cost_per_unit, Total_Cost: response.data.total_cost, totalJobOrderCost: totalCostJobOrder});
        } else {
            alert('failed');
        }
    }

    render() {
        return (
            <AUX>
                <Modal className="modal-lg" isOpen={this.state.modalOpen} toggle={() => this.props.toggle()}>
                    <ModalHeader toggle={() => this.props.toggle()}> {this.state.modalTitle} </ModalHeader>
                    {(this.state.jobOrderDetails.length == 0) ?
                        <ModalBody>
                            <Row className="ExpensesNoDataFound">
                                <Col md={12}>
                                    <FormGroup>
                                        <Label>No Data Found</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody> :
                        <ModalBody>
                            <Row className="jobOrderHead">
                                <Col md={4}>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label>Direct Material Cost</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label>Variable Cost</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label>Cost per Unit</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label>TOTAL</Label>
                                    </FormGroup>
                                </Col>
                            </Row>


                            {
                                this.state.jobOrderDetails.map((val, idx) => {
                                    return <Row>
                                        <Col md={4} className="text-center">
                                            <FormGroup>
                                                <Label>{val.quantity+' '+val.job}</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label>₱ {parseFloat(this.state.DirectMaterialCost[idx]).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) }</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label>₱ {parseFloat(this.state.VariableCost).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) }</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label>₱ {parseFloat(this.state.Cost_per_Unit[idx]).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) }</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label>₱ { parseFloat(this.state.Total_Cost[idx]).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) }</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                })
                            }



                            <br />
                            <br />
                            <Row>
                                <Col md={4}>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Total Cost for Job Order:</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label>₱ { parseFloat(this.state.totalJobOrderCost).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2})  }</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                    }
                </Modal>
            </AUX>
        );
    }
}

export default ViewJobOrderDetails;
