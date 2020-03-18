import React from "react";
import axios from "axios";
import { Button,Form, FormGroup, Input, Col, Row } from "reactstrap";
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';

class AddCompleted extends React.Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            qty: '',

        }
    }
    componentDidMount() {
        var my = this;
        setTimeout(function () {
            my.chekData();
        }, 1000);

        Alertify.defaults = Config.AlertConfig;
    }

    chekData() {
        if (this.props.hasData) {
            this.setState({ qty: this.props.lastData })
        }
    }
    handleClick = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            let js_id = this.props.js_id;
            let url = ''
            if (this.props.hasData) {
                url = Config.base_url + 'printingdepartment/updateFinish/' + this.props.log_id;
            } else {
                url = Config.base_url + 'printingdepartment/submitFinish';
            }

            let formdata = new FormData(e.target);
            formdata.append('js_id', js_id);
            let response = await axios.post(url, formdata);
            if(response.data.status == 'excess'){
                Alertify.error('Number of items completed is greated than numbers of items to complete!')
            }else if(response.data.status == 'ok'){
                if (this.props.hasData) {
                    Alertify.success('Successfully Updated!')
                } else {
                    Alertify.success('Successfully Added!')
                }
            }else{
                Alertify.error('Something went wrong!')
            }

            this.props.refreshData()
            this.props.reload()
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {

        return (
            <>
                <Form onSubmit={(e) => this.handleClick(e)}>
                    <Row>
                        <Col md={9}>
                            <FormGroup>
                                <label>{this.props.hasData ? "Update" : "Enter"} data completed this day</label>

                                <FormGroup className="addCompletedFields">
                                    <Input name="finished_prod" placeholder="Enter finished quantity" value={this.state.qty} onChange={(e) => this.setState({ qty: e.target.value })} />
                                    <select name="completed_status" className="form-control">
                                        <option value='1'>In-progress</option>
                                        <option value='2'>On-hold</option>
                                        <option value='3'>Off-track</option>
                                        <option value='4'>Completed</option>
                                    </select>
                                </FormGroup>

                                <span id="err">{this.validator.message('Finished qty', this.state.qty, 'required|numeric')}</span>
                            </FormGroup>
                        </Col>
                        <Col md={3} className="completed-col">
                            <FormGroup>
                                <Button type="submit" color={this.props.hasData ? "success" : "primary"} className="btn btn-secondary waves-effect completed-btn" >{this.props.hasData ? "Update" : "Submit"}</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
}

export default AddCompleted;
