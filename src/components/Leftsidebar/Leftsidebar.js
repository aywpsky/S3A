import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import './Leftsidebar.css';
import * as $ from 'jquery';
class leftsidebar extends Component {

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
                               <Link to='javascript:void(0);' title="Inventory" className={this.state.Tab=='inventory' ? 'waves-effect active': 'waves-effect'} >
                                  <i className="ti-home"></i><span> Inventory  <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span></span>
                               </Link>
                               <ul className="submenu">
                                    <li className={this.state.Tab == 'daily-inventory' ? 'active':''} onClick={this.setActiveTab.bind(this, 'daily-inventory','','')}><Link to="daily-inventory">Daily</Link></li>
                                    <li className={this.state.Tab == 'monthly-inventory' ? 'active':''} onClick={this.setActiveTab.bind(this, 'monthly-inventory','','')}><Link to="monthly-inventory">Monthly</Link></li>
                              </ul>
                           </li>

                           <li>
                              <Link to='/raw_material' title="Raw Materials" className={this.state.Tab=='raw_material' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'raw_material', '', '')}>
                              <i className="mdi mdi-buffer"></i><span> Raw Materials </span>
                              </Link>
                           </li>
                           <li>
                              <Link to='/purchase-order' title="Purchase Orders" className={this.state.Tab=='purchase-order' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'purchase-order', '', '')}>
                              <i className="fas fa-cart-plus"></i><span> Purchase Orders </span>
                              </Link>
                           </li>
                           <li>
                               <Link to='/salesOrder' title="Sales Orders"  className={this.state.Tab=='SalesOrder' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'SalesOrder', '', '')}>
                               <i className="mdi mdi-cash-usd"></i><span> Sales Orders </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/warehouse' title="Ware House" className={this.state.Tab=='warehouse' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'warehouse', '', '')}>
                               <i className="mdi mdi-store"></i><span> Warehouse </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/printing-department' title="Printing" className={this.state.Tab=='printing-department' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'printing-department', '', '')}>
                               <i className="mdi mdi-printer"></i><span> Printing </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/production-department' title="Production" className={this.state.Tab=='production-department' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'production-department', '', '')}>
                               <i className="ion-gear-b"></i><span> Production </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/expenses' title="Expenses" className={this.state.Tab=='expenses' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'expenses', '', '')}>
                               <i className="fas fa-wallet"></i><span> Expenses </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='javascript:void(0);' title="Inventory" className={this.state.Tab=='inventory' ? 'waves-effect active': 'waves-effect'} >
                                  <i className="ti-home"></i><span> Reports  <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span></span>
                               </Link>
                               <ul className="submenu">
                                    <li className={this.state.Tab == 'reports-customer-report' ? 'active':''} onClick={this.setActiveTab.bind(this, 'reports-customer-report','','')}><Link to="reports-customer-report">Customer</Link></li>
                                    <li className={this.state.Tab == 'reports-raw-report' ? 'active':''} onClick={this.setActiveTab.bind(this, 'reports-raw-report','','')}><Link to="reports-raw-report">Raw Materials</Link></li>
                                    <li className={this.state.Tab == 'reports-expenses' ? 'active':''} onClick={this.setActiveTab.bind(this, 'reports-expenses','','')}><Link to="reports-expenses">Expenses</Link></li>
                                    <li className={this.state.Tab == 'reports-sales-report' ? 'active':''} onClick={this.setActiveTab.bind(this, 'reports-sales-report','','')}><Link to="reports-sales-report">Sales Order</Link></li>
                              </ul>
                           </li>
                           <li>
                              <Link to='/users' title="Users" className={this.state.Tab=='users' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'users', '', '')}>
                              <i className="mdi mdi-account"></i><span> Users </span>
                              </Link>
                           </li>
                           <li>
                              <Link to='/customer' className={this.state.Tab=='customer' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'customer', '', '')}>
                              <i className="mdi mdi-account-multiple"></i><span> Customers </span>
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


export default leftsidebar;
