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
import $ from 'jquery';

const MonthlyRawTab  =React.lazy(() => import('./MonthlyRawTab'));
const WorkInProgress = React.lazy(() => import('./WorkInProgress'));
const FinishGoodMonthly = React.lazy(() => import('./FinishGoodMonthly'));

class MonthlyInventory extends Component{
    constructor ( props ) {
        super( props );
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this.validator = new SimpleReactValidator();
        this.state = {
            activeTab: '1',
            data_monthly            : [],
            modalOpen               : false,
            modalOpen_raw           : false,
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
            current_date            : date,
            physical_qty_finish     : 0,
            physical_note_finish    : '',
        }
        this.Filter           = this.Filter.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal_raw = this.toggleModal_raw.bind(this);


    }

    toggleModal = (finish_id, physical_id, physical_qty, note) => {

        this.setState({
           modalOpen : !this.state.modalOpen,
           raw_id : finish_id,
           physical_id: physical_id,
           physical_qty_finish:physical_qty,
           physical_note_finish:note,
        })
    }

    toggle(tab) {
         if (this.state.activeTab !== tab) {
             this.setState({
              activeTab: tab,
             });
             this.Filter(tab);
         }
    }

    componentDidMount(){
        this.getAllRaw();
        this.setStatedate();
        this.Filter(1);

       Alertify.defaults = Config.AlertConfig
    }

