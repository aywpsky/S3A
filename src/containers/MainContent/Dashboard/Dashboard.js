import React , {Component} from 'react';
import PageTitle from '../../CustomComponents/PageTitle';
import {Col , Row , Card , CardBody } from 'reactstrap';
import ProductionCost from './ProductionCost';
import FinishedProduct from './FinishedProduct';
import TurnOver from './TurnOver';
import TotalSales from './TotalSales';
import AUX from '../../../hoc/Aux_';
class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <AUX>
                <Row>
                    <Col md = {12} sm={12}>
                        <PageTitle title="Dashboard" subtitle="Welcome to S3A Dashboard" />
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <CardBody>
                                        <ProductionCost />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <CardBody>
                                        <FinishedProduct />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={12}>
                                        <h4 class="mt-0 header-title">Total Sales</h4>
                                        <TotalSales />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={12}>
                                        <TurnOver />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AUX>
        )
    }
}

export default Dashboard;
