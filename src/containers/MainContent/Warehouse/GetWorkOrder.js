import React from "react";
import axios from "axios";
import { Input, Label } from "reactstrap";
import Config from '../../../config/Config';


class List extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            material:[]
        }
    }

    async componentDidMount(){
        let url = Config.base_url+'warehouse/viewWorkOrder';
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

export default List;