    setStatedate = async() =>{
      let temp_data =[];
      let url = Config.base_url + '/testing_janu/getDay';
      let response = await axios.post(url , '');
      var date = new Date(response.data)
      var tofay = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

      this.setState({
          recorded_date:tofay
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

    setFinishPro = async() =>{
        const { fromDate , toDate } = this.state;
        let formData = {
            fromDate : fromDate,
            toDate : toDate,
        };

        let url = Config.base_url + 'testing_janu/setFinish';
        let response = await axios.post(url,qs.stringify(formData));

    }

    Filter = async(activeTab) => {
       const { fromDate , toDate , material} = this.state;
       if (parseInt(activeTab) === 1) {
           this.Raw_material( fromDate , toDate , material);
       }else if (parseInt(activeTab) === 2) {
           this.GetWorkInProgress( fromDate , toDate , material);
       }else if (parseInt(activeTab) === 3) {
           this.getFinishProd( fromDate , toDate , material);
       }
   }

   GetWorkInProgress = async(fromDate , toDate , material) => {
       let formData = {
           fromDate : fromDate,
           toDate : toDate,
           material : material,
       };
       let url = Config.base_url + 'testing_janu/getWorkInProgress_monthly';
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
                   finished :key.total_quantity,
                   // total :key.total_qty,
                   // workdone :"% " + ((key.total_qty / key.quantity) * 100).toPrecision(3),
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

   getFinishProd = async(fromDate , toDate , material) => {
       let response;
       let temp_data =[];
       let formData = {
           fromDate : fromDate,
           toDate   : toDate,
           material : (material == '') ? "all" : material
       };

       this.setFinishPro();

       let url = Config.base_url + 'testing_janu/getFinishProducts';
       response = await axios.post(url , qs.stringify(formData));
       console.log(response.data);
       if (response.data.msg == 'success') {
           const m = response.data.result.map((key)=>  {
               console.log(key.physical_id);
               let tot = (key.total != null) ? key.total: 0;
               let x = {
                   mat_name      : key.job,
                   beg           : key.beg_bal,
                   add           : tot,
                   end_rec       : parseInt(key.beg_bal) + parseInt(tot),
                   end_phy       : (key.physical_count != null) ? key.physical_count : 0,
                   variance      : key.physical_count - (parseInt(key.beg_bal) + parseInt(tot)),
                   notes         : key.note,
                   action        : <button type="button" className="float-right btn btn-info real-btn btn btn-secondary" onClick={() => this.toggleModal(key.finish_id,key.physical_id,key.physical_count,key.note)}>Record Inventory</button>,
              }
              temp_data.push(x);
           });
           this.setState({data_inv: temp_data})
       }
   }

    Raw_material = async(fromDate , toDate , material) => {

       let formData = {
           fromDate : fromDate,
           toDate   : toDate,
           material : material
       };

       let url = Config.base_url + 'testing_janu/Filter';
       let response = await axios.post(url,qs.stringify(formData));
       let temp_data = [];

       if (response.data.status == 'success') {
           const m = response.data.data.map((key)=>  {
               let groupBtn = [
                  { title: "Edit",icon: "ion-edit",color:"info",function: () => this.editForm(key.inventory_id)},
               ];
               let recInv = {
                  inventory_id   : key.inventory_id,
                  mat_name       : key.mat_name,
                  packaging_value: key.packaging_val,
                  packaging_type : key.packaging_type,
                  packaging      : key.packaging_val+" "+key.packaging_type+"/box",
                  consumed       : key.materials_out,
                  add            : key.materials_in,
                  boxes_rec      : key.mat_end / key.packaging_val,
                  end_rec        : key.mat_end,
                  raw_id         : key.raw_id,
                  phy_end_bal    : (key.physical_endbals != null) ? key.physical_endbals : '',
                  phy_end_box    : (key.physical_boxes != null) ? key.physical_boxes : '',
               }
              let x = {
                  mat_name      : key.mat_name,
                  packaging     : key.packaging_val+" "+key.packaging_type+"/box",
                  beg           : key.beginning_bal,
                  consumed      : key.mat_out,
                  add           : key.mat_in,
                  boxes_rec     : parseInt(key.mat_end / key.packaging_val),
                  end_rec       : key.mat_end,
                  boxes_phy     : (key.physical_boxes != null) ? key.physical_boxes : 0,
                  end_phy       : (key.physical_endbals != null) ? key.physical_endbals : 0,
                  variance      : (key.physical_endbals != null) ? key.physical_endbals - key.mat_end : 0 ,
                  notes:"N/A",
                  action:<button type="button" data-id={key.inventory_id} onClick={(e) => this.recordDailyInv(recInv)} className="float-right btn btn-info real-btn btn btn-secondary">Record Inventory</button>,
             }
             temp_data.push(x);
           });
           this.setState({data_monthly: temp_data});
       }
    }

    submitInventory = async(e) =>{
        e.preventDefault();
        const {fromDate , toDate , material} = this.state;
        let url = "";
        let response = '';
        let formData = {
            fromDate : fromDate,
            toDate : toDate,
            material : material
        };
        switch (parseInt(this.state.activeTab)) {
            case 1:
                    url = Config.base_url + 'testing_janu/getPhysicals';
                    response = await axios.post(url,qs.stringify(formData));
                    var newDate = new Date(toDate)
                    var date_after_today = newDate.getFullYear() + "-" + newDate.getMonth()+ "-" + (newDate.getDate() + 1);
                    this.btn_con();
                    this.Filter(this.state.activeTab);
                    this.forceUpdate();
                break;

            case 3:
                    url = Config.base_url + 'testing_janu/recordMonth_finish';
                    response = await axios.post(url,qs.stringify(formData));
                    var newDate = new Date(toDate)
                    var date_after_today = newDate.getFullYear() + "-" + newDate.getMonth()+ "-" + (newDate.getDate() + 1);
                    this.btn_con();
                    this.Filter(this.state.activeTab);
                    this.forceUpdate();
                break;
            default:

        }

    }

    SubmitForm = async(e) => {
        e.preventDefault();
        let url = Config.base_url + 'testing_janu/recordPhysicalFin';
        const formData = new FormData(e.target);
        formData.append('start_date' , this.state.fromDate);
        formData.append('end_date' , this.state.toDate);
        formData.append('raw_id' , this.state.raw_id);

        const response = await axios.post(url , formData);

        if (response.data.msg != 'fail') {
            this.Filter(this.state.activeTab);
        }else {
            this.Filter(this.state.activeTab);
        }
    }

    SubmitForm_raw = async(e) => {
      e.preventDefault();
      if (this.validator.allValid()) {
          this.forceUpdate();
          let url = Config.base_url + 'inventory/addMonthlyInv';
          const formData = new FormData(e.target);
           formData.append('start_date' , this.state.fromDate);
           formData.append('end_date' , this.state.toDate);
           formData.append('raw_id' , this.state.raw_id);
           formData.append('packaging_val' , this.state.packaging_value);
           formData.append('packaging_type' , this.state.packaging_type);
           formData.append('physical_id' , this.state.physical_id);
           const response = await axios.post(url , formData);

          if (response.data.success) {
             Alertify.success('Successfully added!');
             this.Filter(this.state.activeTab);
          }else if(response.data.update){
             Alertify.success('Successfully updated!');
             this.Filter(this.state.activeTab);
          }else{
               Alertify.error('Something went wrong!');
          }
      } else {
          this.validator.showMessages();
          this.forceUpdate();
      }
    } // end SubmitForm

    btn_con = () => {
            return((this.state.recorded_date < this.state.current_date) ? <button type="button" onClick={this.submitInventory} className="float-right btn btn-info real-btn btn btn-secondary">Submit Inventory</button> :  <button type="button" className="float-right btn btn-info real-btn btn btn-sec ondary">This Button will activate tomorrow</button>)
    }

    convertDate =(date) =>{
        var months_arr = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
        var newDate = new Date(date);
        var month = newDate.getMonth() - 1;
        var day   = newDate.getDate();
        var year = newDate.getFullYear();
        return  months_arr[month] +" "+day+", "+year;
    }

    toggleModal_raw = () => {
        this.setState({
           modalOpen_raw : !this.state.modalOpen_raw
        })
    }

    recordDailyInv = async(data) => {

      this.validator.hideMessages();
      this.forceUpdate();

      let url = Config.base_url + 'inventory/getMonthlyInvPhysical';
      const formData = new FormData();
      formData.append('raw_id' , data.raw_id);
      formData.append('packaging_val' , data.packaging_value);
      formData.append('packaging_type' , data.packaging_type);
      formData.append('start_date' , this.state.fromDate);
      formData.append('end_date' , this.state.toDate);

      const response = await axios.post(url , formData);
      if (response.data == 'no record') {
         await this.setState({
              action           : 'Add' ,
              modalTitle       : 'Monthly Inventory',
              modalOpen_raw        : true,
              mat_name         : data.mat_name,
              packaging_value  : data.packaging_value,
              packaging_type   : data.packaging_type,
              mat_box          : data.boxes_rec,
              mat_pack         : data.packaging,
              mat_end_bal      : data.end_rec,
              inventory_id     : data.inventory_id,
              raw_id           : data.raw_id,
              physical_box     : data.phy_end_bal,
              physical_end_bal : data.phy_end_box,
               additional_note : '',
         });
      }else{
         await this.setState({
              action           : 'Add' ,
              modalTitle       : 'Monthly Inventory',
              modalOpen_raw        : true,
              mat_name         : data.mat_name,
              packaging_value  : data.packaging_value,
              packaging_type   : data.packaging_type,
              mat_box          : data.boxes_rec,
              mat_pack         : data.packaging,
              mat_end_bal      : data.end_rec,
              inventory_id     : data.inventory_id,
              raw_id           : data.raw_id,
              physical_box     : response.data.physical_box,
              physical_end_bal : response.data.physical_end_bal,
              additional_note  : response.data.additional_note,
              physical_id      : response.data.physical_inventory_id,
         });
      }
    }

    InputOnChange(e){
      let packaging_value = this.state.packaging_value;
      let physical_box    = parseInt(packaging_value/e.target.value)
      if(e.target.name == 'physical_end_bal'){
         this.setState({
              physical_box :physical_box,
         });
      }

      this.setState({
           [e.target.name] : e.target.value
      });
   }


    render(){

        $(document).ready(function() {
            var str = "<tr>";
            str += "<th></th><th></th><th></th><th></th><th class='rec' colspan='2'>Recorded</th><th class='phy' colspan='2'>Physical Count</th><th></th><th></th><th></th>";
            str += "</tr><tr>";
            str += "<th>Items</th><th>Packging</th><th>BEG.Balance</th><th>Consumed</th><th>Add</th><th>Boxes</th><th>End Bal.</th><th>Boxes</th><th>End Bal.</th><th>Variance</th><th>Note</th><th>Action</th>";
            str += "</tr>";
            $('#monthly thead').html(str);
            var str1 = "<tr>";
            str1 += "<th></th><th></th><th></th><th class='rec' colspan='1'>Recorded</th><th class='phy' colspan='1'>Physical Count</th><th></th><th></th>";
            str1 += "</tr><tr>";
            str1 += "<th>Items</th><th>BEG.Balance</th><th>Add</th><th>End Bal.</th><th>End Bal.</th><th>Variance</th><th>Note</th><th>Action</th>";
            str1 += "</tr>";
            $('#finish thead').html(str1);

             $('.clicker').on('click', function() {
                 $('.clicker').removeClass('active');
                 $(this).addClass('active');
             })
        });
        return(
            <AUX>
                <Row>
                  <Col sm={12} >
                        <Row>
                        <Col sm={12} className='real_header'>
                            <Row>
                                <Col md={12} sm={12} lg={12} xl={6}>
                                    <Row>
                                        <Col sm={4}>
                                          <div className="form-group">
                                                <label className="control-label">Single Select</label>
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
                                        <Col sm={4}>
                                        <div className="form-group">
                                              <label className="control-label">Period</label>
                                              <Row className="form-group">
                                                    <Col sm={2}>
                                                        <label className="col-from-label">From</label>
                                                    </Col>
                                                    <Col sm={10}>
                                                        <input className="form-control oval_select"  name="fromDate" type="date" placeholder="Date From:" value={this.state.fromDate} onChange={(date) => this.setState({fromDate : date.target.value})}/>
                                                    </Col>
                                              </Row>
                                        </div>
                                        </Col>
                                        <Col sm={4}>
                                        <div className="form-group ">
                                              <label className="control-label"><br></br></label>
                                              <Row className="form-group">
                                                    <Col sm={2}>
                                                        <label className="col-from-label">To</label>
                                                    </Col>
                                                    <Col sm={10} classNam="float-right">
                                                        <input className="form-control oval_select" value={this.state.toDate} name="toDate" type="date" placeholder="Date From:" onChange= {(date) => this.setState({toDate : date.target.value})}/>
                                                    </Col>
                                              </Row>
                                        </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12} sm={12} lg={12} xl={6}>
                                    <Row>
                                        <Col>
                                            <label className="control-label"><br></br></label>
                                            <Row>
                                                <Col sm={7}>
                                                    <Row>
                                                        <Col sm={12}>
                                                            <Button className="real-btn btn btn-info" onClick={() =>this.Filter(this.state.activeTab)}>Filter</Button>
                                                        </Col>
                                                    </Row>

                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={4}>
                                        <br></br>
                                            {(this.state.activeTab != 2) ? this.btn_con() :""}
                                        </Col>
                                    </Row>
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
                                           <MonthlyRawTab data={this.state.data_monthly}/>
                                           </Suspense>
                                     </TabPane>
                                     <TabPane tabId="2">
                                           <Suspense fallback={<div>Loading...</div>}>
                                           <WorkInProgress data={this.state.data_daily}/>
                                           </Suspense>
                                     </TabPane>
                                     <TabPane tabId="3">
                                           <Suspense fallback={<div>Loading...</div>}>
                                           <FinishGoodMonthly data={this.state.data_inv}/>
                                           </Suspense>
                                     </TabPane>

                            </TabContent>
                        </Col>
                        </Row>
                  </Col>
                </Row>

                <Modal size="sm" isOpen={this.state.modalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Record Physical Count</ModalHeader>
                    <ModalBody>
                       <Form className="recordMonthlyForm" method="POST" onSubmit={this.SubmitForm}>
                       <Input type="hidden" name="physical_id" id="physical_qty"  placeholder="Enter Quantity" value={(this.state.physical_id != '') ? this.state.physical_id : 'null'}/>

                       <Row>
                          <Col md={12}>
                           <Label for="raw_name">Physical Count</Label>
                           <Input type="nunber" name="physical_qty" id="physical_qty"  placeholder="Enter Quantity" value={(this.state.physical_qty_finish != 0) ? this.state.physical_qty_finish : 0} onChange={(e) => {this.setState({physical_qty_finish: e.target.value})}}/>

                           </Col>
                       </Row>
                       <Row>
                           <Col md={12}>
                            <Label for="raw_name">Note</Label>
                            <textarea className="form-control" type="text" name="note" id="physical_box"   placeholder="Enter Note" value={this.state.physical_note_finish}  onChange={(e) => {this.setState({physical_note_finish: e.target.value})}}>
                            </textarea>
                           </Col>
                       </Row>

                         <ModalFooter>
                           <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleModal}>Cancel</Button>{' '}
                           <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                         </ModalFooter>

                       </Form>
                    </ModalBody>
                </Modal>

                {/* Record monthly Inventory MODAL*/}
                 <Modal  size="lg" isOpen={this.state.modalOpen_raw} toggle={this.toggleModal_raw} className={this.props.className}>
                     <ModalHeader toggle={this.toggleModal_raw}>{this.state.modalTitle}</ModalHeader>
                     <ModalBody>
                        <Form className="recordMonthlyForm" method="POST" onSubmit={this.SubmitForm_raw}>
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
                 {/*END Record monthly Inventory MODAL*/}

            </AUX>
        )
    }



}
export default MonthlyInventory;
