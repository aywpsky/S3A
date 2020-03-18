import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import './Leftsidebar.css';
import * as $ from 'jquery';
class LeftsidebarWareHouse extends Component {

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
                               <Link to='/jobsheet' title="Ware House" className={this.state.Tab=='jobsheet' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'jobsheet', '', '')}>
                               <i className="mdi mdi-store"></i><span> JobSheets </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/request' title="Ware House" className={this.state.Tab=='request' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'request', '', '')}>
                               <i className="mdi mdi-store"></i><span> Requests </span>
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


export default LeftsidebarWareHouse;
