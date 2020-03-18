import React, {  } from "react";
import { Modal, ModalBody, ModalHeader, Col, Row,FormGroup,  } from 'reactstrap';
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import GetCompleted from "./GetCompleted";

Alertify.defaults = Config.AlertConfig

// async function submit(e,id) {
//     e.preventDefault();
//     let jo_id = id;
//     let url = Config.base_url + 'printingdepartment/post';
//     let formdata = new FormData(e.target);
//     formdata.append('jo_id' ,jo_id );
//     let response = await axios.post(url , formdata);
//     if (response.data.status == 'success') {
//         Alertify.success(response.data.msg);
//     }else{
//         Alertify.error(response.data.msg);
//     }
// }

const OpenCompleted = (props) => {
    return (
        <Modal  isOpen={props.isOpen} toggle={() => props.toggle()}>
            <ModalHeader toggle={() => props.toggle()}>
                Completed List
                    </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <GetCompleted js_id={props.id} reload = {props.reload}/>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
}

export default OpenCompleted;
