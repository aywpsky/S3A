import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Modal , ModalHeader , ModalBody , ModalFooter , Row, Col , FormGroup , Label , Input , Form , Button} from 'reactstrap';
import DatePicker from "react-datepicker";
import SimpleReactValidator from 'simple-react-validator';
import Alertify from 'alertifyjs';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import Customers from './Customers';

const initalState = {
    addMore : {
		form:[
			[{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]
		]
	},
	dispatch_date : [new Date()],
	description : '',
	// materials : [
	// 	[
	// 		{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''},
	// 		{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''},
	// 	]
	// ]
}

class AddSalesOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectvalue       : false,
            customer_data     : [],
            customer_company  : [],
            customer_id       : [] ,
            supp_req         : '',
        }
        this.state = initalState;
        this.validator = new SimpleReactValidator();
    }

    reset = () => {
        this.setState(initalState);
    }

    async componentDidMount (){
		Alertify.defaults = Config.AlertConfig
		const {addMore} = this.state;
		let temp_form = new Array();
         this.GetSupplier();
		// await this.setState({addMore : temp_form});
	}

    submit = async(form) => {
        form.preventDefault();

        console.log(this.state)
        if (this.validator.allValid()) {
             const {customer_id }   = this.state;
            let url = Config.base_url + 'sales/CreateSalesOrder',
            formData = new FormData(form.target);
             formData.append('company' , customer_id);
            // formData.append('dispatch_date', Helper.formatDate(this.props.date));
            const response = await axios.post(url, formData);
            if (response.data.status == 'success') {
                Alertify.success(response.data.msg);
                this.props.updateTable();
                this.props.toggle();
                this.reset();
            } else {
                Alertify.success(response.data.msg);

            }
             this.GetSupplier();
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    AddMore = () => {
        const {addMore} = this.state;
		addMore.form.push([{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]);

		this.setState({addMore});
    }

    AddMoreMaterial = (index) => {
		const {addMore} = this.state;
		addMore.form[index].push({'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''});
		this.setState({addMore});
    }

	handle_changes(parent_index,child_index,name,value){
		const {addMore} = this.state;
		addMore.form[parent_index][child_index][name] = value;
		this.setState({addMore});
	}

    Splice = (parent_index) => {
        const { addMore , dispatch_date } = this.state;
		addMore.form.splice(parent_index , 1);
		this.setState({addMore});
		this.props.RemoveDataByIdx(parent_index);
	}
    GetSupplier = async() => {
        let url = Config.base_url + 'sales/customerlist';
        let response = await axios.get(url);
        let temp_data = [];
        console.log(response.data.status);
        if (response.data.status == 'success') {

            response.data.list.map((data , idx) => {
                let Options = {
                    value : data.cust_id,
                    label : data.company
                }
                temp_data.push(Options);
            });

            await this.setState({Options : temp_data});
        }

    }
    handleSelectChange = (newValue , actionMeta) => {
       var value = [];
       var label = [];

       // if (newValue != null) {
       //     console.log( newValue.value)
       //     for (var i = 0, l = newValue.length; i < l; i++) {
       //         console.log(newValue)
       //           value.push(newValue[i].value);
       //           label.push(newValue[i].label);
       //      }
       // }

       this.state.customer_id = (newValue.value ? newValue.value : false);
       this.state.customer_company = (newValue.label ? newValue.label : false);
       this.setState({customer_data: newValue})

       if (this.state.customer_id == false)
           this.setState({supp_req: 'This field is required.'})
       else
           this.setState({supp_req : ''});
    }

    SpliceMaterial = (parent_idx , child_index) => {
		const {addMore} = this.state;
		addMore.form[parent_idx].splice(child_index , 1);
		this.setState({addMore});
	}

    setDispatch = (date , idx) => {
        const {dispatch_date} = this.state;
        let temp = dispatch_date;
        temp[idx] = date;
    	this.setState({
            dispatch_date  : temp
    	})
    }

    render(){
		return(
            <Modal isOpen={this.props.modalOpen} className="modal-lg" toggle={() => this.props.toggle()}>
                <ModalHeader toggle={() => this.props.toggle()} >Add Job Order Form</ModalHeader>
                <ModalBody>
                <Form onSubmit= {(e) => this.submit(e)}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="withClose">Customer</Label>
                                {this.state.selectvalue ?(
                                <CreatableSelect
                                    isClearable
                                    onChange      = {this.handleSelectChange}
                                    options       = {this.state.Options}
                                    value         = {this.state.customer_data}
                                  />
                               ):(
                                  <CreatableSelect
                                     isClearable
                                     onChange     = {this.handleSelectChange}
                                     options      = {this.state.Options}
                                   />
                                )}
                                 <span id="err">{this.validator.message('customer', this.state.customer_data, 'required')}</span>
                            </FormGroup>
                        </Col>
					</Row>
					<Row>
						<Col md={12}>
							<FormGroup>
								<Label className="control-label">Description</Label>
							</FormGroup>
							<Input type="textarea" name="description" value={this.state.description} onChange={(e) => this.setState({description : e.target.value}) } />
							<span id="err">{this.validator.message('Description', this.state.description, 'required')}</span>
						</Col>
					</Row>
					<hr/>
                {this.state.addMore.form.map((val , idx) => {
					return(
                    	<div key={idx} class={idx}>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label className="close_production">
                                            Job
                                            {(idx > 0) ? <button onClick={() => this.Splice(idx)} type="button" class="addMoreClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
                                        </Label>

                                        <Input type="text" className="form-control" name="salesOrder_job[]" value={this.props.salesOrder_job[idx]} onChange={(e) => this.props.setJob(e , idx) } placeholder="Enter Job Name" />
                                        <span id="err">{this.validator.message('Job Name', this.props.salesOrder_job[idx], 'required')}</span>
                                    </FormGroup>
                                </Col>
                            </Row>

                            {val.map((val2 , idx2) => {
								return(
									<Row className="addMoreMats">
										<Col md={3}>
				                            <FormGroup>
				                                <Label>Substrate</Label>
				                                <input type="text" className="form-control" name={"substrate["+idx+"]["+idx2+"]"} value={val2.substrate} onChange={(value) => this.handle_changes(idx,idx2,'substrate',value.target.value) } placeholder="Enter Substrate" />
				                                <span id="err">{this.validator.message('Substrate', val2.substrate, 'required')}</span>
				                            </FormGroup>
				                       	</Col>
										<Col md={3}>
											<FormGroup>
												<label>Cap</label>
												<Input type="text" className="form-control" name={"cap["+idx+"]["+idx2+"]"} value={val2.cap} onChange={(value) => this.handle_changes(idx , idx2,'cap',value.target.value) } placeholder="Enter Cap" />
												<span id="err">{this.validator.message('Cap', val2.cap, 'required')}</span>
											</FormGroup>
										</Col>
										<Col md={3}>
											<div className="form-group">
												<Label>Quantity</Label>
												<input type="number" className="form-control" name={"quantity["+idx+"]["+idx2+"]"} value={val2.quantity} onChange={(value) => this.handle_changes(idx , idx2,'quantity',value.target.value) }  placeholder="Enter Quantity" />
												<span id="err">{this.validator.message('quantity', val2.quantity, 'required|integer')}</span>
											</div>
										</Col>
										<Col md={3}>
											<FormGroup>
												<Label className="control-label">
													Top Seal
													{(idx2 > 0) ? <button onClick={() => this.SpliceMaterial(idx , idx2)} type="button" class="addMoreClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
												</Label>
												<select className="form-control select2" name={"topSeal["+idx+"]["+idx2+"]"} value={val2.topSeal} onChange={(value) => this.handle_changes(idx , idx2,'topSeal',value.target.value)} >
													<option>Select</option>
													<option value="1">Yes</option>
													<option value="0">No</option>
												</select>
												<span id="err">{this.validator.message('Top seal', val2.topSeal, 'required')}</span>
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
                                        <Input type="textarea" name="special_inc[]" value={this.props.special_inc[idx]} onChange={(e) => this.props.setSpecialInx(e, idx) } />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="control-label">Additional Details</Label>
                                        <Input type="textarea" name="add_details[]" value={this.props.add_details[idx]} onChange={(e) => this.props.setAdditionalDetails(e , idx) } />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <label className="control-label">Dispatch Date</label><br></br>
                                <DatePicker
                                    className="form-control"
                                    name="dispatch_date[]"
                                    selected={this.state.dispatch_date[idx]}
                                    onChange={(date) => this.setDispatch(date , idx) }
                                    dateFormat = "yyyy-MM-dd"
                                />
                            <span id="err">{this.validator.message('Dispatch Date', this.state.dispatch_date[idx], 'required')}</span>
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
                        <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.props.toggle()}>Cancel</Button>{' '}
                        <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Submit</Button>
                    </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        modalOpen : state.salesReducers.modalOpen,
        addMoreFields : state.salesReducers.addMoreFields,
        salesOrder_job : state.salesReducers.salesOrder_job,
        substrate : state.salesReducers.substrate,
        cap : state.salesReducers.cap,
        quantity : state.salesReducers.quantity,
        topSeal : state.salesReducers.topSeal,
        special_inc : state.salesReducers.special_inc,
        add_details : state.salesReducers.add_details,
        materials : state.salesReducers.materials,
    }
};

const mapActionToProps = dispatch => {
    return{
        toggle : () => dispatch({type : 'toggleModal'}),
        setJob : (e , idx) => dispatch({type : 'setJob' , e : e , idx : idx}),
        setSubstrate : (e , idx) => dispatch({type : 'setSubstrate' , e : e , idx : idx}),
        setCap : (e , idx) => dispatch({type : 'setCap' , e : e , idx : idx}),
        setQty : (e , idx) => dispatch({type : 'setQty' , e : e , idx : idx}),
        setTopSeal : (e , idx) => dispatch({type : 'setTopSeal' , e : e , idx : idx}),
        setSpecialInx : (e , idx) => dispatch({type : 'setSpecialInx' , e : e , idx : idx}),
        setAdditionalDetails : (e , idx) => dispatch({type : 'setAdditionalDetails' , e : e , idx : idx}),
        RemoveDataByIdx : (idx) => dispatch({type : 'RemoveDataByIdx' , idx : idx}),
        Push : () => dispatch({type : 'Push'}),
    }
}
export default connect(mapStateToProps,mapActionToProps)(AddSalesOrder);
