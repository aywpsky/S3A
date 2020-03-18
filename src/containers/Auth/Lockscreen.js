
import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/action';

class lockscreen extends Component{
    
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
                        <Link to="/" onClick={()=> this.props.UpdateLoginAgain() } className="logo logo-admin"><img src="assets/images/logo.png" height="30" alt="logo" /></Link>
                    </h3>

                    <div className="p-3">
                        <h4 className="text-muted font-18 m-b-5 text-center">Locked</h4>
                        <p className="text-muted text-center">Hello Smith, enter your password to unlock the screen!</p>

                        <form className="form-horizontal m-t-30" action="index">

                            <div className="user-thumb text-center m-b-30">
                                <img src="assets/images/users/user-6.jpg" className="rounded-circle img-thumbnail" alt="thumbnail" />
                                <h6>Robert Smith</h6>
                            </div>

                            <div className="form-group">
                                <label htmlFor="userpassword">Password</label>
                                <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                            </div>

                            <div className="form-group row m-t-20">
                                <div className="col-12 text-right">
                                    <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Unlock</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

                <div className="m-t-40 text-center">
                    <p>Not you ? return <Link to="login" className=" text-primary"> Sign In </Link> </p>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(lockscreen);
