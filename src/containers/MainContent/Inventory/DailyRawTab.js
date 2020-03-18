import React, {Component} from "react";
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import {Row,Col,Form,FormGroup , Input , Label , Button ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Config from "../../../config/Config";
import Helper from "../../../config/Helper";
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
import SimpleReactValidator from 'simple-react-validator';
import Alertify from 'alertifyjs';
import qs from "qs";
import $ from 'jquery';

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class DailyRawTab extends Component {

    constructor ( props ) {
    super( props );
    this.validator = new SimpleReactValidator();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.state = {
        editInv_id:'',
        current_date : date,
        fromDate: date ,
        toDate:date,
        material:'all',
        modalOpen               : false,
        modalTitle              : '',
        raw_id                  : [] ,
        raw_name                : ['Select...'],
        OptionsRaw              : [],
        quantity                : 0,
        item_quantity           : 0,
        data_daily              : [],
        editModal               : false,
        editRunning             : '',
        editIn                  : '',
        editOut                 : '',
        editAmount:              '',
        editPackval:             '',
        packaging_val           : '',
        amount                  : '',
     }
     this.toggleModal        = this.toggleModal.bind(this);
     this.editForm           = this.editForm.bind(this);
     this.SaveEdit           = this.SaveEdit.bind(this);


    }

    componentDidMount(){
        Alertify.defaults = Config.AlertConfig;

    }

    recordDailyInv = async() => {
        this.validator.hideMessages();
        this.forceUpdate();
        await this.setState({
             action           :'Add' ,
             modalTitle       :'Daily Inventory',
             modalOpen        :true,
             name             :'',
             quantity         :[],
             item_unit        :[],
             raw_name         :["Select..."],
             inputFields      :["1"]
        });

     }

     handleSelectChangeRaw = async(newValue) => {
        this.state.raw_id     = (newValue ? newValue.value : '')
        this.state.raw_name   = (newValue ? newValue.label : '')

        if(!this.state.raw_id){
           this.validator.showMessages();
           this.forceUpdate();
        }else{
           this.validator.hideMessages();
          this.forceUpdate();
        }
     }



     SubmitForm = async(e) => {
         e.preventDefault();

        if (this.validator.allValid()) {
           this.forceUpdate();
           let url = Config.base_url + 'inventory/addInv';
           const formData = new FormData(e.target);

           const response = await axios.post(url , formData);

           if (response.data.success) {
              this.setState({
                 quantity       : '',
                 packaging_val  : '',
                 packaging_type : '',
                 raw_id         : '',
                 item_unit      : '',
                 amount         : '',
                 raw_name       : ["Select..."],
              });
              Alertify.success('Successfully added!');
              this.GetDaily();
           }else{
                Alertify.error('Something went wrong!');
           }

        } else {
           this.validator.showMessages();
           this.forceUpdate();
        }

     } // end SubmitForm

     // GetDaily = async(e) => {
     //       let response;
     //       let temp_data =[];
     //       let url = Config.base_url + 'inventory/getDailyInventory';
     //       response = await axios.post(url , '');
     //
     //       if (response.data.msg == 'success') {
     //           const m = response.data.result.map((key)=>  {
     //
     //               let groupBtn = [
     //                  {title: "Edit",icon: "ion-edit",color:"info", function: () => this.editForm(key.inventory_id)},
     //               ];
     //              let x = {
     //                date: key.date,
     //                mat_name: key.mat_name,
     //                run_bal: key.running_bal,
     //                in:key.materials_in,
     //                out:key.materials_out,
     //                action:<GroupButton data={groupBtn}/>,
     //             }
     //             temp_data.push(x);
     //           });
     //           this.setState({data_daily: temp_data})
     //       }
     // }

     GetFinish = async(e) => {
           let response;
           let temp_data =[];
           let url = Config.base_url + 'testing_janu/getFinishProducts';
           response = await axios.post(url , '');

           if (response.data.msg == 'success') {
               const m = response.data.result.map((key)=>  {

                   let groupBtn = [
                      {title: "Edit",icon: "ion-edit",color:"info", function: () => this.editForm(key.inventory_id)},
                   ];
                  let x = {
                    date: key.date,
                    mat_name: key.mat_name,
                    run_bal: key.running_bal,
                    in:key.materials_in,
                    out:key.materials_out,
                    action:<GroupButton data={groupBtn}/>,

                 }
                 temp_data.push(x);
               });
               this.setState({data_daily: temp_data})
           }
     }


    editForm = async(id) => {

        let url = Config.base_url +'inventory/getSingleInv';
        let formData = {inv_id : id};

        let response =  await axios.post(url , qs.stringify(formData));

        if (response.data.status == 'success') {
            this.setState({
                editModal : true,
                editInv_id : response.data.data.inventory_id,
                editIn : response.data.data.materials_in,
                editOut: response.data.data.materials_out,
                editRunning : response.data.data.running_bal,
                editAmount: response.data.data.amount,
                editPackval:response.data.data.packaging_val,
                editPacktype:response.data.data.packaging_type
            });
        }
    }

    SaveEdit = async(e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let url = Config.base_url + 'inventory/saveEdit';
        formData.append('inv_id' , this.state.editInv_id);
        let response  = await axios.post(url , formData);
        if (response.data.status == 'success') {
            Alertify.success(response.data.msg);
            this.Filter();
        }else{
            Alertify.error(response.data.msg);
        }
    }

    toggleModal = () => {
         this.setState({
             modalOpen : !this.state.modalOpen
         })
    }

    render(){

        // if (this.props.data.length === 0) {
        //     $('.onTbl table tbody').html("<tr><td colspan='6'>No matching records found</td></tr>");
        // }else {
        //     $('.onTbl table tbody').html("");
        //
        // }

        const data = {
             columns: [
                {
                  label: 'Date',
                  field: 'date',
                  sort: 'asc',
                  width: 150
                },
                {
                 label: 'Material Name',
                 field: 'mat_name',
                 sort: 'asc',
                 width: 150
                },
                {
                 label: 'Running Balance',
                 field: 'run_bal',
                 sort: 'asc',
                 width: 150
                },
                {
                 label: 'In',
                 field: 'in',
                 sort: 'asc',
                 width: 150
                },
                {
                 label: 'Out',
                 field: 'out',
                 sort: 'asc',
                 width: 150
                },
                {
                 label: 'Action',
                 field: 'action',
                 sort: 'asc',
                 width: 150
                },
             ],
             rows    : this.props.data
        };
        return(
            <AUX>

                <Row>
                <Col sm={12} className="card m-b-20">
                    <div className="card-body table_shift real_tbl onTbl">

                       <MDBDataTable
                           responsive
                           bordered
                           hover
                           data={data}
                           />
                    </div>
                </Col>
                </Row>
                {/* Record daily Inventory MODAL*/}
               <Modal  size="xl" isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
                  <ModalHeader toggle={this.toggleModal}>{this.state.modalTitle}</ModalHeader>
                  <ModalBody>
                     <Form method="POST" onSubmit={this.SubmitForm}>
                     <Row className="DI-Names">
                        <Col md={3}>
                          <Label for="raw_name">Raw Material</Label>
                         </Col>
                         <Col md={3}>
                           <Label for="raw_name">Packaging</Label>

                         </Col>
                         <Col md={2}>
                           <Label for="raw_name">Amount</Label>

                         </Col>
                        <Col md={2}>
                          <Label for="raw_name">IN</Label>

                        </Col>
                        <Col md={2}>
                          <Label for="raw_name">OUT</Label>
                        </Col>
                     </Row>
                     <Row className="addNew-Inv">
                        <Col md={3}>
                           <CreatableSelect
                             isClearable
                             name              = "raw_name"
                             className         = "Inv-raw-Mat"
                             onChange          = {(e)=>this.handleSelectChangeRaw(e)}
                             options           = {this.state.OptionsRaw}
                             value          = {[{
                                                 value : this.state.raw_id,
                                                 label : this.state.raw_name
                                               }]}
                          />
                        </Col>
                        <Col className="packaging-col" md={3}>
                           <FormGroup className="packaging-group">
                              <Input type="text" name="packaging_val" id="packaging_val" className="packaging-val" placeholder="Enter Amount" value={this.state.packaging_val} onChange={(e)=>this.InputOnChange(e)} />
                              <select name="packaging_type">
                                <option value="pcs">pcs</option>
                                <option value="gal">gal</option>
                                <option value="dia">dia</option>
                              </select>
                           </FormGroup>
                        </Col>
                        <Col className="packaging-col" md={2}>
                           <FormGroup className="packaging-group">
                              <span>Php</span>
                              <Input type="text" name="amount" id="amount" placeholder="0.00" value={this.state.amount} onChange={(e)=>this.InputOnChange(e)} />
                           </FormGroup>
                        </Col>
                        <Col className="packaging-col" md={2}>
                           <Input type="text" name="quantity" id="quantity" placeholder="Enter Quantity" value={this.state.quantity} onChange={(e)=>this.InputOnChange(e)} />
                        </Col>
                        <Col  className="packaging-col"md={2}>
                           <Input type="text" name="item_unit" id="item_unit" placeholder="Enter Quantity" value={this.state.item_unit} onChange={(e)=>this.InputOnChange(e)}/>
                        </Col>

                     </Row>
                     <Row className="required-content">
                        <Col md={3}>
                           <span id="err">{this.validator.message('Raw_material', this.state.raw_id, 'required')}</span>
                        </Col>
                        <Col className="packaging-col required-col" md={3}>
                           <span id="err">{this.validator.message('Packaging', this.state.packaging_val, 'required|numeric')}</span>
                        </Col>
                        <Col md={2}>
                           <span id="err">{this.validator.message('Amount', this.state.amount, 'required|numeric')}</span>
                        </Col>
                        <Col md={2}>
                           <span id="err">{this.validator.message('Amount Added', this.state.quantity, 'numeric')}</span>
                        </Col>
                        <Col md={2}>
                           <span id="err">{this.validator.message('Amount Consumed', this.state.item_unit, 'numeric')}</span>
                        </Col>

                     </Row>
                        <Row>
                           <Col md={6} >
                               <FormGroup>
                                  <Input type="hidden" name="requested_by" id="requested_by" placeholder="Enter Requested By" value="Admin" />
                               </FormGroup>
                           </Col>
                       </Row>

                       <ModalFooter>
                          <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleModal}>Cancel</Button>{' '}
                          <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                       </ModalFooter>

                     </Form>
                  </ModalBody>
               </Modal>
               {/*END Record daily Inventory MODAL*/}
               {/*Start Edit*/}
               <Modal isOpen={this.state.editModal}>
                   <ModalHeader toggle={() => this.setState({editModal : !this.state.editModal})}>Edit</ModalHeader>
                   <ModalBody>
                   <Form onSubmit={this.SaveEdit}>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Running Balance</Label>
                                <Input name="editRunning" value={this.state.editRunning} onChange={(e) => this.InputOnChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Amount</Label>
                                <Input name="editAmount" value={this.state.editAmount} onChange={(e) => this.InputOnChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={10}>
                            <FormGroup>
                                <Label>Packaging Value</Label>
                                <Input name="editPackval" value={this.state.editPackval} onChange={(e) => this.InputOnChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Type</Label>
                                <Input name="editPacktype" value={this.state.editPacktype} onChange={(e) => this.InputOnChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label>In</Label>
                            <Input name="editIn" value={this.state.editIn} onChange={(e) => this.InputOnChange(e)}/>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label>Out</Label>
                            <Input name="editOut" value={this.state.editOut} onChange={(e) => this.InputOnChange(e)}/>
                        </FormGroup>
                        </Col>

                    </Row>
                    <ModalFooter>
                        <Button type="button" color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.setState({editModal : !this.state.editModal})}>Cancel</Button>{' '}
                        <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                    </ModalFooter>
                   </Form>
                   </ModalBody>
               </Modal>
               {/*End Edit*/}
            </AUX>
        )
    }
}
export default DailyRawTab;
