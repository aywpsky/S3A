import React, {Component, Suspense}  from "react";
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import {Row,Col,Form,FormGroup , Input , Label , Button ,Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import Config from "../../../config/Config";
import Helper from "../../../config/Helper";
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
import SimpleReactValidator from 'simple-react-validator';
import Alertify from 'alertifyjs';
import qs from "qs";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import classnames from 'classnames';

const DailyRawTab  =React.lazy(() => import('./DailyRawTab'));
const WorkInProgress = React.lazy(() => import('./WorkInProgress'));
const FinishGoods = React.lazy(() => import('./FinishGoods'));

class DailyInventory extends Component {
    constructor ( props ) {
        super( props );
        this.validator = new SimpleReactValidator();

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this.state = {
            fromDate: date ,
            toDate:date,
            material:'all',
            OptionsRaw : [],
            activeTab: '1',
            raw_id                  : [] ,
            raw_name                : ['Select...'],
            OptionsRaw              : [],
            quantity                : 0,
            item_quantity           : 0,
            data_daily              : [],
            data_raw                : [],
            data_finish             : [],
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
        this.Filter             = this.Filter.bind(this);
    }

    toggleModal = () => {
         this.setState({
             modalOpen : !this.state.modalOpen
         })
    }
    componentDidMount(){
        this.getAllRaw();
        this.Filter(1);
        Alertify.defaults = Config.AlertConfig
    }

    InputOnChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    periodChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    Filter = async(activeTab) => {
       const { fromDate , toDate , material} = this.state;
       if (parseInt(activeTab) === 1) {
           this.GetDaily(fromDate , toDate , material)
       }else if (parseInt(activeTab) === 2) {
           this.GetWorkInProgress( fromDate , toDate , material);
       }else if (parseInt(activeTab) === 3) {
           this.GetDailyFinish( fromDate , toDate , material);
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
            const { fromDate , toDate , material} = this.state;
            this.GetDaily(fromDate , toDate , material);
        }else{
            Alertify.error(response.data.msg);
        }
    }

    GetDaily = async(fromDate , toDate , material) => {
          let formData = {
              fromDate : fromDate,
              toDate : toDate,
              material : material,
          };
          let response;
          let temp_data =[];
          let url = Config.base_url + 'inventory/filterDaily';
          response = await axios.post(url ,qs.stringify(formData));
          if (response.data.status == 'success') {
              const m = response.data.data.map((key)=>  {
                  let groupBtn = [
                     {title: "Edit",icon: "ion-edit",color:"info", function: () => this.editForm(key.inventory_id)},
                  ];
                 let x = {
                   date: key.date,
                   mat_name: key.material_name,
                   run_bal: key.running_bal,
                   in:key.materials_in,
                   out:key.materials_out,
                   action:<GroupButton data={groupBtn}/>,
                }
                temp_data.push(x);
              });
              console.log(temp_data);
              this.setState({data_raw: temp_data})
          }
    }

    GetDailyFinish = async(fromDate , toDate , material) => {
          let formData = {
              fromDate : fromDate,
              toDate : toDate,
              material : material,
          };
          let response;
          let temp_data =[];
          let url = Config.base_url + 'testing_janu/getFinish_dailly';
          response = await axios.post(url ,qs.stringify(formData));

          if (response.data.msg == 'success') {
              console.log(response.data.data);
              const m = response.data.data.map((key)=>  {
                  let groupBtn = [
                     {title: "Edit",icon: "ion-edit",color:"info", function: () => this.editForm(key.inventory_id)},
                  ];
                 let x = {
                   product: key.job,
                   jobsheet: "JOID" + key.job_sheet_id.padStart(5, "0"),
                   qty_to_finished: key.qty,
                   date_finished:key.date_added,
                   dept:(key.department != 0) ? "Production" : "Printing",
                }
                temp_data.push(x);
              });
              this.setState({data_finish: temp_data})
          }
    }

    GetWorkInProgress = async(fromDate , toDate , material) => {
        let formData = {
            fromDate : fromDate,
            toDate : toDate,
            material : material,
        };
        let url = Config.base_url + 'testing_janu/getWorkInProgress';
        let response = await axios.post(url,qs.stringify(formData));
        let temp_data = [];

        if (response.data.msg === 'success') {
            const m = response.data.data.map((key)=>  {
                let groupBtn = [
                   { title: "Edit",icon: "ion-edit",color:"info",function: () => this.editForm(key.inventory_id)},
                ];
               let x = {
                    date :key.date_added,
                    prod_name :key.job,
                    job_sheet :"JOID" + key.job_sheet_id.padStart(5, "0"),
                    due_date :key.dispatch_date,
                    qty_to_finished :key.quantity,
                    finished :key.qty,
                    // total :key.total_fin,
                    // workdone :"% " + ((key.total_fin / key.quantity) * 100).toPrecision(3),
                    department :(key.department == 0) ? "Printing" : "Production"
              }
              temp_data.push(x);
            });
            this.setState({data_daily: temp_data});
        }else{
            Alertify.warning('No records.');
            this.setState({data_daily : []})
        }
    }

    toggle(tab) {
         if (this.state.activeTab !== tab) {
             this.setState({
              activeTab: tab,
             });
             this.Filter(tab);
         }
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

     SubmitForm = async(e) => {
         e.preventDefault();

        if (this.validator.allValid()) {
           this.forceUpdate();
           let url = Config.base_url + 'inventory/addInv';
           const formData = new FormData(e.target);
           const { fromDate , toDate , material} = this.state;

           const response = await axios.post(url , formData);
           console.log(response.data.err);
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
              this.GetDaily(fromDate , toDate , material)
           }else{
                Alertify.error(response.data.err);
           }
        } else {
           this.validator.showMessages();
           this.forceUpdate();
        }

     }

    getAllRaw = async() =>{
       let temp_data =[];
       let url = Config.base_url + '/api/viewRaw';
       let response = await axios.post(url , '');

       if (response.data) {
          this.forceUpdate();
          response.data.map((data , idx) => {
             let Options = {
               value : data.raw_id,
               label : data.material_name
             }
             temp_data.push(Options);
          });
          await this.setState({OptionsRaw: temp_data});
       }else{
          alert('failed');
       }
    }

    render(){

        return(
            <AUX>
                <Row>
                  <Col sm={12} >
                        <Row>
                        <Col sm={12} className='real_header'>
                            <Row>
                            <Col className="filter-content" sm={2}>

                              <div className="form-group">
                                    <select className="form-control oval_select" onChange={(val) => this.setState({material : val.target.value})}>
                                        <option value="all">All</option>
                                         {
                                             this.state.OptionsRaw.map((val , idx) => {
                                                return <option value={val.value}>{val.label}</option>
                                             })
                                         }
                                    </select>
                              </div>
                            </Col>
                            <Col className="filter-content" sm={2}>
                            <div className="form-group">
                                  <Row className="form-group">
                                        <Col sm={2}>
                                            <label className="col-from-label">From</label>
                                        </Col>
                                        <Col sm={10}>
                                            <input className="form-control oval_select"  name="fromDate" type="date" placeholder="Date From:" value={this.state.fromDate} onChange={(e) => this.periodChange(e)}/>
                                        </Col>
                                  </Row>
                            </div>
                            </Col>
                            <Col className="filter-content" sm={2}>
                            <div className="form-group">
                                  <Row className="form-group">
                                        <Col sm={2}>
                                            <label className="col-from-label">To</label>
                                        </Col>
                                        <Col sm={10} classNam="float-right">
                                            <input className="form-control oval_select" name="toDate" value={this.state.toDate} onChange={(e) => this.periodChange(e)} type="date" placeholder="Date From:"/>
                                        </Col>
                                  </Row>
                            </div>
                            </Col>
                            <Col className="filter-btn" sm={2}>
                                <Row>
                                    <Col sm={12}>
                                        <Button className="real-btn btn btn-info" onClick={() => this.Filter(this.state.activeTab)}>Filter</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="filter-btn" sm={4}>
                            {(this.state.activeTab == 1)? <button type="button" className="float-right btn btn-info real-btn btn btn-secondary" onClick={this.recordDailyInv} name="fromDate">Record Inventory</button> : ''}

                            </Col>
                            </Row>
                            <Nav tabs>
                              <NavItem>
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '1' })}
                                  onClick={() => { this.toggle('1'); }}
                                >
                                  Raw Material
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '2' })}
                                  onClick={() => { this.toggle('2'); }}
                                >
                                  Work in Progress
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '3' })}
                                  onClick={() => { this.toggle('3'); }}
                                >
                                  Finish Goods
                                </NavLink>
                              </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                     <TabPane tabId="1">
                                           <Suspense fallback={<div>Loading...</div>}>
                                           <DailyRawTab data={this.state.data_raw}/>
                                           </Suspense>
                                     </TabPane>
                                     <TabPane tabId="2">
                                           <Suspense fallback={<div>Loading...</div>}>
                                           <WorkInProgress data={this.state.data_daily}/>
                                           </Suspense>
                                     </TabPane>
                                     <TabPane tabId="3">
                                           <Suspense fallback={<div>Loading...</div>}>
                                           <FinishGoods data={this.state.data_finish}/>
                                           </Suspense>
                                     </TabPane>

                            </TabContent>
                        </Col>
                        </Row>
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

export default DailyInventory;
