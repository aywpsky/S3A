import React , {Component} from "react";
import PageTitle from '../../CustomComponents/PageTitle';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable} from 'mdbreact';
import {Card , CardBody , Col , Row , Button} from "reactstrap";
import axios from "axios";
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import DatePicker from 'react-datepicker';
import qs from 'qs';
import Alertify from 'alertifyjs';
import { BallBeat } from 'react-pure-loaders';
export default class SalesReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            tableData : [],
            startDate : new Date(),
            endDate  : new Date(),
            filterloading : false
        }
    }
    componentDidMount(){
        Alertify.defaults = Config.AlertConfig;
        this.getData();
    }
    getData = async() => {
        const url = Config.base_url + 'sales/getSalesOrder';
        const res = await axios.get(url);

        let temp = [];

        if (res.data.status == 'ok') {
            const {list} = res.data;
            list.map((val) => {
                let x  = {
                    sales_id: "SOID" + val.id.padStart(5, "0"),
                    job: val.job,
                    cust: val.company,
                    substrate: val.substrate,
                    cap: parseInt(val.cap).toLocaleString('en'),
                    qty: parseInt(val.quantity).toLocaleString('en'),
                    top_seal: (val.top_seal == 1) ? "YES" : "NO",
                    dispatch_date: val.dispatch_date,
                }
                temp.push(x);
            });
        }

        this.setState({tableData : temp , loading: false});
    }

    filter = async(date) => {
        this.setState({startDate : date , filterloading : true})
        let dates = Helper.formatDate(date);
        const url = Config.base_url + 'reports/filterlist';
        const res = await axios.post(url , qs.stringify({date : dates , table : 'tbl_sales_order_details'}));

        let temp = [];
        if (res.data.msg === 'nodata') {
            Alertify.warning('No Data found.');
        }else {
            res.data.data.map((val) => {
                    let x  = {
                        sales_id: "SOID" + val.id.padStart(5, "0"),
                        job: val.job,
                        cust: val.customer,
                        substrate: val.substrate,
                        cap: parseInt(val.cap).toLocaleString('en'),
                        qty: parseInt(val.quantity).toLocaleString('en'),
                        top_seal: (val.top_seal == 1) ? "YES" : "NO",
                        dispatch_date: val.dispatch_date,
                    }
                    temp.push(x);
            });
        }

        this.setState({tableData : temp , filterloading : false});
    }

    generate = async() => {
        let Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const {startDate , endDate} = this.state;
        let month = Helper.formatDate(startDate);
        const url = Config.base_url + 'reports/getSalesOrderListReport';
        let data = {startDate : Helper.formatDate(startDate) , endDate :  Helper.formatDate(endDate)  };

        axios({
              url: url,
              method: 'POST',
              data : qs.stringify(data),
              responseType: 'blob', // important
            }).then((response) => {
                let month_rage = new Date( month );
                let filename = Months[month_rage.getMonth()] +"_"+ month_rage.getFullYear()+"_.xlsx";
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',filename); //or any other extension
                document.body.appendChild(link);
                link.click();
        });
    }
    render(){
        const data = {
          columns: [
              { label: 'Sales ID #', field: 'sales_id', sort: 'asc', width: 150 },
              { label: 'Job', field: 'job', sort: 'asc', width: 150 },
              { label: 'Customer', field: 'cust', sort: 'asc', width: 150 },
              { label: 'Substrate', field: 'substrate', sort: 'asc', width: 150 },
              { label: 'Cap', field: 'cap', sort: 'asc', width: 150 },
              { label: 'Quantity', field: 'qty', sort: 'asc', width: 150 },
              { label: 'Top Seal', field: 'top_seal', sort: 'asc', width: 150 },
              { label: 'Dispatch Date', field: 'dispatch_date', sort: 'status', width: 150 },
          ],
            rows : this.state.tableData
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
                    <PageTitle title="Reports" subtitle="Monthly variable expense report are generated here."/>
                    <div className="monthlyfilterReport">
                        <Row>
                            <Col md={2} xs={12} >
                                <label htmlFor="">Start Date</label>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={(date) => this.filter(date)}
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
                                    onChange={(date) => this.setState({endDate : date})}
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
            )
        }
    }
}
