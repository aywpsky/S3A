import React , {Component} from 'react';
import AUX from '../../../hoc/Aux_';
import Config from '../../../config/Config';
import { Col } from "reactstrap";
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return(
            <AUX>
                <Modal isOpen={this.props.open} toggle = {() => this.props.toggle()}>
                    <ModalHeader toggle = {() => this.props.toggle()} >{this.props.header}</ModalHeader>
                    <ModalBody>
                        <p>{this.props.body}</p>
                        <ModalFooter>
                            <Button type="button" color="primary" className="btn btn-secondary waves-effect" onClick = {() => this.props.handleConfirm()} >Okay</Button>
                            <Button type="button" color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.props.toggle() }>Cancel</Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            </AUX>
        );
    }
}

export default Confirm;
