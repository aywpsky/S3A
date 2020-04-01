import React, { Component }  from "react";
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import { Col , Row , Modal , ModalBody , ModalHeader , ModalFooter , Button , Input , Label , FormGroup , Form } from "reactstrap";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import SimpleReactValidator from 'simple-react-validator';
import Alertify from 'alertifyjs';
import qs from "qs";
class EditSalesOrder extends Component {
    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
		this.state = {description: '' , editSalesData: [] , btn_disable : true};

    }

    componentDidUpdate(prevProps){
        Alertify.defaults = Config.AlertConfig
        if(this.props.editSalesData !== prevProps.editSalesData){
            this.setState({editSalesData : this.props.editSalesData});
        }
    }

    Splice = (idx) => {
        alert(idx);
        console.log(this.props.editSalesData)
    }

    AddMore = () => {
        const {editSalesData} = this.state;
        let data = [];
        let temp_details = {job:'',description : '',special_instruction : '' ,dispatch_date : new Date(), additional_details : [{ substrate : '' , cap: '' , quantity : '', top_seal : ''}] };
        editSalesData.push(temp_details);
        this.setState({editSalesData});
    }

    AddMoreMaterial = (idx) => {
        const {editSalesData} = this.state;
        editSalesData[idx].additional_details.push({ substrate : '' , cap: '' , quantity : '', top_seal : ''});
        this.setState({editSalesData});
    }

    handle_materials = (parent_index,child_index,name,value) => {
		const {editSalesData} = this.state;
        editSalesData[parent_index].additional_details[child_index][name] = value
		this.setState({editSalesData});
    }

    handle_changes = (parent_idx , name , value) => {
        const {editSalesData} = this.state;
        editSalesData[parent_idx][name] = value;
        this.setState({editSalesData});
    }

    Splice = (idx , id) => {
        const { editSalesData } = this.state;
        const me = this;
        if(id){
            Alertify.confirm("Are you sure you want to remove this record?",
              async function(){
                let url = Config.base_url + 'sales/removeSales_details';
                let data = qs.stringify({id : id});
                axios.post(url , data).then( res => {
                    if(res.data.status === 'done'){
                        editSalesData.splice(idx , 1);
                		me.setState({editSalesData});
                    }else{
                        Alertify.info(res.data.msg);
                    }
                });
              },
              function(){
                    // cancel
              });
        }else{
            editSalesData.splice(idx , 1);
    		this.setState({editSalesData});
        }
    }

    SpliceMaterial  = (id , parent_idx , child_idx) => {
        const {editSalesData} = this.state;
        const me = this;
        if(id){
            Alertify.confirm("Are you sure you want to remove this record?",
              async function(){
                let url = Config.base_url + 'sales/removejob_details';
                let data = qs.stringify({id : id});
                axios.post(url , data).then( res => {
                    if(res.data.status === 'done'){
                        editSalesData[parent_idx].additional_details.splice(child_idx , 1);
                        me.setState({editSalesData});
                    }else{
                        Alertify.info(res.data.msg);
                    }
                });
              },
              function(){
                    // cancel
              });
        }else{
            editSalesData[parent_idx].additional_details.splice(child_idx , 1);
            this.setState({editSalesData});
        }
    }

    Submit = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const {editSalesData} = this.props;
			let url = Config.base_url + "sales/editSalesOrder";
            let formdata = new FormData(e.target);
            formdata.append('fk_sales_order_id' , this.props.sales_id);
            formdata.append('company_fk_id' , this.props.company_fk_id);
            axios.post(url , formdata)
            .then( res => {
                if (res.data.status == 'ok') {
                    Alertify.success('Successfully updated!');
                    this.props.updateTable();
                    this.props.editModal();
                }else{
                    Alertify.error('Fail updating your data. Please try again');
                }
            })
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render(){

        return(
            <Modal className="modal-lg" isOpen = {this.props.EditModal} toggle= {() => this.props.editModal()}>
                <ModalHeader toggle= { () => this.props.editModal() }>{ "SOID" + this.props.sales_id.padStart(5, "0") }</ModalHeader>
                <ModalBody>
                    <Form onSubmit = {(e) => this.Submit(e)}>
                        {
                            this.state.editSalesData.map((val , idx) => {
            					return(
                                	<div key={idx} class={idx}>
                                        <Input type="hidden" className="form-control" name="orderdetails_id[]" value={val.id} />
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label className="close_production">
                                                        Job
                                                    {(idx> 0) ? <button onClick={() => this.Splice(idx , val.id)} type="button" class="addMoreClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
                                                    </Label>

                                                    <Input type="text" className="form-control" name="salesOrder_job[]" value={val.job} onChange={(e) => this.handle_changes(idx , 'job' , e.target.value ) } placeholder="Enter Job Name" />
                                                    <span id="err">{this.validator.message('Job Name', this.state.editSalesData[idx].job, 'required')}</span>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {val.additional_details.map((val2 , idx2) => {
            								return(
            									<Row className="addMoreMats">
                                                    <Input type="hidden" name="job_details_id[]" value = {val2.pk_sales_order_job_details_id}/>
            										<Col md={3}>
            				                            <FormGroup>
            				                                <Label>Substrate</Label>
            				                                <input type="text" className="form-control" name={"substrate["+idx+"]["+idx2+"]"} value={val2.substrate} onChange={(value) => this.handle_materials(idx,idx2,'substrate',value.target.value) } placeholder="Enter Substrate" />
            				                                <span id="err">{this.validator.message('Substrate', val2.substrate, 'required')}</span>
            				                            </FormGroup>
            				                       	</Col>
            										<Col md={3}>
            											<FormGroup>
            												<label>Cap</label>
            												<Input type="text" className="form-control" name={"cap["+idx+"]["+idx2+"]"} value={val2.cap} onChange={(value) => this.handle_materials(idx , idx2,'cap',value.target.value) } placeholder="Enter Cap" />
            												<span id="err">{this.validator.message('Cap', val2.cap, 'required')}</span>
            											</FormGroup>
            										</Col>
            										<Col md={3}>
            											<div className="form-group">
            												<Label>Quantity</Label>
            												<input type="number" className="form-control" name={"quantity["+idx+"]["+idx2+"]"} value={val2.quantity} onChange={(value) => this.handle_materials(idx , idx2,'quantity',value.target.value) }  placeholder="Enter Quantity" />
            												<span id="err">{this.validator.message('quantity', val2.quantity, 'required|integer')}</span>
            											</div>
            										</Col>
            										<Col md={3}>
            											<FormGroup>
            												<Label className="control-label">
            													Top Seal
            													{(idx2 > 0) ? <button onClick={() => this.SpliceMaterial(val2.pk_sales_order_job_details_id , idx , idx2)} type="button" class="addMoreClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
            												</Label>
            												<select className="form-control select2" name={"topSeal["+idx+"]["+idx2+"]"} value={val2.top_seal}  onChange = {(value) => this.handle_materials(idx , idx2,'top_seal',value.target.value)}>
            													<option>Select</option>
            													<option value="1">Yes</option>
            													<option value="0">No</option>
            												</select>

            											</FormGroup>
            										</Col>
            									</Row>
            								)
            							})
            						}
            							<Row className="pluscont">
            								<Col md={2} className={'addmoreMats'}>
            									<Button type="button" color="primary" className=" btn btn-secondary" onClick = {() => this.AddMoreMaterial(idx)}>
            		                               <i class="fas fa-plus"></i>
            		                            </Button>
            								</Col>
            							</Row>

            							<hr/>
                                        <Row>
            								<hr/>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label className="control-label">Special Instructions</Label>
                                                    <Input type="textarea" name="special_inc[]" value={val.special_instruction}  onChange = {(e) => this.handle_changes(idx , 'special_instruction' , e.target.value ) }/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label className="control-label">Additional Details</Label>
                                                    <Input type="textarea" name="add_details[]" value={val.description} onChange = {(e) => this.handle_changes(idx , 'description' , e.target.value ) } />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <label className="control-label">Dispatch Date</label><br></br>
                                            <DatePicker
                                                className="form-control"
                                                name="dispatch_date[]"
                                                selected={new Date(val.dispatch_date)}
                                                onChange={(date) => this.handle_changes(idx , 'dispatch_date' , date) }
                                                dateFormat = "yyyy-MM-dd"
                                            />
                                        <span id="err">{this.validator.message('Dispatch Date', this.state.editSalesData[idx].dispatch_date, 'required')}</span>
                                        </FormGroup>
                                        <hr/>
                                        </div>
                                    );
                                })
                        }
                    <Row>
                        <Col md={12}>
                            <Button type="button" color="primary" className="addMoreMaterials btn btn-secondary" onClick={() => this.AddMore()}>
                                Add More
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <ModalFooter>
                        <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.props.editModal()}>Cancel</Button>{' '}
                            <Button type="submit" disabled={false} color="primary" className="btn btn-secondary waves-effect">Submit</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return{
        EditModal : state.salesReducers.EditModal,
        editSalesData : state.salesReducers.editSalesData,
        sales_description : state.salesReducers.sales_description,
        salesOrderId : state.salesReducers.salesOrderId,
        customer : state.salesReducers.customer,
        sales_id : state.salesReducers.sales_id,
        company_fk_id : state.salesReducers.company_fk_id,
    }
}

const mapActionToProps = dispatch => {
    return{
        editModal : (salesData) => dispatch({type : 'editModal'}),
        handle_materials : (value,parent_state,child_state) => dispatch({type : 'handle_materials',value:value,parent_state:parent_state,child_state:child_state}),
        setDesc : (desc) => dispatch({type:'setDesc' , desc :desc}),
    }
}

export default connect(mapStateToProps , mapActionToProps)(EditSalesOrder);
