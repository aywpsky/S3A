import React , {Component} from "react";
import AUX from '../../../hoc/Aux_';
import { Form , Input , FormGroup , Label , Button , Col , Row , ModalFooter} from "reactstrap";
import SimpleReactValidator from 'simple-react-validator';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import axios from 'axios';
import Alertify from 'alertifyjs';

class AddCustomer extends Component {
    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            name : '',
            company : '',
            email : '',
            contact : ''
        }
        this.InputChange = this.InputChange.bind(this);
        this.SubmitCustomerForm = this.SubmitCustomerForm.bind(this);
        this.chkMount = this.chkMount.bind(this);
        this.initialState = this.initialState.bind(this);


    }
    componentDidMount(){

        Alertify.defaults = Config.AlertConfig
        this.chkMount();
    }

    initialState(){
        this.setState({
            name : '',
            company : '',
            email : '',
            contact : '',
            limit : '',
            method : ''
        })
    }

    chkMount = () => {
        const {action , data } = this.props;

        if (action === 'Edit') {
            this.setState({
                cust_id : data.cust_id,
                name : data.name,
                company : data.company,
                email : data.email,
                contact : data.contact,
                limit : data.credit_limit,
                method : data.payment_method
            });
        }else{
            this.state = {};
        }
    }

    InputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });

    }

    async SubmitCustomerForm(e){
    e.preventDefault();

        if ( this.validator.allValid() ) {
            const {action} = this.props;

            let url = Config.base_url + 'customers/' + (action === 'Edit' ? 'EditCustomer' : 'createCustomers');

            let formData = new FormData(e.target);
                if (action === 'Edit') {
                    formData.append('cust_id' , this.state.cust_id);
                }

            const response = await axios.post(url , formData);

                if (response.data.success) {
                    Alertify.success(response.data.success);
                    this.props.getCustomerList();
                    this.initialState();
                }else{
                    Alertify.error(response.data.error);
                }

        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }


    render(){
        return(
            <AUX>
                <Form onSubmit={this.SubmitCustomerForm}>
                    <Row>
                        <Col md={12} sm={12}>
                            <FormGroup>
                            <Label>Name</Label>
                            <Input type="text" className="form-control" name="name" value = {this.state.name}  onChange={this.InputChange}/>
                            <span id="err">{this.validator.message('name', this.state.name, 'required')}</span>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} sm={12}>
                            <FormGroup>
                            <Label>Company</Label>
                            <Input type="text" className="form-control" name="company" value = {this.state.company}  onChange={this.InputChange}/>
                            <span id="err">{this.validator.message('company', this.state.company, 'required')}</span>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} sm={12}>
                            <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" className="form-control" name="email" value = {this.state.email} onChange={this.InputChange}/>
                            <span id="err">{this.validator.message('email', this.state.email, 'required')}</span>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} sm={12}>
                            <FormGroup>
                            <Label>Credit Limit</Label>
                            <Input type="text" className="form-control" name="limit" value = {this.state.limit} onChange={this.InputChange}/>
                            <span id="err">{this.validator.message('credit limit', this.state.limit, 'required')}</span>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} sm={12}>
                            <FormGroup>
                            <Label>Payment Method</Label>
                            <Input type="text" className="form-control" name="method" value = {this.state.method} onChange={this.InputChange}/>
                            <span id="err">{this.validator.message('payment method', this.state.method, 'required')}</span>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} sm={12}>
                            <FormGroup>
                            <Label>Contact #</Label>
                            <Input type="text" className="form-control" name="contact" value = {this.state.contact} onChange={this.InputChange}/>
                            <span id="err">{this.validator.message('contact', this.state.contact, 'required|numeric')}</span>
                            </FormGroup>
                        </Col>
                    </Row>
                    <ModalFooter>
                        <Button className="btn btn-primary" type="submit">{this.props.action === 'Edit' ? 'Save Changes' : 'Save'}</Button>
                    </ModalFooter>
                </Form>
            </AUX>
        )
    }
}

export default AddCustomer;
