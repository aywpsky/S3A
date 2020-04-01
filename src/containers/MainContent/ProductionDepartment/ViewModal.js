import React, { Component } from "react";
import AUX from '../../../hoc/Aux_';
import { Row, Col, Label, ModalBody } from 'reactstrap';
import Config from "../../../config/Config";
import axios from "axios";
import Moment from 'moment';

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            js_data: [],
            prod_data: [],
        }
    }

    componentDidMount() {
        this.getJobSheetData();
    }
    getJobSheetData = async () => {
        let id = this.props.js_id;
        let url = Config.base_url + 'production/GetJobSheetData/' + id,
            response = await axios.get(url);

        if (response.data.msg == 'success') {
            this.setState({ js_data: response.data.result.all_data, prod_data: response.data.result.production });
        }

    }
    render() {
        Moment.locale('en');
        return (
            <AUX>
                {/*Start Edit*/}
                {
                    this.state.js_data.map((data, key) => {
                        return (

                            <ModalBody className="ViewPrintingJob">
                                <table id="first_table" className="table table-bordered mb-0 first_table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Label>P.O. Date:</Label>
                                                <p> {Moment(data.date_added).format('YYYY-MM-DD')}</p>
                                            </td>
                                            <td>
                                                <Label>P.O. #:</Label>
                                                <p> {data.fk_sales_order_id}</p>
                                            </td>
                                            <td>
                                                <Label>JS #:</Label>
                                                <p>{data.job_sheet_id}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table id="second_table" className="table table-bordered mb-0 second_table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Label>Customer:</Label>
                                                <p> {data.customer}</p>
                                            </td>
                                            <td>
                                                <Label>Work Order #</Label>
                                                <p> {data.fk_sales_order_id}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Ship To:</Label>
                                            </td>
                                            <td>
                                                <Label>Batchcode:</Label>
                                                <p>08.30.19NN.100ml</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Label>EXAL WAREHOUSE</Label></td>
                                            <td>
                                                <Label>Variant Description:</Label>
                                                <p>100ml Naturacentials Nigeria</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Target Delivery Qty:</Label>
                                                <p> {data.quantity}</p>
                                            </td>
                                            <td >
                                                <Label>Complete Order By:</Label>
                                                <p> {Moment(data.date_added).format('YYYY-MM-DD')}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colSpan="2"><h5>Production</h5></th>
                                        </tr>
                                        {
                                            this.state.prod_data.map((datas, keys) => {
                                                return (
                                                    <tr>
                                                        <td id="production_tr_div" colspan="100%">
                                                            <div className="production_div">
                                                                <tr>
                                                                    <td>
                                                                        <Label>Cap Type:</Label>
                                                                        <p> {datas.material_name}</p>
                                                                    </td>
                                                                    <td >
                                                                        <Label>Tube Diameter:</Label>
                                                                        <p> {datas.tube_diameter}</p>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>
                                                                        <Label>Tube Length:</Label>
                                                                        <p> {datas.tube_length}</p>
                                                                    </td>
                                                                    <td >
                                                                        <Label>Seal:</Label>
                                                                        <p> {datas.seal}</p>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>
                                                                        <Label>Resin Type:</Label>
                                                                        <p> {datas.resin_type}</p>
                                                                    </td>
                                                                    <td >
                                                                        <Label>Max Approved Cap Withdrawal:</Label>
                                                                        <p> {datas.max_approved_cap_with}</p>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td colSpan="2">
                                                                        <Label>Thread Type:</Label>
                                                                        <p> {datas.laminate_color}</p>
                                                                    </td>
                                                                </tr>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        <tr>
                                            <td>
                                                <Label>Released By:</Label>
                                                <p>{data.released_by}</p>
                                            </td>
                                            <td >
                                                <Label>Q.A.Leader:</Label>
                                                <p>{data.qa_leader}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Issue Date:</Label>
                                                <p>{Moment(data.issue_date).format('YYYY-MM-DD')}</p>

                                            </td>
                                            <td >
                                                <Label>Production Leader:</Label>
                                                <p>{data.prodiction_leader}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Materials Check by:</Label>
                                                <p>{data.materials_checked_by}</p>
                                            </td>
                                            <td >
                                                <Label>Toolings Checked By:</Label>
                                                <p>{data.toolings_checked_by}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Remarks:</Label>
                                                <p>{data.remarks}</p>
                                            </td>
                                            <td >
                                                <Label>NO UNDERRUN;</Label>
                                                <p>{data.no_underrun}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </ModalBody>
                        )
                    })
                }
                {/*End Edit*/}
            </AUX>
        )
    }

}

export default ViewModal;
