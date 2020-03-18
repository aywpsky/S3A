import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, Col, Row, Input, Label, FormGroup, Button } from 'reactstrap';
import Config from '../../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import AUX from '../../../hoc/Aux_';
import GetMaterials from "./GetMaterials";
import SimpleReactValidator from 'simple-react-validator';
class EditRequested extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            editData: [],
            modalTitle: ''
        }
        this.validator = new SimpleReactValidator();
        this.handleQTY = this.handleQTY.bind(this);
    }

    componentDidMount() {
        Alertify.defaults = Config.AlertConfig;
        this.setState({
            modalOpen: this.props.modalOpen,
            editData: this.props.data,
            modalTitle: this.props.data.material_name
        });
    }

    handleQTY = (e) => {
        let val = e.target.value;
        this.setState(prevState => ({
            editData: { ...prevState.editData, quantity_requested: val }
        }));
    }

    handleChange(e) {
        let val = e.target.value;
        this.setState(prevState => ({
            editData: { ...prevState.editData, raw_id: val }
        }));
    }

    Submit = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            let url = Config.base_url + 'production/submitedit';
            let formdata = new FormData(e.target);
            formdata.append('id', this.state.editData.request_id)
            const response = await axios.post(url, formdata);
            let item = response.data;
            if (item.status == 'ok') {
                Alertify.success('Update!');
                this.props.refreshData();
            } else {
                Alertify.error('Error');
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <AUX>
                <Modal isOpen={this.state.modalOpen} toggle={() => this.props.toggle()}>
                    <ModalHeader toggle={() => this.props.toggle()}> {this.state.modalTitle} </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.Submit(e)}>
                            <Row>
                                <Col md={6}>
                                    <GetMaterials
                                        label={'Material List'}
                                        defaultValue={this.state.editData.raw_id}
                                        handleChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>QTY Req.</Label>
                                        <Input
                                            name="qty_req"
                                            value={this.state.editData.quantity_requested}
                                            onChange={(e) => this.handleQTY(e)}
                                        />
                                        <span id="err">{this.validator.message('Qty Requested', this.state.editData.quantity_requested, 'required')}</span>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </AUX>
        );
    }
}

export default EditRequested;
