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
		this.state = {description: ''};
    }

    componentDidMount(props){
        Alertify.defaults = Config.AlertConfig
    }

    Submit = (e) => {
        e.preventDefault();
		if (this.validator.allValid()) {
            const {editSalesData} = this.props;
			let url = Config.base_url + "sales/editSalesOrder";
            let formdata = new FormData();
            let allowed = ['job','description' , 'substrate','cap' , 'quantity' , 'top_seal' , 'special_instruction' , 'dispatch_date']
            formdata.append('sales_id' , this.props.salesOrderId);
			formdata.append('fk_sales_order_id' , editSalesData.fk_sales_order_id);
            formdata.append('description_2' , this.props.sales_description);

			for(var key in editSalesData){
                if (allowed.includes(key)) {
				    if (key == 'dispatch_date') {
                        formdata.append(key, Helper.formatDate(editSalesData[key]));
                    }else{
                        formdata.append(key , editSalesData[key] )
                    }
				}
            }
            //
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
                <ModalHeader toggle= { () => this.props.editModal() }>{this.props.customer}</ModalHeader>
                <ModalBody>
                    <Form onSubmit = {(e) => this.Submit(e)}>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label>
                                        Job
                                    </Label>

                                    <Input type="text" className="form-control" name="job" value={this.props.editSalesData.job} onChange={(e) => this.props.handle_changes(e.target.value,'editSalesData','job')} placeholder="Enter Job Name" />
                                    <span id="err">{this.validator.message('Job Name', this.props.editSalesData.job, 'required')}</span>
                                </FormGroup>
                            </Col>
                        </Row>
						<Row>
							<Col md={12}>
								<FormGroup>
									<Label className="control-label">Description</Label>
								</FormGroup>
								<Input type="textarea" name="description_2" value={this.props.sales_description} onChange={(e) => this.props.setDesc(e.target.value)} />
							</Col>
						</Row>
                        <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Substrate</Label>
                                <input type="text" className="form-control" name="substrate" value={this.props.editSalesData.substrate} onChange={(e) => this.props.handle_changes(e.target.value,'editSalesData','substrate')} placeholder="Enter Substrate" />
                                <span id="err">{this.validator.message('Substrate', this.props.editSalesData.substrate, 'required')}</span>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label>Cap</label>
                                <Input type="text" className="form-control" name="cap" value={this.props.editSalesData.cap} onChange={(e) => this.props.handle_changes(e.target.value,'editSalesData','cap')} placeholder="Enter Cap" />
                                <span id="err">{this.validator.message('Cap', this.props.editSalesData.cap, 'required')}</span>
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <div className="form-group">
                                <Label>Quantity</Label>
                                <input type="number" className="form-control" name="quantity" value={this.props.editSalesData.quantity} onChange={(e) => this.props.handle_changes(e.target.value,'editSalesData','quantity')}  placeholder="Enter Quantity" />
                                <span id="err">{this.validator.message('Quantity', this.props.editSalesData.quantity, 'required|integer')}</span>
                            </div>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <Label className="control-label">Top Seal</Label>
                                <select className="form-control select2" name="top_seal" value={this.props.editSalesData.top_seal} onChange={(e) => this.props.handle_changes(e.target.value,'editSalesData','top_seal')}>
                                    <option>Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                                <span id="err">{this.validator.message('Top seal', this.props.editSalesData.top_seal, 'required')}</span>
                            </FormGroup>
                        </Col>

                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="control-label">Special Instructions</Label>
                                    <Input type="textarea" name="special_instruction" value={this.props.editSalesData.special_instruction}  onChange={(e) => this.props.handle_changes(e.target.value,'editSalesData','special_instruction')} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="control-label">Additional Details</Label>
                                    <Input type="textarea" name="add_details" value={this.props.editSalesData.description}  onChange={(e) => this.props.handle_changes(e.target.value,'editSalesData','description')} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <label className="control-label">Dispatch Date</label><br></br>
                            <DatePicker
                                className="form-control"
                                name="dispatch_date"
                                selected={new Date(this.props.editSalesData.dispatch_date)}
                                onChange={(e) => this.props.handle_changes(e,'editSalesData','dispatch_date')}
                                dateFormat = "yyyy-MM-dd"
                            />
                        <span id="err">{this.validator.message('Dispatch Date', this.props.editSalesData.dispatch_date, 'required')}</span>
                        </FormGroup>

                        <ModalFooter>
                            <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.props.editModal()}>Cancel</Button>{' '}
                            <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Submit</Button>
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
    }
}

const mapActionToProps = dispatch => {
    return{
        editModal : (salesData) => dispatch({type : 'editModal'}),
        handle_changes : (value,parent_state,child_state) => dispatch({type : 'handle_changes',value:value,parent_state:parent_state,child_state:child_state}),
        setDesc : (desc) => dispatch({type:'setDesc' , desc :desc})
    }
}

export default connect(mapStateToProps , mapActionToProps)(EditSalesOrder);
