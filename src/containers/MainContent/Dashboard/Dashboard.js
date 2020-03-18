import React , {Component} from 'react';
import PageTitle from '../../CustomComponents/PageTitle';
import {Col , Row , Card , CardBody } from 'reactstrap';
import ProductionCost from './ProductionCost';
import FinishedProduct from './FinishedProduct';
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
                    <Col md={6} sm={12}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={12}>
										<h4 class="mt-0 header-title">Production Cost</h4>
                                        <ProductionCost />
                                    </Col>
                                </Row>
								<hr/>
                                <Row>
                                    <Col md={12}>
										<h4 class="mt-0 header-title">Total Cost of Finished Product</h4>
                                        <FinishedProduct />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    {/*For Later*/}
                    <Col md={6}sm={12}>
                        <Card>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AUX>
        )
    }
}

export default Dashboard;
