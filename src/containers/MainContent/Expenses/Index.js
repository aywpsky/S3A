import React, { Component, Suspense } from 'react';
import AUX from '../../../hoc/Aux_';
import { TabPane, Nav, NavItem, NavLink, TabContent, Label, Input } from "reactstrap";
import classnames from 'classnames';
import GetJobList from './JobOrderExpenses/GetJobOrderList';
import ActualCost from './ActualCost/ActualCost';
import PCAddModal from './ProjectedCost/AddModal';
import ProjectedCost from './ProjectedCost/ProjectedCost';
import ACAddModal from './ActualCost/AddModal';
import DatePicker from 'react-datepicker';

import Moment from 'moment';
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

class Index extends Component {
    constructor(props) {
        super(props);
        let newDate = new Date()
        this.state = {
            activeTab: '1', page_title: '',
            monthOf: new Date(),
            PCmodalOpen: false,
            ACmodalOpen: false,
        }

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    InputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    triggerChild(){
        return(
            this.refs.first_child.GetRequestList(this.state.monthOf)
        );
    }
    triggerLastChild(){
        return(
            this.refs.last_child.triggerChild(this.state.monthOf)
        );
    }
    triggerSecondChild(){
        return(
            this.refs.child.GetRequestList(this.state.monthOf)
        );
    }

    handleChange = date => {
       var current_date = Moment(date.toLocaleDateString('en-US', DATE_OPTIONS)).format('Y-MM')
       this.setState({
         monthOf: date
       });
          this.refs.last_child.GetRequestList(current_date)
          this.refs.first_child.GetRequestList(current_date)
          this.refs.child.GetRequestList(current_date)
    };


    toggleModal(e) {
        if (e == 2) {
            this.setState({
                PCmodalOpen: !this.state.PCmodalOpen,
            })
        } else {
            this.setState({
                ACmodalOpen: !this.state.ACmodalOpen,
            })
        }
    }

    render() {

        return (
            <AUX>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">

                            <div className="col-sm-3">
                                <div className="page-title-box">
                                    <h4 className="page-title">Expenses </h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active">
                                            All Expenses listed here
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="form-group monthOf">
                                    <Label className="col-sm-4">Month of: </Label>
                                    <div className="col-sm-8">
                                        <DatePicker selected={this.state.monthOf} onChange={(date) => this.handleChange(date)} dateFormat="MMMM" showMonthYearPicker />

                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="page-btn">
                                    {this.state.activeTab > 1 ? <button type="button" className="btn btn-success real-btn clicker btn btn-secondary daily" onClick={() => this.state.activeTab == 2 ? this.toggleModal('2') : this.toggleModal('3')}>Add</button> : ''}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} >
                            Job Order
                          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }} >
                            Projected Cost
                          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }} >
                            Actual Cost
                          </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>

                    <TabPane tabId="1">
                        <Suspense fallback={<div>Loading...</div>}>
                              <GetJobList ref="last_child" monthData={this.state.monthOf}/>
                        </Suspense>
                    </TabPane>

                    <TabPane tabId="2">
                        <Suspense fallback={<div>Loading...</div>}>
                            <ProjectedCost  ref="first_child" monthData={this.state.monthOf}/>
                        </Suspense>
                    </TabPane>

                    <TabPane tabId="3">
                        <Suspense fallback={<div>Loading...</div>}>
                            <ActualCost ref="child" monthData={this.state.monthOf}/>
                        </Suspense>
                    </TabPane>

                </TabContent>

                <PCAddModal
                    PCmodalOpen={this.state.PCmodalOpen}
                    toggle={() => this.toggleModal(2)}
                    refresh={() => this.triggerChild()}
                />
                <ACAddModal
                    ACmodalOpen={this.state.ACmodalOpen}
                    toggle={() => this.toggleModal(3)}
                    refresh={() => this.triggerSecondChild()}
                />

            </AUX>

        );

    }
}

export default Index;
