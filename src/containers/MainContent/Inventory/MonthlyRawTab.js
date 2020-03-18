import React , {Component, Suspense} from 'react';
import AUX from '../../../hoc/Aux_';
import { BallBeat } from 'react-pure-loaders';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import qs from "qs";
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import classnames from 'classnames';
import Editable from 'react-x-editable';
import GroupButton from '../../CustomComponents/GroupButton';

class MonthlyRawTab extends Component{

    constructor ( props ) {
        super( props );
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this.validator = new SimpleReactValidator();
        this.state = {
            data_monthly            : [],
            modalOpen               : false,
            raw_id                  : '',
            raw_name                : '',
            modalTitle              : '',
            OptionsRaw              : [],
            mat_name                : '',
            mat_box                 : '',
            mat_pack                : '',
            mat_end_bal             : '',
            fromDate                : date,
            toDate                  : date,
            material                : 'all',
            physical_box            : '',
            physical_end_bal        : '',
            additional_note         : '',
            packaging_value         : '',
            inventory_id            : '',
            physical_id             : '',
            recorded_date           : '',
            current_date            : date
        }
        this.toggleModal           = this.toggleModal.bind(this);
    }

    componentDidMount(){

        this.GetMonthly();

       Alertify.defaults = Config.AlertConfig
    }

    convertDate =(date) =>{
        var months_arr = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
        var newDate = new Date(date);
        var month = newDate.getMonth() - 1;
        var day   = newDate.getDate();
        var year = newDate.getFullYear();
        return  months_arr[month] +" "+day+", "+year;
    }

    GetMonthly = async(e) => {
        let response;
        let temp_data =[];
        let url = Config.base_url + 'testing_janu/getMonthlyInventory';
        response = await axios.post(url , '');
        if (response.data.msg == 'success') {
            console.log(response);
            const m = response.data.result.map((key)=>  {
                let groupBtn = [
                   { title: "Edit",icon: "ion-edit",color:"info",function: this.test},
                ];
               let recInv = {
                  inventory_id   : key.inventory_id,
                  mat_name       : key.mat_name,
                  packaging_value: key.packaging_val,
                  packaging_type : key.packaging_type,
                  packaging      : key.packaging_val+" "+key.packaging_type+"/box",
                  consumed       : key.materials_out,
                  add            : key.materials_in,
                  boxes_rec      : (key.materials_in - key.materials_out) / key.packaging_val,
                  end_rec        : (key.materials_in - key.materials_out),
                  raw_id         : key.raw_id,
                  phy_end_bal    : (key.physical_endbals != null) ? key.physical_endbals : '',
                  phy_end_box    : (key.physical_boxes != null) ? key.physical_boxes : '',
               }
               let x = {
                   mat_name      : key.mat_name,
                   packaging     : key.packaging_val+" "+key.packaging_type+"/box",
                   beg           : key.beginning_bal,
                   consumed      : key.materials_out,
                   add           : key.materials_in,
                   boxes_rec     : parseInt((key.materials_in - key.materials_out) / key.packaging_val),
                   end_rec       : key.materials_in - key.materials_out,
                   boxes_phy     : (key.physical_boxes != null) ? key.physical_boxes : 0,
                   end_phy       : (key.physical_endbals != null) ? key.physical_endbals : 0,
                   variance      : (key.physical_endbals != null) ? key.physical_endbals -(key.materials_in - key.materials_out) : 0 ,
                   notes         : "N/A",
                   action        : <button type="button" data-id={key.inventory_id} onClick={(e) => this.recordDailyInv(recInv)} className="float-right btn btn-info real-btn btn btn-secondary">Record Inventory</button>,
              }
              temp_data.push(x);
            });
            this.setState({data_monthly: temp_data})
        }
    }

    // recordDailyInv = async(data) => {
    //
    //   this.validator.hideMessages();
    //   this.forceUpdate();
    //
    //   let url = Config.base_url + 'inventory/getMonthlyInvPhysical';
    //   const formData = new FormData();
    //   formData.append('raw_id' , data.raw_id);
    //   formData.append('packaging_val' , data.packaging_value);
    //   formData.append('packaging_type' , data.packaging_type);
    //   formData.append('start_date' , this.state.fromDate);
    //   formData.append('end_date' , this.state.toDate);
    //
    //   const response = await axios.post(url , formData);
    //   if (response.data == 'no record') {
    //      await this.setState({
    //           action           : 'Add' ,
    //           modalTitle       : 'Monthly Inventory',
    //           modalOpen        : true,
    //           mat_name         : data.mat_name,
    //           packaging_value  : data.packaging_value,
    //           packaging_type   : data.packaging_type,
    //           mat_box          : data.boxes_rec,
    //           mat_pack         : data.packaging,
    //           mat_end_bal      : data.end_rec,
    //           inventory_id     : data.inventory_id,
    //           raw_id           : data.raw_id,
    //           physical_box     : data.phy_end_bal,
    //           physical_end_bal : data.phy_end_box,
    //            additional_note : '',
    //      });
    //   }else{
    //      await this.setState({
    //           action           : 'Add' ,
    //           modalTitle       : 'Monthly Inventory',
    //           modalOpen        : true,
    //           mat_name         : data.mat_name,
    //           packaging_value  : data.packaging_value,
    //           packaging_type   : data.packaging_type,
    //           mat_box          : data.boxes_rec,
    //           mat_pack         : data.packaging,
    //           mat_end_bal      : data.end_rec,
    //           inventory_id     : data.inventory_id,
    //           raw_id           : data.raw_id,
    //           physical_box     : response.data.physical_box,
    //           physical_end_bal : response.data.physical_end_bal,
    //           additional_note  : response.data.additional_note,
    //           physical_id      : response.data.physical_inventory_id,
    //      });
    //   }
    // }

