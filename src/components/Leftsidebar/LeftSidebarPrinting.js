import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import './Leftsidebar.css';
import * as $ from 'jquery';
class LeftsidebarPrinting extends Component {

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
                               <Link to='/printing-department' title="Printing" className={this.state.Tab=='printing-department' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'printing-department', '', '')}>
                               <i className="mdi mdi-printer"></i><span> Printing </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/printing-request-material' title="Request Materials" className={this.state.Tab=='printing-request-material' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'printing-request-material', '', '')}>
                               <i className="ion-pull-request"></i><span> Request Mats. </span>
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


export default LeftsidebarPrinting;
