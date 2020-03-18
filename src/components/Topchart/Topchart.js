
import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import {Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col , Button} from 'reactstrap';
import Helper from '../../config/Helper';
import Config from '../../config/Config';
import axios from 'axios';
import Alertify from 'alertifyjs';
import $ from 'jquery';

import SimpleReactValidator from 'simple-react-validator';

function LogOut(){
    localStorage.clear();
    if (Config.isProduction()) {
        window.location.href = Config.site_url;
    }else{
        window.location.href="http://localhost:3000/";
    }
}



class topchart extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false,
            curr_password : '',
            new_password : '',
            error: '',
            confirm_password : '',
            notifications : []
        }
        Alertify.defaults = Config.AlertConfig;
        this.ToggleModal = this.ToggleModal.bind(this);
        this.Changepassword = this.Changepassword.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.validator = new SimpleReactValidator();
    }

    componentDidMount(){
       this.notification();
    }


    notification = async() => {
        let response_limit;
        let url = Config.base_url + 'api/getAllInventory';
        response_limit = await axios.post(url ,"");
        let response_raw;
        let url_limit = Config.base_url + 'api/getRawLimit';
        response_raw = await axios.post(url_limit ,"");
        let x = [];
        response_raw.data.map((key, index)=>  {
            response_limit.data.map((key1, index1)=>  {
                if (key1.raw_id == key.raw_id) {
                    if (parseInt(key1.Total) < parseInt(key.raw_limit)) {
                        let data = {
                            raw_name: key.material_name,
                            msg     : "Running Out Of Stock"
                        }
                        x.push(data)
                    }
                }
            })
        });
        this.setState({notifications: x});
    }


    ToggleModal(){
        this.setState({isModalOpen : !this.state.isModalOpen})
    }

    async inputChange(e){
        await this.setState({
            [e.target.name] : e.target.value
        });
    }

    async Changepassword(e){
        e.preventDefault();
        if ( this.validator.allValid() ) {
            let user_id = Helper.getUserDetail('user_id');
            let url = Config.base_url + 'login/Changepassword/' + user_id;
            const formData = new FormData(e.target);
            const response = await axios.post(url , formData);
                if (response.data.success) {
                    Alertify.success(response.data.success);
                    this.forceUpdate();
                    this.setState({isModalOpen : false , new_password :'' , confirm_password : '' , curr_password : ''});
                }else{
                    Alertify.success(response.data.err);
                }
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render(){
        return(
            <div>
                <div className="topbar">
                            <div className="topbar-left">
                                <Link to="/" className="logo">
                                    <span>
                                        <img src="assets/images/logo-light.png" alt="" height="18" />
                                    </span>
                                    <i>
                                        <img src="assets/images/logo-sm.png" alt="" height="22" />
                                    </i>
                                </Link>
                            </div>
                            <nav className="navbar-custom">

                                <ul className="navbar-right d-flex list-inline float-right mb-0">
                                {/*
                                    <li className="dropdown notification-list" >
                                        <Link  className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" to="/" role="button" aria-haspopup="false" aria-expanded="false">
                                            <i className="ti-bell noti-icon"></i>
                                            <span className="badge badge-pill badge-danger noti-icon-badge">{this.state.notifications.length}</span>
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg">
                                            <h6 className="dropdown-item-text">
                                                Notifications
                                            </h6>
                                            <div className=" slimscroll notification-item-list">
                                                {
                                                    this.state.notifications.map((key, index)=>  {
                                                    return (<div className="dropdown-item notify-item active">
                                                        <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline"></i></div>
                                                        <p className="notify-details">{key.raw_name}<span className="text-muted">{key.msg}</span></p>
                                                    </div>)
                                                })
                                                }
                                            </div>

                                            <Link to="javascript:void(0);" className="dropdown-item text-center text-primary">
                                                 <i className="fi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </li>    
                                */}

                                    <li className="dropdown notification-list">
                                        <div className="dropdown notification-list nav-pro-img">
                                            <button className="btn btn-link dropdown-toggle nav-link arrow-none waves-effect nav-user" data-toggle="dropdown"   aria-haspopup="false" aria-expanded="false">
                                                <img src="assets/images/users/user-4.jpg" alt="user" className="rounded-circle" />
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">

                                                <button className="btn btn-link dropdown-item" onClick={this.ToggleModal}><i className="mdi mdi-account-circle m-r-5"></i> Change Password</button>
                                                <div className="dropdown-divider"></div>
                                                <button className="btn btn-link dropdown-item text-danger" onClick={LogOut}><i className="mdi mdi-power text-danger"></i> Logout</button>
                                            </div>
                                        </div>
                                    </li>

                                </ul>

                                <ul className="list-inline menu-left mb-0">
                                    <li className="float-left">
                                        <button className="button-menu-mobile open-left waves-effect">
                                            <i className="dripicons-menu"></i>
                                        </button>
                                    </li>
                                </ul>

                            </nav>

                        </div>
                        {/*Change password modal*/}
                        <Modal isOpen={this.state.isModalOpen} toggle={this.ToggleModal}>
                            <ModalHeader toggle={this.ToggleModal}>Change Password</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.Changepassword} method="POST">
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label>Current Password</Label>
                                                <Input type="password" name="curr_password" value={this.state.curr_password} onChange={this.inputChange}/>
                                                <span id="err"> {this.validator.message('Current Password', this.state.curr_password, 'required')} </span>
                                            </FormGroup>
                                        </Col>

                                        <Col md={12}>
                                            <FormGroup>
                                                <Label>New Password</Label>
                                                <Input type="password"name="new_password" value={this.state.new_password} onChange={this.inputChange}/>
                                                <span id="err"> {this.validator.message('new password', this.state.new_password, 'required|min:6')} </span>
                                            </FormGroup>
                                        </Col>

                                        <Col md={12}>
                                            <FormGroup>
                                                <Label>Confirm Password</Label>
                                                <Input type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.inputChange}/>
                                                <span id="err">{this.validator.message('confirm_password', this.state.confirm_password, `required|in:${this.state.new_password}`, {messages: {in: 'Password did not match.'}}) }</span>
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <ModalFooter>
                                        <Button type="button" className="btn btn-secondary waves-effect" onClick={this.ToggleModal}>Close</Button>{' '}
                                        <Button type="submit" className="btn btn-primary waves-effect">Save Changes</Button>
                                    </ModalFooter>
                                </Form>
                            </ModalBody>
                        </Modal>
            </div>
        )
    }
}

export default topchart;
