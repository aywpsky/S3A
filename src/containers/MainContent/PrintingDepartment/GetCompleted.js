import React from "react";
import axios from "axios";
import Config from '../../../config/Config';
import AddCompleted from "./AddCompleted";
import { MDBDataTable } from 'mdbreact';

class GetCompleted extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            material: [],
            job_sheet_data: [],
            hasDataToday: false,
            lastData: '',
            log_id: ''
        }
    }

    componentDidMount() {
        this.GetCompletedData();
    }


    formatDateToString() {

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        var dd = (date < 10 ? '0' : '') + date;
        var MM = ((month) < 10 ? '0' : '') + (month);
        var yyyy = year;

        return (yyyy + "-" + MM + "-" + dd);
    }


    GetCompletedData = async () => {
        let url = Config.base_url + 'printingdepartment/viewCompleted/' + this.props.js_id;
        let response = await axios.get(url);
        let temp_data = [];
        let y = [];
        var dateNow = this.formatDateToString();
        var lastDatas = '';

        const m = response.data.map((key) => {

            if (dateNow == key.date_added) {
                this.setState({ hasDataToday: true })
                lastDatas = key.qty
            }

            let x = {
                date: key.date_added,
                no_completed: key.qty,
            }
            y = {
                log_id: key.log_id,
            }
            temp_data.push(x);
        });

        var log_id = y['log_id'];
        this.setState({ job_sheet_data: temp_data, lastData: lastDatas, log_id: log_id })
    }

    render() {

        const data = {
            columns: [
                { label: 'Date', field: 'date', sort: 'asc', width: 150 },
                { label: 'No. of items Completed', field: 'no_completed', sort: 'asc', width: 150 },
            ],
            rows: this.state.job_sheet_data
        };

        return (
            <>

                <AddCompleted js_id={this.props.js_id} refreshData={() => this.GetCompletedData()} hasData={this.state.hasDataToday} lastData={this.state.lastData} log_id={this.state.log_id}  reload = {this.props.reload}/>
                <hr/>
                <MDBDataTable
                    responsive
                    bordered
                    hover
                    data={data}
                />
            </>
        )
    }
}

export default GetCompleted;
