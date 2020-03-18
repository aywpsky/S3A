import React , {useState} from "react";
import {Modal , ModalBody , ModalHeader , ModalFooter , Form , Col ,Row ,Input , Label , FormGroup , Button} from 'reactstrap';
import Config from '../../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import List from "./GetMaterials";
import SimpleReactValidator from 'simple-react-validator';

Alertify.defaults = Config.AlertConfig

        async function submit(e,id) {
            e.preventDefault();
            let jo_id = id;
            let url = Config.base_url + 'printingdepartment/post';
            let formdata = new FormData(e.target);
            formdata.append('jo_id' ,jo_id );
            let response = await axios.post(url , formdata);
            if (response.data.status == 'success') {
                Alertify.success(response.data.msg);
            }else{
                Alertify.error(response.data.msg);
            }
        }

        const Request = (props) => {
            return (
                <Modal isOpen= {props.isOpen} toggle={() => props.toggle()}>
                    <ModalHeader toggle = {() => props.toggle()}>
                        Request Form
                    </ModalHeader>
                    <ModalBody>
                        <Form method="POST" onSubmit= {(e) => submit(e , props.id)}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Material List</Label>
                                        <List />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>QTY Req.</Label>
                                        <Input name="qty_req" required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ModalFooter>
                               <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => props.toggle()}>Cancel</Button>{' '}
                               <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }

export default Request;
