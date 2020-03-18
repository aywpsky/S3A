import React, { Component } from "react";
import AUX from '../../../../hoc/Aux_';
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Card, CardBody, Badge } from "reactstrap";
import GetJobOrderList from './GetJobOrderList';


class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <AUX>
                <GetJobOrderList />
            </AUX>

        );

    }
}

export default Index;
