import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import './Leftsidebar.css';
import * as $ from 'jquery';
class LeftsidebaSales extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Tab: '', SubTab: '', MoreTab: ''
        };
    }
    setActiveTab = (tab,subtab,moretab, e) => {
      $('.waves-effect').removeClass('active');
      $('.submenu li').removeClass('active');
        // console.log(tab+"---"+subtab+"---"+moretab);

        this.setState({Tab: tab,SubTab: subtab,MoreTab: moretab});
    }

    render() {
        return (
           <div className="left side-menu">
              <div className="slimscroll-menu remove-scroll" id="remove-scroll">
                  <div id="sidebar-menu">
                       <ul className="metismenu" id="side-menu">
                           <li>
                               <Link to='/dashboard' title="Main Dashboard" className={this.state.Tab=='dashboard' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'dashboard', '', '')}>
                               <i className="mdi mdi-view-dashboard"></i> <span> Main Dashboard </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/salesOrder' title="Sales Orders"  className={this.state.Tab=='SalesOrder' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'SalesOrder', '', '')}>
                               <i className="mdi mdi-cash-usd"></i><span> Sales Orders </span>
                               </Link>
                           </li>
                       </ul>
                  </div>
                  <div className="clearfix"></div>
              </div>
            </div>

        );
    }
}


export default LeftsidebaSales;
