
import React, { Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';
import { Link } from 'react-router-dom';
class Register extends Component {
      
    componentDidMount() 
    {
        if(this.props.loginpage === false)
        {
          this.props.UpdateLogin();
        }
        
        window.onpopstate  = (e) => {
          this.props.UpdateLoginAgain();
        }
    }

    render() {
   
        return (
            <AUX>
                <div className="wrapper-page">
            <div className="card">
                <div className="card-body">

                    <h3 className="text-center m-0">
                        <Link onClick={()=> this.props.UpdateLoginAgain() } to="/" className="logo logo-admin"><img src="assets/images/logo.png" height="30" alt="logo" /></Link>
                    </h3>

                    <div className="p-3">
                        <h4 className="text-muted font-18 m-b-5 text-center">Free Register</h4>
                        <p className="text-muted text-center">Get your free fonik account now.</p>

                        <form className="form-horizontal m-t-30" action="index">

                            <div className="form-group">
                                <label htmlFor="useremail">Email</label>
                                <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="userpassword">Password</label>
                                <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                            </div>

                            <div className="form-group row m-t-20">
                                <div className="col-12 text-right">
                                    <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
                                </div>
                            </div>

                            <div className="form-group m-t-10 mb-0 row">
                                <div className="col-12 m-t-20">
                                    <p className="font-14 text-muted mb-0">By registering you agree to the Lexa <a href="#" className="text-primary">Terms of Use</a></p>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

           <div className="m-t-40 text-center">
                <p>Already have an account ? <Link to="login" class="text-primary"> Login </Link> </p>
                <p>© {new Date().getFullYear()} Lexa. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Register);