    toggleModal = () => {
        this.setState({
           modalOpen : !this.state.modalOpen
        })
    }

   //  InputOnChange(e){
   //    let packaging_value = this.state.packaging_value;
   //    let physical_box    = parseInt(packaging_value/e.target.value)
   //    if(e.target.name == 'physical_end_bal'){
   //       this.setState({
   //            physical_box :physical_box,
   //       });
   //    }
   //
   //    this.setState({
   //         [e.target.name] : e.target.value
   //    });
   // }

    // SubmitForm_raw = async(e) => {
    //   e.preventDefault();
    //   if (this.validator.allValid()) {
    //       this.forceUpdate();
    //       let url = Config.base_url + 'inventory/addMonthlyInv';
    //       const formData = new FormData(e.target);
    //        formData.append('start_date' , this.state.fromDate);
    //        formData.append('end_date' , this.state.toDate);
    //        formData.append('raw_id' , this.state.raw_id);
    //        formData.append('packaging_val' , this.state.packaging_value);
    //        formData.append('packaging_type' , this.state.packaging_type);
    //        formData.append('physical_id' , this.state.physical_id);
    //        const response = await axios.post(url , formData);
    //
    //       if (response.data.success) {
    //          Alertify.success('Successfully added!');
    //          this.GetMonthly();
    //       }else if(response.data.update){
    //          Alertify.success('Successfully updated!');
    //         this.GetMonthly();
    //       }else{
    //            Alertify.error('Something went wrong!');
    //       }
    //   } else {
    //       this.validator.showMessages();
    //       this.forceUpdate();
    //   }
    // } // end SubmitForm

    render(){
            const data = {
                columns: [
                   {
                     label: 'Items',
                     field: 'mat_name',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'Packaging',
                     field: 'packaging',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'BEG.Balance',
                     field: 'beg',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'Consumed',
                     field: 'consumed',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'Add',
                     field: 'add',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'Boxes',
                     field: 'boxes_rec',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'End Bal.',
                     field: 'end_rec',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'Boxes',
                     field: 'boxes_phy',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'End Bal.',
                     field: 'end_phy',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'Variance',
                     field: 'variance',
                     sort: 'asc',
                     width: 150
                   },
                   {
                     label: 'Notes',
                     field: 'notes',
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
                rows : this.props.data
           }
        return(
            <AUX>
                <Row>
                    <Col sm={12} className="card m-b-20">
                        <div className="card-body table_shift real_tbl real_tbl_month">
                           <MDBDataTable
                               id='monthly'
                               responsive
                               bordered
                               hover
                               data={data}
                               />
                        </div>
                    </Col>
                </Row>

                {/*
                 <Modal  size="lg" isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
                     <ModalHeader toggle={this.toggleModal}>{this.state.modalTitle}</ModalHeader>
                     <ModalBody>
                        <Form className="recordMonthlyForm" method="POST" onSubmit={this.SubmitForm}>
                        <Row>
                           <Col md={6}>
                            <Label for="raw_name">Raw Material</Label>
                            <h6>{this.state.mat_name}</h6>
                            </Col>

                           <Col md={6}>
                            <Label for="raw_name">Packaging</Label>
                            <h6>{this.state.mat_pack}</h6>
                           </Col>
                        </Row>
                        <Row>
                           <Col md={6}>
                            <Label for="raw_name">Recorded Boxes</Label>
                            <h6>{this.state.mat_box}</h6>
                            </Col>

                           <Col md={6}>
                            <Label for="raw_name">Recorded End Balance</Label>
                            <h6>{this.state.mat_end_bal}</h6>
                           </Col>
                        </Row>
                        <Row>
                           <Col md={6}>
                            <Label for="raw_name">Physical End Balance</Label>
                            <Input type="text" name="physical_end_bal" id="physical_end_bal" value={this.state.physical_end_bal} onChange={(e)=>this.InputOnChange(e)} placeholder="Enter Amount"/>
                            <span id="err">{this.validator.message('Amount Consumed', this.state.physical_end_bal, 'numeric')}</span>
                            </Col>

                           <Col md={6}>
                            <Label for="raw_name">Physical Boxes</Label>
                            <Input type="text" name="physical_box" id="physical_box"  value={this.state.physical_box} onChange={(e)=>this.InputOnChange(e)} placeholder="Enter Amount"/>
                            <span id="err">{this.validator.message('Amount Consumed', this.state.physical_box, 'numeric')}</span>
                           </Col>
                        </Row>
                        <Row>
                           <Col md={12}>
                            <Label for="raw_name">Additional Details</Label>
                            <Input type="textarea" name="additional_note" id="additional_note" value={this.state.additional_note} onChange={(e)=>this.InputOnChange(e)} placeholder="Enter Note"/>
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
                END Record monthly Inventory MODAL*/}
            </AUX>
        )
    }
}
export default MonthlyRawTab;
