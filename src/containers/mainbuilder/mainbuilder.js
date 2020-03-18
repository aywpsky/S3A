import React , { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import Dashboard from '../MainContent/Dashboard/Dashboard';
// import Dashboard from '../MainContent/Dashboard/Dashboard2';
import RawMaterials from '../MainContent/RawMaterials/RawMaterials';
import Warehouse from '../MainContent/Warehouse/Warehouse';
import PurchaseOrder from '../MainContent/PurchaseOrder/PurchaseOrder';
import DailyInventory from '../MainContent/Inventory/DailyInventory';
import MonthlyInventory from '../MainContent/Inventory/MonthlyInventory';
import PrintingDepartment from '../MainContent/PrintingDepartment/Index';
import ProductionDepartment from '../MainContent/ProductionDepartment/Production';
import SalesOrder from '../MainContent/SalesOrder/SalesOrder';
import Users from '../MainContent/Users/Users';
import BlankPage from '../MainContent/Extras/Blankpage';
import Container from '../MainContent/Customer/Container';
import Expenses from '../MainContent/Expenses/Index';
import ProductionContainer from '../MainContent/ProductionDepartment/Container';
import Login from '../Auth/Login';
import Helper from '../../config/Helper';
import NotFound from '../Restrictions/NotFound';


// Warehouse USER IMPORTS
import WarehouseUser_dashboard from '../MainContent/Warehouse/Warehouse';
import WarehouseUser_jobsheet from '../WarehouseManager/Jobsheet/Jobsheet';
import WarehouseUser_request from '../WarehouseManager/Request/Request';

// Reports
import CustomerReport from "../MainContent/Reports/CustomerReport";
import RawMaterialReport from "../MainContent/Reports/RawMaterialReport";
import ReportExpenses from "../MainContent/Reports/ReportExpenses";
import SalesReport from "../MainContent/Reports/SalesReport";

// Production
import Production from '../MainContent/ProductionDepartment/Production';
import RequestList from '../MainContent/ProductionDepartment/RequestList';

// Printing
import PrintingProduction from '../MainContent/PrintingDepartment/JobOrder';
import PrintingRequestList from '../MainContent/PrintingDepartment/RequestList';

class mainbuilder extends Component{

    render(){
        switch (parseInt(Helper.getUserDetail('user_type'))) {
            case 1:
                return(
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/raw_material" component={RawMaterials} />
                        <Route path="/warehouse" component={Warehouse} />
                        <Route path="/purchase-order" component={PurchaseOrder} />
                        <Route path="/daily-inventory" component={DailyInventory} />
                        <Route path="/monthly-inventory" component={MonthlyInventory} />
                        <Route path="/printing-department" component={PrintingDepartment} />
                        <Route path="/production-department" component={ProductionContainer} />
                        <Route path="/salesOrder" component={SalesOrder} />
                        <Route path="/reports-customer-report" component={CustomerReport} />
                        <Route path="/reports-raw-report" component={RawMaterialReport} />
                        <Route path="/reports-expenses" component={ReportExpenses} />
                        <Route path="/reports-sales-report" component={SalesReport} />
                        <Route path="/users" component={Users} />
                        <Route path="/customer" component={Container} />
                        <Route path="/expenses" component={Expenses} />
                        <Route path="/blank_page" component={BlankPage} />
                        <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login } />
                    </Switch>
                );
                break;

            case 2:
                return(
                    <Switch>
                    <Route path="/warehouse" component={Warehouse} />
                    <Route path="/jobsheet" component={WarehouseUser_jobsheet} />
                    <Route path="/request" component={WarehouseUser_request} />
                    <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login } />
                    </Switch>
                )
                break;
            case 3:
                return(
                    <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/production-job-order" component={Production} />
                    <Route path="/production-request-material" component={RequestList} />
                    <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login } />
                    </Switch>
                )
                break;
            case 4:
                return(
                    <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/printing-department" component={PrintingProduction} />
                    <Route path="/printing-request-material" component={PrintingRequestList} />
                    <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login } />
                    </Switch>
                )
                break;
            case 5:
                return(
                    <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/salesOrder" component={SalesOrder} />
                    <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login } />
                    </Switch>
                )
                break;
            default:

        }

    }
}

export default mainbuilder;
