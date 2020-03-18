import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, Col, Row, Input, Label, FormGroup, Button } from 'reactstrap';
import Config from '../../../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import $ from 'jquery';

Alertify.defaults = Config.AlertConfig


const AddModal = (props) => {
    async function submit(e) {
        e.preventDefault();
        let url = Config.base_url + 'expenses/Add/tbl_actual_cost';
        let formdata = new FormData(e.target);
        let response = await axios.post(url, formdata);
        if (response.data.status == 'success') {
            Alertify.success(response.data.msg);
            props.refresh()
            $('input').val('');
        } else {
            Alertify.error(response.data.msg);
        }
    }
    
    return (
        <Modal isOpen={props.ACmodalOpen} toggle={() => props.toggle(3)}>
            <ModalHeader toggle={() => props.toggle()}>
                Request Form
                    </ModalHeader>
            <ModalBody>
                <Form method="POST" onSubmit={(e) => submit(e)}>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Account:</Label>
                                <Input name="account" required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Category: </Label>
                                <Input name="category" required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Amount: </Label>
                                <Input name="amount" type="number" required />
                            </FormGroup>
                        </Col>
                    </Row>

                    <ModalFooter>
                        <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => props.toggle(3)}>Cancel</Button>{' '}
                        <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default AddModal;
