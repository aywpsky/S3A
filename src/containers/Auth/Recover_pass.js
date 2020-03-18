
import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';
import { Link } from 'react-router-dom';

class recover_pass extends Component{
    
    componentDidMount() {
        if(this.props.loginpage === false)
        {
          this.props.UpdateLogin();
        }
        window.onpopstate  = (e) => {
          this.props.UpdateLoginAgain();
        }
       }
       
    render(){
        return(
            <AUX>
                <div className="wrapper-page">

                    <div className="card">
                        <div className="card-body">

                            <h3 className="text-center m-0">
                                <Link onClick={()=> this.props.UpdateLoginAgain() } to="/" className="logo logo-admin"><img src="assets/images/logo.png" height="30" alt="logo" /></Link>
                            </h3>

                            <div className="p-3">
                                <h4 className="text-muted font-18 mb-3 text-center">Reset Password</h4>
                                <div className="alert alert-info" role="alert">
                                    Enter your Email and instructions will be sent to you!
                                </div>

                                <form className="form-horizontal m-t-30" action="index">

                                    <div className="form-group">
                                        <label htmlFor="useremail">Email</label>
                                        <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group row m-t-20">
                                        <div className="col-12 text-right">
                                            <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Reset</button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>

                <div className="m-t-40 text-center">
                    <p>Remember It ? <Link to ='/login' className="text-primary"> Sign In Here </Link> </p>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(recover_pass);

