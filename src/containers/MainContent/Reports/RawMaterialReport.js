import React , {Component} from "react";
import PageTitle from '../../CustomComponents/PageTitle';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable} from 'mdbreact';
import {Card , CardBody , Col , Row , Button} from "reactstrap";
import Config from '../../../config/Config';
import axios from 'axios';
import { BallBeat } from 'react-pure-loaders';
import DatePicker from 'react-datepicker';
import qs from 'qs';
import Helper from '../../../config/Helper';
import Alertify from 'alertifyjs';
export default class RawMaterialReport extends Component{

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
        this.getMaterials();
    }

    getMaterials = () => {
        const url = Config.base_url + 'reports/getMaterials';
        axios.get(url).then(res => {
            if (res.data.status == 'ok') {
                const x = [];
                const {data} = res.data;
                data.map(val => {
                    let y = {
                        item_code : "RM" + val.raw_id.padStart(5, "0"),
                        mat_name : val.material_name,
                        supp_name : val.name,
                        uom : val.uom,
                        date: val.date_added
                    }
                    x.push(y);
                });
                this.setState({tableData : x , loading : false});
            }else{
                this.setState({tableData : [] , loading : false});
            }
        });
    }

    filter = (start , end) => {
        this.setState({
            startDate : start,
            endDate : end,
            filterloading : true
        });
        const me = this;
        setTimeout(function () {
            const { startDate , endDate } = me.state;
            const url  = Config.base_url + 'reports/filterMaterial';
            const data = {
                startDate : Helper.formatDate(startDate),
                endDate : Helper.formatDate(end)
            };

            axios.post(url , qs.stringify(data)).then(res => {
                if (res.data.status == 'ok') {
                    const { data } = res.data;
                    let x = [];
                    data.map( val => {
                        let y = {
                            item_code : "RM" + val.raw_id.padStart(5, "0"),
                            mat_name : val.material_name,
                            supp_name : val.name,
                            uom : val.uom,
                            date : val.date_added
                        }
                        x.push(y);
                    });
                    me.setState({tableData : x , filterloading : false});
                }else{
                    Alertify.warning('No Data found.');
                    me.setState({tableData : [] ,filterloading : false});
                }
            });
        }, 1000);
    }

    generate =  () => {
        const { startDate, endDate } = this.state;
        let data = {startDate : Helper.formatDate(startDate) , endDate : Helper.formatDate(endDate)}
        let month = Helper.formatDate( startDate );
        const url = Config.base_url + 'reports/generateMaterial';
        axios.post(url , qs.stringify(data)).then(res => {

            let month_rage = new Date( month );
            let filename = Helper.getMonth( month_rage.getMonth() ) +"_"+ month_rage.getFullYear()+"_.xlsx";
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download',filename);  //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    render(){
        const data = {
          columns: [
              { label: 'Item Code', field: 'item_code', sort: 'asc', width: 150 },
              { label: 'Material Name', field: 'mat_name', sort: 'asc', width: 150 },
              { label: 'Supplier Name', field: 'supp_name', sort: 'asc', width: 150 },
              { label: 'UOM', field: 'uom', sort: 'asc', width: 150 },
              { label: 'Date Added', field: 'date', sort: 'asc', width: 150 },
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
                    <PageTitle title="Reports" subtitle="Monthly raw materials report are generated here."/>
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
