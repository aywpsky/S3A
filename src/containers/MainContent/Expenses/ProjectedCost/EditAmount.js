import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, Col, Row, Input, Label, FormGroup, Button } from 'reactstrap';
import Config from '../../../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import AUX from '../../../../hoc/Aux_';
import SimpleReactValidator from 'simple-react-validator';
import qs from "qs";
class EditAmount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: this.props.prodCostAmount,
        }
        this.validator = new SimpleReactValidator();
    }

    componentDidMount() {
        Alertify.defaults = Config.AlertConfig;
        this.setState({
            modalOpen: this.props.modalOpen,
        });
    }

   submit = async(e) => {
        e.preventDefault();
        let url = Config.base_url + 'expenses/Update/tbl_projected_cost';
        let formdata = new FormData(e.target);
        formdata.append('id' , this.props.prodCostID);
        let response = await axios.post(url, formdata);
        if (response.data.status == 'success') {
            Alertify.success(response.data.msg);
            this.props.refreshData();
            this.props.toggle();
        } else {
            Alertify.error(response.data.msg);
        }
    }
    

    render() {

        return (
            <AUX>
                <Modal isOpen={this.state.modalOpen} toggle={() => this.props.toggle()}>
                    <ModalHeader toggle={() => this.props.toggle()}> {this.state.modalTitle} </ModalHeader>
                    <ModalBody>
                        <Form method="POST" onSubmit={(e) => this.submit(e)}>
                            <Row className="jobOrderHead">
                                <Col md={12}>
                                    <FormGroup>
                                        <Label>Amount</Label>
                                        <Input name="amount" required value={this.state.amount} onChange= {(e) => this.setState({amount : e.target.value})}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.props.toggle()}>Cancel</Button>{' '}
                                <Button type="submit" color="success" className="btn btn-secondary waves-effect">Update</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </AUX>
        );
    }
}

export default EditAmount;
