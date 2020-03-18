import React , {Component} from 'react';
import AUX from '../../../hoc/Aux_';
import Config from '../../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup , Label , Input  , Col , Row} from 'reactstrap';
import ListOfCompleted from "./ListOfCompleted";
import {connect} from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';

class AddCompleted extends Component {
    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            qty : '',
            isUpdate : false
        }
    }
    componentDidMount(){

        Alertify.defaults = Config.AlertConfig;
        // this.checkLstData();
        let me = this;
        setTimeout(function () {
            me.setState({
                qty : me.props.num_edit
            })
        }, 2000);

    }

    handleSubmit = async(e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            let {js_id} = this.props;
            let url = Config.base_url + 'production/submitFinish';
            let formdata = new FormData(e.target);
            formdata.append('js_id' , js_id);
            let response = await axios.post(url , formdata);
            if (response.data.status == 'ok') {
                Alertify.success('Successfully Added!');
                this.props.set_modal();
                this.props.fetchData();
            }else{
                Alertify.error('Error adding data!');
            }
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleEdit = async(e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            let url = Config.base_url + 'production/edit_finished';
            let formdata = new FormData(e.target);
            formdata.append('log_id' , this.props.log_id);
            formdata.append('js_id' , this.props.js_id);
            let res = await axios.post(url,formdata);
            if (res.data.status == 'ok') {
                Alertify.success('Successfully Updated!');
                this.props.set_modal();
                this.props.fetchData();
            }else{
                Alertify.error('Error Updating data!');
            }
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render(){

        return(
            <AUX>
                <Modal isOpen = {this.props.isModalOpen} toggle = {() => this.props.set_modal()} className="">
                    <ModalHeader toggle = {() => this.props.set_modal()}>Completed List</ModalHeader>
                    <Form onSubmit = {(e) => this.props.isEditable ? this.handleEdit(e) : this.handleSubmit(e)}>
                        <ModalBody>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Completed</Label>
                                        <Input name="finished_prod" placeholder="Enter data" value={this.props.num_edit} onChange = {(e) => this.props.set_num_edit(e.target.value)}/>
                                        <span id="err">{this.validator.message('Finished qty', this.props.num_edit, 'required|numeric')}</span>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Status</Label>
                                        <Input type="select" name="status" placeholder="Status">
                                            <option value="1">In-Progress</option>
                                            <option value="2">On Hold</option>
                                            <option value="3">Off-Track</option>
                                            <option value="4">Completed</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4} className="completed-col">
                                    <FormGroup>
                                        <Button style={{width : '100%'}} type="submit" color="primary" className="btn btn-secondary waves-effect completed-btn" >{this.props.isEditable ? 'Update' : 'Add'}</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                        <ListOfCompleted />

                        </ModalBody>

                    </Form>
                </Modal>
            </AUX>
        );
    }
}

const mapStateToProps = state => {
    return {
        isModalOpen:state.appreducers.isModalOpen,
        js_id:state.appreducers.js_id,
        isEditable:state.appreducers.isEditable,
        num_edit:state.appreducers.num_edit,
        log_id:state.appreducers.log_id
    }
}

const mapActionToProps = dispatch => {
    return {
        set_modal: () => dispatch({type:'OPEN_MODAL'}),
        set_isUpdate : (val) => dispatch({type : 'EDIT_FINISHED' , value : val}),
        set_num_edit: (num) => dispatch({type:'CHANGE_EDIT',value:num})
    }
}

export default connect(mapStateToProps,mapActionToProps)(AddCompleted);
