import React from "react";
import axios from "axios";
import { Input , Label } from "reactstrap";
import Config from '../../../config/Config';


class GetMaterials extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            material:[]
        }
    }

    async componentDidMount(){
        let url = Config.base_url+'api/viewRaw';
        let response = await axios.get(url);
        const material = response.data;
        this.setState({material});
    }

    render() {
        return (
            <>
                <Label>{this.props.label}</Label>
                <Input type="select" name="material_requested"
                    value={this.props.defaultValue ? this.props.defaultValue : null}
                    onChange = {(e) => this.props.handleChange(e)}
                    >
                    {
                        this.state.material.map((val , idx) => {
                            return <option key={idx} value={val.raw_id}>{val.material_name}</option>
                        })
                    }
                </Input>
            </>
        )
    }
}

export default GetMaterials;
