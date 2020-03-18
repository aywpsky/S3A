import React , {Component} from "react";
import PageTitle from '../../CustomComponents/PageTitle';

import AUX from '../../../hoc/Aux_';
import { MDBDataTable} from 'mdbreact';
import {Card , CardBody , Col , Row , Button , Label} from "reactstrap";
import axios from "axios";
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import DatePicker from 'react-datepicker';
import qs from 'qs';
import Alertify from 'alertifyjs';
import { BallBeat } from 'react-pure-loaders';
import {connect} from 'react-redux';
import ListSalesOrder from './ListSalesOrder';

class CustomerReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            tableData : [],
            startDate : new Date()
        }
    }

    componentDidMount(){
        Alertify.defaults = Config.AlertConfig;
        this.getData();
    }

    getData(){
        const url = Config.base_url + 'reports/getCustomerReport';
        // const res = await axios.get(url);
        axios.get(url).then(res => {
            let temp = [];
            res.data.map((val) => {
                    let x  = {
                        cu_id : val.cust_id,
                        name : val.name,
                        company : val.company,
                        email : val.email,
                        contact : val.contact,
                        date_added : val.date_added,
                        clickEvent : () => this.getSalesOrder(val.cust_id , val.name)
                    }
                    temp.push(x);
            });

            this.setState({tableData : temp , loading :false});
        })
    }

    filter = async(date) => {
        this.setState({startDate : date})
        let dates = Helper.formatDate(date);
        const url = Config.base_url + 'reports/filterlist';
        const res = await axios.post(url , qs.stringify({date : dates , table : 'tbl_customers'}));
        let temp = [];

        if (res.data.msg === 'nodata') {
            Alertify.warning('No Data found.');
        }else {
            res.data.data.map((val) => {
                    let x  = {
                        cu_id : val.cust_id,
                        name : val.name,
                        company : val.company,
                        email : val.email,
                        contact : val.contact,
                        date_added : val.date_added,
                        clickEvent : () => this.getSalesOrder(val.cust_id , val.name)
                    }
                    temp.push(x);
            });
        }
        this.setState({tableData : temp});
    }

    getSalesOrder = async(cust_id  , cust_name) => {

        const url = Config.base_url + 'reports/getSalesOrder';
        const data = qs.stringify({
            cust_name : cust_id
        });
        const res = await axios.post(url , data);

        if (res.data.status === 'ok') {
            const {data} = res.data;

            let x = [];
            data.map( val => {
                let y = {
                    job : val.job,
                    subs : val.substrate,
                    cap : val.cap,
                    qty : val.quantity,
                    top_seal : val.top_seal,
                    status : val.status,
                    dis_date : val.dispatch_date
                }
                x.push(y);
            })
            this.props.setId( cust_id , cust_name ,  x );
        }else{
            Alertify.warning('No Records yet.');
        }
    }

    generate = () => {
        let month = Helper.formatDate(this.state.startDate);
        const url = Config.base_url + 'reports/generateCustomerlist/' + month ;

        axios({
              url: url,
              method: 'GET',
              responseType: 'blob', // important
            }).then((response) => {
                let month_rage = new Date( month );
                let filename =  Helper.getMonth( month_rage.getMonth() ) + "_"+ month_rage.getFullYear() +".xlsx";
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
              { label: 'Customer #', field: 'cu_id', sort: 'asc', width: 150 },
              { label: 'Name', field: 'name', sort: 'asc', width: 150 },
              { label: 'Company', field: 'company', sort: 'asc', width: 150 },
              { label: 'Email', field: 'email', sort: 'asc', width: 150 },
              { label: 'Contact', field: 'contact', sort: 'asc', width: 150 },
              { label: 'Date Added', field: 'date_added', sort: 'asc', width: 150 },
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
        }else {
            return(
                <AUX>
                    <PageTitle title="Reports" subtitle="Monthly customer reports are generated here."/>
                    <div className="monthlyfilterReport">
                        <Row>
                            <Col md={2} xs={12} >
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={(date) => this.filter(date)}
                                    dateFormat="MM/dd/yyyy"
                                    showMonthYearPicker
                                />
                            </Col>
                            <Col md={2} xs={12}>
                                <button onClick={() => this.generate()} type="button" class="btn btn-primary btn btn-secondary reportbtn">Generate Report</button>
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

                    <ListSalesOrder />

                </AUX>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        modalOpen : state.reportreducers.modalOpen,
        cust_id : state.reportreducers.cust_id,
    }
}

const mapActionToProps = dispatch => {
    return {
        openModal: () => dispatch({type:'toggleModal'}),
        setId : (id , name , data) => dispatch({type : 'setId' , value : id , cust_name : name , data  : data})
    }
}

export default connect(mapStateToProps,mapActionToProps)(CustomerReport);
