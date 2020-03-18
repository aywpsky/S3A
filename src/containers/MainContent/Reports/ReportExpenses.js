import React , {Component} from "react";
import PageTitle from '../../CustomComponents/PageTitle';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable} from 'mdbreact';
import {Card , CardBody , Col , Row , Button} from "reactstrap";
import { BallBeat } from 'react-pure-loaders';
import DatePicker from 'react-datepicker';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import Alertify from 'alertifyjs';
import axios from 'axios';
import qs from 'qs';

export default class ReportExpenses extends Component{
    constructor(props){
        super(props);
        this.state = {
            tableData : [],
            loading : true,
            startDate : new Date(),
            endDate : new Date(),
            filterloading : false
        }
    }
    componentDidMount(){
        Alertify.defaults = Config.AlertConfig;
        this.setState({loading : false});
        this.getExpense();
    }

    getExpense = () => {
        const url = Config.base_url + 'reports/getExpense';
        axios.get(url).then(res => {
            console.log(res);
        });
    }

    filter = () => {
        const { startDate , endDate } = this.state;
        const url = Config.base_url + 'reports/filterExpense';
        let data = {startDate : Helper.formatDate(startDate) , endDate : Helper.formatDate(endDate) };

        axios.post(url , qs.stringify(data)).then(res => {
            console.log(res);
        });
    }

    render(){
        const data = {
          columns: [
              { label: 'Account', field: 'account', sort: 'asc', width: 150 },
              { label: 'Category', field: 'category', sort: 'asc', width: 150 },
              { label: 'Amount', field: 'amount', sort: 'asc', width: 150 },
          ],
            rows :[]
        };
        if (this.state.loading) {
            return(
                <Row style={{margin: '100px 0 0 0'}}>
                    <Col md="12">
                        <BallBeat loading = 'true' color = '#EB3B5A'/>
                    </Col>
                </Row>
            );
        }else{
            return(
                <AUX>
                    <PageTitle title="Reports" subtitle="Monthly variable expense report are generated here." />
                    <div className="monthlyfilterReport">
                        <Row>
                            <Col md={2} xs={12} >
                                <label htmlFor="">Start Date</label>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={(date) => this.filter(date , this.state.endDate)}
                                    selectsStart
                                    dateFormat="MM/dd/yyyy"
                                    showMonthYearPicker
                                    />
                            </Col>

                            <Col md={2} xs={12} >
                                <label htmlFor="">End Date</label>
                                <DatePicker
                                    selected={this.state.endDate}
                                    startDate = {this.state.startDate}
                                    selectsEnd
                                    onChange={(date) => this.filter(this.state.startDate , date)}
                                    dateFormat="MM/dd/yyyy"
                                    showMonthYearPicker
                                    />
                            </Col>
                            <Col md={2} xs={12} className="gen_rep">
                                <button onClick={() => this.generate()} type="button" class="btn btn-primary btn btn-secondary reportbtn">Generate Report</button>
                            </Col>

                            <Col md={2} className={'gen_rep'}>
                                <BallBeat loading = {this.state.filterloading} color = '#EB3B5A'/>
                            </Col>
                        </Row>
                    </div>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={12}>
                                    <MDBDataTable
                                        responsive
                                        bordered
                                        hover
                                        data={data}
                                        />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </AUX>
            );
        }
    }
}
