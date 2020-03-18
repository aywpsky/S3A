import React , {Component} from "react";
import {connect} from 'react-redux';
import { Modal , ModalHeader , ModalBody ,Row , Col } from 'reactstrap';
import AUX from '../../../hoc/Aux_';
import Config from '../../../config/Config';
import { MDBDataTable} from 'mdbreact';
import axios from "axios";
class ListSalesOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableData : []
        }
    }

    render(){
        const data = {
          columns: [
              { label: 'Job', field: 'job', sort: 'asc', width: 150 },
              { label: 'Substrate', field: 'subs', sort: 'asc', width: 150 },
              { label: 'Cap', field: 'cap', sort: 'asc', width: 150 },
              { label: 'Quantity', field: 'qty', sort: 'asc', width: 150 },
              { label: 'Top Seal', field: 'top_seal', sort: 'asc', width: 150 },
              { label: 'Status', field: 'status', sort: 'asc', width: 150 },
              { label: 'Dispatch Date', field: 'dis_date', sort: 'asc', width: 150 },
          ],
            rows : this.props.data
        };
        return(

            <Modal unmountOnClose={true} isOpen={this.props.modalOpen} toggle={() => this.props.modalToggle()} className="modal-lg">
                <ModalHeader toggle={() => this.props.modalToggle()}>
                    {this.props.cust_name}
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <MDBDataTable
                               responsive
                               bordered
                               hover
                               data={data}
                            />
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        cust_id   : state.reportreducers.cust_id,
        cust_name : state.reportreducers.cust_name,
        modalOpen : state.reportreducers.modalOpen,
        data      : state.reportreducers.data,
    }
}

const mapActionToProps = dispatch =>{
    return {
        modalToggle : () => dispatch({type : 'toggleModal'})
    }
}
export default connect(mapStateToProps,mapActionToProps)(ListSalesOrder);
