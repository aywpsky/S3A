import React, { Component }  from "react";
import axios from "axios";
import { Input, Label } from "reactstrap";
import Config from '../../../config/Config';
import { connect } from 'react-redux';

class List extends Component {

    constructor(props){
        super(props);
        this.state = {
            material:[]
        }
    }

    async componentDidMount(){
        let id = this.props.job_sheet_id;
        let url = Config.base_url+'warehouse/viewWorkOrder/'+id;
        let response = await axios.get(url);
        const material = response.data;

        this.setState({material});
    }

    render() {
        return (
            <>
                <Label>{this.props.label}</Label>
                <Input type="select" name="workOrder">
                    {
                        this.state.material.map((val) => {
                            return <option value={val.id}>{val.job}</option>
                        })
                    }
                </Input>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        job_sheet_id: state.warehouseReducer.job_sheet_id,
    }
}
const mapActionToProps = dispatch => {
    return {
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(List);
