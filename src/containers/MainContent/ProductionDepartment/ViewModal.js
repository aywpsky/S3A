import React, {Component} from "react";
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import {Row,Col,Form,FormGroup , Input , Label , Button ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Config from "../../../config/Config";
import Helper from "../../../config/Helper";
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
import SimpleReactValidator from 'simple-react-validator';
import Alertify from 'alertifyjs';
import qs from "qs";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { BallBeat } from 'react-pure-loaders';
class ViewModal extends Component {
   constructor ( props ) {
      super( props );
      this.state = {
         js_data : [],
         loading : true,
      }
   }

   componentDidMount(){
      this.getJobSheetData();
   }
   getJobSheetData = async() => {
      let id = this.props.js_id;
      let url           = Config.base_url + 'printingdepartment/GetJobSheetData/' + id,
      response          = await axios.get(url);

      if (response.data.msg == 'success') {
         this.setState({js_data: response.data.result , loading : false});

      }

   }
    render(){
        if (this.state.loading) {
            return(
                <BallBeat loading = 'true' color = '#EB3B5A'/>
            )
        }else{
            return(
                <AUX>
                   {/*Start Edit*/}
                   {
                      this.state.js_data.map((data , key) =>{
                      return(

                         <ModalBody>
                            <Row >
                               <Col md={12}>
                                  <Row>
                                     <Col md={9} style={{textAlign:'right'}}>
                                        <Label>P.O. Date:</Label>
                                     </Col>
                                     <Col md={3}>
                                        <span> {data.date_added}</span>
                                     </Col>
                                  </Row>
                                  <Row>
                                     <Col md={9} style={{textAlign:'right'}}>
                                        <Label>P.O. #:</Label>
                                     </Col>
                                     <Col md={3}>
                                        <span> {data.fk_sales_order_id}</span>
                                     </Col>
                                  </Row>
                                  <Row>
                                     <Col md={9} style={{textAlign:'right'}}>
                                        <Label>JS #:</Label>
                                     </Col>
                                     <Col md={3}>
                                        <span> {data.job_sheet_id}</span>
                                     </Col>
                                  </Row>
                               </Col>
                            </Row>

                            <br />
                            <Row>
                               <Col md={3}>
                                  <Label>Customer:</Label>
                               </Col>
                               <Col md={2}>
                                  <span> {data.customer}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Work Order #</Label>
                               </Col>
                               <Col md={3}>
                                  <span> {data.fk_sales_order_id}</span>
                               </Col>
                            </Row>

                            <Row>
                               <Col md={9} style={{textAlign:'right'}}>
                                  <Label>Batchcode:</Label>
                               </Col>
                               <Col md={3}>
                                  <Label>08.30.19NN.100ml</Label>
                               </Col>
                            </Row>

                            <Row>
                               <Col md={12}>
                                  <Label>Ship To:</Label>
                               </Col>
                            </Row>

                            <Row>
                               <Col md={3}>
                                  <Label></Label>
                               </Col>
                               <Col md={2}>
                                  <Label>EXAL WAREHOUSE</Label>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Variant Description:</Label>
                               </Col>
                               <Col md={3}>
                                  <Label>100ml Naturacentials Nigeria</Label>
                               </Col>
                            </Row>

                            <hr />

                            <Row>
                               <Col md={3}>
                                     <Label>Target Delivery Qty:</Label>
                               </Col>
                               <Col md={2}>
                                  <span> {data.quantity}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Complete Order By:</Label>
                               </Col>
                               <Col md={3}>
                                  <span> {data.date_added}</span>
                               </Col>
                            </Row>

                            <hr />

                            <Row>
                               <Col md={12} style={{textAlign:'center'}}>
                                     <Label>Table Production</Label>
                               </Col>
                            </Row>
                            <Row>
                               <Col md={3}>
                                     <Label>Tube Diameter:</Label>
                               </Col>
                               <Col md={2}>
                                  <span> {data.tube_diameter}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Cap type:</Label>
                               </Col>
                               <Col md={3}>
                                  <span>{data.cap_type}</span>
                               </Col>
                            </Row>
                            <Row>
                               <Col md={3}>
                                     <Label>Tube Length:</Label>
                               </Col>
                               <Col md={2}>
                                  <span>{data.tube_length}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Seal:</Label>
                               </Col>
                               <Col md={3}>
                                  <span>{data.seal}</span>
                               </Col>
                            </Row>
                            <Row>
                               <Col md={3}>
                                     <Label>Resin Type:</Label>
                               </Col>
                               <Col md={2}>
                                  <span>{data.resin_type}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Max Approved Cap Withdrawal:</Label>
                               </Col>
                               <Col md={3}>
                                  <span>{data.max_approved_cap_with}</span>
                               </Col>
                            </Row>
                            <Row>
                               <Col md={12}>
                                     <Label>Thread Type:</Label>
                               </Col>
                            </Row>

                            <hr />
                            <Row>
                               <Col md={3}>
                                     <Label>Released By:</Label>
                               </Col>
                               <Col md={2}>
                                  <span>{data.released_by}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Q.A.Leader:</Label>
                               </Col>
                               <Col md={3}>
                                  <span>{data.qa_leader}</span>
                               </Col>
                            </Row>
                            <Row>
                               <Col md={3}>
                                     <Label>Issue Date:</Label>
                               </Col>
                               <Col md={2}>
                                  <span>{data.issue_date}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Production Leader:</Label>
                               </Col>
                               <Col md={3}>
                                  <span>{data.prodiction_leader}</span>
                               </Col>
                            </Row>

                            <hr />

                            <Row>
                               <Col md={3}>
                                     <Label>Materials Check by:</Label>
                               </Col>
                               <Col md={2}>
                                  <span>{data.materials_checked_by}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>Toolings Checked By:</Label>
                               </Col>
                               <Col md={3}>
                                  <span>{data.toolings_checked_by}</span>
                               </Col>
                            </Row>

                            <hr />

                            <Row>
                               <Col md={3}>
                                     <Label>Remarks:</Label>
                               </Col>
                               <Col md={2}>
                                  <span>{data.remarks}</span>
                               </Col>
                               <Col md={4} style={{textAlign:'right'}}>
                                  <Label>NO UNDERRUN;</Label>
                               </Col>
                               <Col md={3}>
                                  <span>{data.no_underrun}</span>
                               </Col>
                            </Row>

                         </ModalBody>
                      )
                   })
                }
                   {/*End Edit*/}
                </AUX>
            )
        }
    }

}

export default ViewModal;
