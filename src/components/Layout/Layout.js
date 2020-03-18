import React from 'react';
import Aux from '../../hoc/Aux_';
import Topchart from '../Topchart/Topchart';
import Leftsidebar from '../Leftsidebar/Leftsidebar';
import LeftsidebarWareHouse from '../Leftsidebar/LeftSidebarWarehouse';
import LeftsidebarProduction from '../Leftsidebar/LeftSidebarProduction';
import LeftsidebarPrinting from '../Leftsidebar/LeftSidebarPrinting';
import LeftsidebarSales from '../Leftsidebar/LeftSidebarSales';

import Helper from "../../config/Helper";

import Footer from '../Footer/Footer';
import Login from '../../containers/Auth/Login';
const layout = ( props ) => {
    if (props.isLoggedIn) {
        let type = parseInt(Helper.getUserDetail('user_type'));        
        return(
            <Aux>
                {!props.isloginpage ?
                    <div id ="wrapper">
                        {props.topbar ? <Topchart /> : null}
                        {props.sidebar ? (type == 2)  ? <LeftsidebarWareHouse /> :(type == 3) ? <LeftsidebarProduction/> :(type == 4) ? <LeftsidebarPrinting/> :(type == 5) ? <LeftsidebarSales/> : <Leftsidebar /> : null}
                        <main>
                            <div className="content-page">
                                <div className="content">
                                    <div className="container-fluid">
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </main>
                        {props.footer ?  <Footer /> : null}
                    </div>:props.children}
                </Aux>
            );
    }else {
        return <Login />
    }
}
export default layout;
