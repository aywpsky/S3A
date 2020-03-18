import React , {useState} from "react";
import {Modal , ModalBody , ModalHeader , ModalFooter , Form , Col ,Row ,Input , Label , FormGroup , Button} from 'reactstrap';
import Config from '../../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import GetMaterials from "./GetMaterials";
import SimpleReactValidator from 'simple-react-validator';

Alertify.defaults = Config.AlertConfig

        async function submit(e,id , props) {
            e.preventDefault();

            let jo_id = id;
            let url = Config.base_url + 'production/requestmat';
            let formdata = new FormData(e.target);
            formdata.append('jo_id' ,jo_id );
            let response = await axios.post(url , formdata);

            if (response.data.status == 'success') {
                Alertify.success(response.data.msg);
                props.toggles();
            }else{
                Alertify.error(response.data.msg);
            }
        }

        const Request = (props) => {
            return (
                <Modal isOpen= {props.isOpen} toggle={() => props.toggles()}>
                    <ModalHeader toggle = {() => props.toggles()}>
                        Request Form
                    </ModalHeader>
                    <ModalBody>
                        <Form method="POST" onSubmit= {(e) => submit(e , props.id , props)}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <GetMaterials
                                            label={'Material List'}
                                            defaultValue={''}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>QTY Req.</Label>
                                        <Input type="number" name="qty_req" required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ModalFooter>
                               <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }


export default Request;
