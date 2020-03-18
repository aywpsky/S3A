import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import './Leftsidebar.css';
import * as $ from 'jquery';
class LeftsidebarProduction extends Component {

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
                           {/*
                               <li>
                               <Link to='/production-department' title="Production" className={this.state.Tab=='production-department' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'production-department', '', '')}>
                               <i className="ion-gear-b"></i><span> Production </span>
                               </Link>
                               </li>
                            */}
                           <li>
                               <Link to='/production-job-order' title="Job Order list" className={this.state.Tab=='production-job-order' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'production-job-order', '', '')}>
                               <i className="ion-ios7-paper-outline"></i><span> Job Order </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/production-request-material' title="Request Materials" className={this.state.Tab=='production-request-material' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'production-request-material', '', '')}>
                               <i className="ion-gear-b"></i><span> Requested Mats. </span>
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


export default LeftsidebarProduction;
