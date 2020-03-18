import React, { Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';
import { Link } from 'react-router-dom';
import Config from '../../config/Config';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import SimpleReactValidator from 'simple-react-validator';
class login extends Component
{
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            username : '',
            password : '',
            isValid:''
        };

        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount() {

        if(this.props.loginpage === false)
        {
            this.props.UpdateLogin();
        }
            window.onpopstate  = (e) => {
             this.props.UpdateLoginAgain();
        }
       }
    
       inputChange(e){
           this.setState({ [e.target.name] : e.target.value });
       }

       SubmitForm = async(e) => {
            e.preventDefault();
            if(this.validator.allValid()){
                let url = Config.base_url + 'login/auth';
                const formData = new FormData(e.target),
                response = await axios.post(url , formData);

                if (response.data.success) {
                    response.data.user_data['isLoggedIn'] = true;
                    let encrypt = CryptoJS.AES.encrypt(JSON.stringify(response.data.user_data), 's3aManufacturing');
                    localStorage.setItem('data' , encrypt );
                        if( Config.isProduction() ){
                            window.location.href = Config.site_url + 'dashboard';
                        }else{
                            window.location.href="http://localhost:3000/dashboard";
                        }
                }else{
                    this.setState({isValid:response.data.err});
                }
            }else {
                this.validator.showMessages();
                this.forceUpdate();
            }

        }

    render() {
        return (
            <AUX>
                <div className="wrapper-page">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center m-0">
                                <Link to="/" onClick={()=> this.props.UpdateLoginAgain() } className="logo logo-admin"><img src="assets/images/logo.png" height="100" alt="logo" /></Link>
                            </h3>
                            <div className="p-3">
                              { /* <h4 className="text-muted font-18 m-b-5 text-center">{!this.props.is_reg ? 'Welcome Back !' : 'Free Register'}</h4>
                                <p className="text-muted text-center">{!this.props.is_reg ? 'Sign in to continue to Fonik.' : 'Get your free fonik account now.'}</p>*/}

                                {
                                    this.state.isValid ?

                                    <div className="alert alert-danger" role="alert">
                                        <strong>{ this.state.isValid }. </strong> Change a few things up and try submitting again.
                                    </div>

                                    :

                                    ''
                                }
                                <form className="form-horizontal m-t-30" method="post" onSubmit={this.SubmitForm}>

                                    {(this.props.is_reg) ?
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                                        </div>
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" value={this.state.username} onChange= {this.inputChange} />
                                        <span id="err">{this.validator.message('username',this.state.username, 'required')}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="userpassword">Password</label>
                                        <input type="password" className="form-control" id="userpassword" placeholder="Enter password" name="password" value={this.state.password} onChange= {this.inputChange} />
                                         <span id="err">{this.validator.message('password',this.state.password, 'required')}</span>
                                    </div>

                                    <div className="form-group row m-t-20">

                                        <div className="col-6">
                                            {(!this.props.is_reg) ?
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    {/* <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>*/}
                                                </div> : null}
                                        </div>
                                        <div className="col-6 text-right">
                                            <button className="btn btn-primary w-md waves-effect waves-light mt-5" type="submit">{!this.props.is_reg ? 'Log In' : 'Register'}</button>
                                        </div>
                                    </div>

                                    <div className="form-group m-t-10 mb-0 row">
                                        <div className="col-12 m-t-20">
                                            {/*(!this.props.is_reg) ?
                                                <button onClick={this.props.RecoverPass} className="text-muted btn btn-link"><i className="mdi mdi-lock"></i> Forgot your password?</button> : <p className="font-14 text-muted mb-0">By registering you agree to the Lexa <button className="text-primary btn btn-link">Terms of Use</button></p>*/}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="m-t-40 text-center">
                    {/*<p>Don't have an account ? <Link to="register" class="text-primary"> Signup Now </Link> </p>*/}
                        <p>© Copyright {new Date().getFullYear()} S3A Manufacturing. All Rights Reserved.</p>
                    </div>
                </div>
            </AUX>
        );
    }
}

const mapStatetoProps = state => {
    return {
        loginpage: state.ui_red.loginpage
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        UpdateLogin: () => dispatch({ type: actionTypes.LOGINPAGE, value: true }),
        UpdateLoginAgain: () => dispatch({ type: actionTypes.LOGINPAGE, value: false })
    };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(login);
