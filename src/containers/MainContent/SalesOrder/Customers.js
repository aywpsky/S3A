import React , { Component } from "react";
import {Input , Label } from "reactstrap";
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import axios from 'axios';
let data = [];
class Customers extends Component {
    componentDidMount() {
        let url = Config.base_url + 'sales/customerlist';
        axios.get(url).then( res => {
            if (res.data.status == 'success') {
                data = res.data.list;
            }
        });
    }

    render(){
        return(
            <Input type="select" name="customer">
                {data && data.map( val => {
                    return <option value={val.cust_id}>{val.company}</option>
                })}
            </Input>
        )
    }
}

export default Customers;
