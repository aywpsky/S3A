import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import axios from 'axios';
import Config from '../../../config/Config';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import AddCustomer from './AddCustomer';
import qs from "qs";

class CustomerTab extends Component{

 constructor ( props ) {
     super( props );
     this.state = {
       customerData : [],
       isModalOpen  : false,
       AddCustomer : false , action : 'Edit' , isModalOpen : false , customers : [] , editData : [],ModalTitle: 'Add Customer',
    }
 }

 toggle = (id) => {
    this.setState({
        isModalOpen : !this.state.isModalOpen,
    })
 }

  componentDidMount(){
    this.GetCustomerDetails();
  }

 comTest = (id) => {
    alert(id);
 }

  GetCustomerDetails = async(e) => {
    let response;
    let temp_data =[];
    let url = Config.base_url + 'customers/getCustomerlist';
    response = await axios.post(url , '');
    if (response.data) {
       const m = response.data.map((key, idx) => {
          let groupBtn = [
             { title: "Edit",icon: "ion-edit",color:"info",function: () => this.btnEdit(key.cust_id)},
             // { title: "Add" ,icon: "ion-trash-a",color:"primary",function: () => this.comTest(key.cust_id)}
          ];
          let x = {
             custID      : "CID" + key.cust_id.padStart(5, "0"),
             name        : key.name,
             company     : key.company,
             email       : key.email,
             contact     : key.contact,
             action      : <GroupButton data={groupBtn}/>
          }
          temp_data.push(x);
       })
       this.setState({customerData: temp_data})
    }
  }
  async btnEdit(id){
        let url = Config.base_url + 'customers/getSingleCustomer',
             data = {cust_id : id}
        const response = await axios.post(url , qs.stringify(data));
             this.setState({
                 isModalOpen : true,
                 action : 'Edit',
                 editData : response.data
             });
      }

  // View Edit functionality
  async btnEdit(id){
    let url = Config.base_url + 'customers/getSingleCustomer',
         data = {cust_id : id}
    const response = await axios.post(url , qs.stringify(data));
         this.setState({
             isModalOpen : true,
             action : 'Edit',
             editData : response.data
         });
  }

  toggle() {
      this.setState({
          isModalOpen : !this.state.isModalOpen,
      })
  }

  render(){
    const data = {
         columns: [
           { label: 'Customer ID', field: 'custID',   width: 150 },
           { label: 'Name',        field: 'name',     width: 270 },
           { label: 'Company',     field: 'company',  width: 200 },
           { label: 'Email',       field: 'email',    width: 270 },
           { label: 'Contact',     field: 'contact',  width: 200 },
           { label: 'Action',      field: 'action',   width: 200 },
         ],
         rows: this.state.customerData
       };
      return(
      <AUX>
            
             <Button type="button" className="btn btn-primary prime real-btn" onClick={() => this.setState({isModalOpen : true , action : 'Add'})}>Add New Customer</Button>
            <Row>
               <Col sm={12}>
                    <div className="card m-b-20">
                       <div className="card-body">
                          <MDBDataTable
                              className="customerTable"
                              responsive
                              bordered
                              hover
                              data={data}
                          />
                       </div>
                    </div>
                </Col>
            </Row>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{'Add New Customer'}</ModalHeader>
                <ModalBody>
                    <AddCustomer
                       action = {this.state.action}
                       data = {this.state.action === 'Edit' ? this.state.editData : ''}
                       getCustomerList = {this.GetCustomerDetails}
                    />
                </ModalBody>
            </Modal>

      </AUX>

      );
  }
}

export default CustomerTab;
