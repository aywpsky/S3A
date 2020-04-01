import React, { Component } from "react";
import AUX from '../../../hoc/Aux_';
import { Row, Col, Label, ModalBody,ModalFooter, Modal, ModalHeader, Input, Button, Form } from 'reactstrap';
import Config from "../../../config/Config";
import axios from "axios";
import Moment from 'moment';
import Listprint from "./GetMaterials";
import Listprod from "./GetMaterialsProd";
import ListWork from "./GetWorkOrder";
import { connect } from 'react-redux';
import Alertify from 'alertifyjs';
import $ from 'jquery';

const initalState = {
    addMore : {
		form:[
			[{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]
		]
	},
    addMoreTube : {
		form:[
			[{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]
		]
	},
    js_data: [],
}

class JobSheetModal extends Component {
    constructor(props) {
        super(props);
        this.state = initalState;

    }

     submit = async (e,id) => {
        e.preventDefault();
        let jo_id = id;
        let url = Config.base_url + 'warehouse/submitJobSheet';
        let formdata = new FormData(e.target);
        formdata.append('so_id' ,jo_id );
        let response = await axios.post(url , formdata);
        if (response.data.status == 'success') {
            Alertify.success(response.data.msg);
            this.props.set_toggle_modal('createJSModal');
        }else{
            Alertify.error(response.data.msg);
        }
    }


    onClick = async () =>{
        this.props.set_toggle_modal('print_production_fields')
    }
    onClick2 = async () =>{
        this.props.set_toggle_modal('table_production_fields')
    }
    onClick3 = async () =>{
        this.props.set_toggle_modal('logistic_fields')
    }
    // componentDidMount() {
    //     this.getJobSheetData();
    // }
    Splice = (parent_index) => {
        const { addMore  } = this.state;
        addMore.form.splice(parent_index , 1);
        this.setState({addMore});
        this.props.RemoveDataByIdx(parent_index);
    }
    Splice2 = (parent_index) => {
        const { addMoreTube  } = this.state;
        addMoreTube.form.splice(parent_index , 1);
        this.setState({addMoreTube});
        this.props.RemoveDataByIdx(parent_index);
    }
    AddMore = (index) => {
        const {addMore , addMoreTube} = this.state;
        if(index == 1){
            addMore.form.push([{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]);
        }else{
            addMoreTube.form.push([{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]);
        }
        this.setState({addMore});
    }

    render() {
        Moment.locale('en');
        let create_js_data = [];
        let last_id = [];
        let cjs = [];
        if(this.props.create_js_data.length > 0 && this.props.js_last_id.length > 0){
            create_js_data = this.props.create_js_data;
            last_id = this.props.js_last_id;
            let js_number = parseInt(last_id[0].job_sheet_id)+1;

             cjs = {
                date: Moment(create_js_data[0].job_date).format('MMMM DD YYYY'),
                po: 'JOID'+create_js_data[0].sales_id,
                sales_id:create_js_data[0].sales_id,
                js: 'JSID'+js_number,
                company: create_js_data[0].company,
            }
        }
        return (
            <AUX>
                {/*Start Edit*/}
                <Modal size="lg" isOpen={this.props.createJSModal} toggle={() => this.props.set_toggle_modal('createJSModal')} className="">
                    <ModalHeader toggle={() => this.props.set_toggle_modal('createJSModal')}>Create Jobsheet</ModalHeader>
                        <ModalBody className="ViewPrintingJob">
                            <Form method="POST" onSubmit= {(e) => this.submit(e , cjs.sales_id)}>
                            <table id="first_table" className="table table-bordered mb-0 first_table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Label>P.O. Date:</Label>
                                            <Input name="po_date" value={cjs.date} readOnly/>
                                        </td>
                                        <td>
                                            <Label>P.O. #:</Label>
                                            <Input name="po_number" value={cjs.po} readOnly/>
                                        </td>
                                        <td>
                                            <Label>JS #:</Label>
                                            <Input name="js_number" value={cjs.js} readOnly/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table id="second_table" className="table table-bordered mb-0 second_table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Label>Customer:</Label>
                                            <Input name="customer" value={cjs.company} readOnly/>
                                        </td>
                                        <td>
                                            <Label>Work Order #</Label>
                                            <ListWork/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Ship To:</Label>
                                            <Input name="ship_to" required/>
                                        </td>
                                        <td>
                                            <Label>Batchcode:</Label>
                                            <Input name="batchcode" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan='2'>
                                            <Label>Variant Description:</Label>
                                            <Input name="var_des" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Target Delivery Qty:</Label>
                                            <Input name="target_del_qty" required/>
                                        </td>
                                        <td >
                                            <Label>Complete Order By:</Label>
                                            <Input name="com_order_by" required/>
                                        </td>
                                    </tr>

                                    {/* Print Production*/}
                                    <tr className="print_production_trigger"  onClick={this.onClick}>
                                        <th colSpan="2"><h5>Print Production</h5>{this.props.print_production_fields?<i className="fas fa-angle-up"></i>:<i className="fas fa-angle-down"></i>}</th>
                                    </tr>
                                    {this.state.addMore.form.map((val , idx) => {
                                        return(
                                            <tr  style={{ display:this.props.print_production_fields ? 'revert':'none'}}>
                                                <td id="production_tr_div" colspan="100%">
                                                    <div className="production_div">
                                                        <Label className="close_production_btn">
                                                            {(idx > 0) ? <button onClick={() => this.Splice(idx)} type="button" className="productionClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
                                                        </Label>
                                                        <tr className="print_production_fields production_tr" style={{ display:this.props.print_production_fields ? 'revert':'none'}}>
                                                            <td>
                                                                <Label>Laminate:</Label>
                                                                <Listprint js_id={this.props.job_sheet_id}/>
                                                            </td>
                                                            <td >
                                                                <Label>Laminate Thickness:</Label>
                                                                <Input name="laminate_thickness[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields production_tr" style={{display:this.props.print_production_fields ? 'revert':'none'}}>
                                                            <td>
                                                                <Label>Laminate Width:</Label>
                                                                <Input name="laminate_width[]" type="number"/>
                                                            </td>
                                                            <td >
                                                                <Label>Max Approved Laminate Withdrawal:</Label>
                                                                <Input type="number" name="max_approve_laminate_with[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields last_tr" style={{display:this.props.print_production_fields ? 'revert':'none'}}>
                                                            <td colSpan="2">
                                                                <Label>Laminate Color:</Label>
                                                                <Input name="laminate_color[]"/>
                                                            </td>
                                                        </tr>

                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })
                                    }
                                    <tr  className="print_production_fields" style={{display:this.props.print_production_fields ? 'revert':'none'}}>
                                        <td colSpan="2">
                                            <Row className="pluscont addMoreBtnJS">
                                                <Col md={12} className={'addMore'}>
                                                    <Button title="Add more" type="button" color="primary" className=" btn btn-secondary" onClick = {() => this.AddMore(1)}>
                                                        <i className="fas fa-plus"></i> Add More
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    {/* Print Production*/}

                                    <tr className="print_production_trigger"  onClick={this.onClick2}>
                                        <th colSpan="2"><h5>Tube Production</h5>{this.props.table_production_fields?<i className="fas fa-angle-up"></i>:<i className="fas fa-angle-down"></i>}</th>
                                    </tr>
                                    {/*Table Production*/}
                                    {this.state.addMoreTube.form.map((val , idx) => {
                                        return(
                                            <tr >
                                                <td id="production_tr_div" colspan="100%">
                                                    <div className="production_div">
                                                        <Label className="close_production_btn">
                                                            {(idx > 0) ? <button onClick={() => this.Splice2(idx)} type="button" class="productionClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
                                                        </Label>
                                                        <tr className="print_production_fields production_tr" style={{ display:this.props.table_production_fields ? 'revert':'none'}}>
                                                            <td>
                                                                <Label>Tube Diameter:</Label>
                                                                <Listprod />
                                                            </td>
                                                            <td >
                                                                <Label>Cap Type:</Label>
                                                                <Input name="cap_type[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields production_tr" style={{display:this.props.table_production_fields ? 'revert':'none'}}>
                                                            <td>
                                                                <Label>Tube Length:</Label>
                                                                <Input name="tube_length[]" type="number"/>
                                                            </td>
                                                            <td >
                                                                <Label>Seal:</Label>
                                                                <Input name="seal[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields production_tr" style={{display:this.props.table_production_fields ? 'revert':'none'}}>
                                                            <td>
                                                                <Label>Resin Type:</Label>
                                                                <Input name="resin_type[]"/>
                                                            </td>
                                                            <td >
                                                                <Label>Max Approved Cap Withdrawal:</Label>
                                                                <Input type="number" name="max_approve_cap_with[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields last_tr" style={{display:this.props.table_production_fields ? 'revert':'none'}}>
                                                            <td colSpan="2">
                                                                <Label>Thread Type:</Label>
                                                                <Input name="thread_type[]"/>
                                                            </td>
                                                        </tr>

                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })
                                    }
                                    <tr  className="print_production_fields" style={{display:this.props.table_production_fields ? 'revert':'none'}}>
                                        <td colSpan="2">
                                            <Row className="pluscont addMoreBtnJS">
                                                <Col md={12} className={'addMore'}>
                                                    <Button title="Add more" type="button" color="primary" className=" btn btn-secondary" onClick = {() => this.AddMore(2)}>
                                                        <i className="fas fa-plus"></i> Add More
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>

                                    {/* Table Production*/}

                                    {/*Logistic*/}
                                    <tr className="print_production_trigger"  onClick={this.onClick3}>
                                        <th colSpan="2"><h5>Logistic</h5>{this.props.logistic_fields?<i className="fas fa-angle-up"></i>:<i className="fas fa-angle-down"></i>}</th>
                                    </tr>

                                    <tr className="print_production_fields" style={{ display:this.props.logistic_fields ? 'revert':'none'}}>
                                        <td>
                                            <Label>Packaging Box Size:</Label>
                                            <Input name="packaging_box_size" type="number" required/>
                                        </td>
                                        <td >
                                            <Label>Max Approved Box Withdrawal:</Label>
                                            <Input name="max_approve_box_with" required/>
                                        </td>
                                    </tr>

                                    <tr className="print_production_fields" style={{display:this.props.logistic_fields ? 'revert':'none'}}>
                                        <td>
                                            <Label>Quantity per Box:</Label>
                                            <Input name="qty_per_box" type="number" required/>
                                        </td>
                                        <td >
                                            <Label>Boxes to Deliver:</Label>
                                            <Input name="boxes_to_deliver" type="number"  required/>
                                        </td>
                                    </tr>
                                    {/* Logistic*/}

                                    <tr>
                                        <td>
                                            <Label>Released By:</Label>
                                            <Input name="released_by" required/>
                                        </td>
                                        <td >
                                            <Label>Q.A.Leader:</Label>
                                            <Input name="qa_leader" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Issue Date:</Label>
                                            <Input name="issue_date" value={Moment().format('MMMM DD YYYY')}required/>

                                        </td>
                                        <td >
                                            <Label>Production Leader:</Label>
                                            <Input name="prod_leader" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Materials Check by:</Label>
                                            <Input name="mat_check_by" required/>
                                        </td>
                                        <td >
                                            <Label>Toolings Checked By:</Label>
                                            <Input name="toolings_checked_by" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Remarks:</Label>
                                            <Input name="remarks" required/>
                                        </td>
                                        <td >
                                            <Label>NO UNDERRUN;</Label>
                                            <Input name="no_underrun" required/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                                <ModalFooter>
                                    <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.props.toggle()}>Cancel</Button>{' '}
                                    <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Submit</Button>
                                </ModalFooter>
                            </Form>
                    </ModalBody>
                </Modal>
                {/*End Edit*/}
            </AUX>
        )
    }

}
const mapStateToProps = state => {
    return {
        isModalOpen: state.warehouseReducer.isModalOpen,
        displayJSModal: state.warehouseReducer.displayJSModal,
        createJSModal: state.warehouseReducer.createJSModal,
        print_production_fields: state.warehouseReducer.print_production_fields,
        table_production_fields: state.warehouseReducer.table_production_fields,
        logistic_fields: state.warehouseReducer.logistic_fields,
        job_order_job_sheet_data: state.warehouseReducer.job_order_job_sheet_data,
        create_js_data: state.warehouseReducer.create_js_data,
        js_last_id: state.warehouseReducer.js_last_id,
        job_sheet_id: state.warehouseReducer.job_sheet_id,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL' ,state: state}),
        RemoveDataByIdx : (idx) => dispatch({type : 'RemoveDataByIdx' , idx : idx}),
    }
}
export default connect(mapStateToProps, mapActionToProps)(JobSheetModal);
