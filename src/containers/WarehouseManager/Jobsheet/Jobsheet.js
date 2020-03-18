import React , {Component, Suspense}                           from 'react';
import AUX                                                     from '../../../hoc/Aux_';
import { BallBeat }                                            from 'react-pure-loaders';
import CreatableSelect                                         from 'react-select/creatable';
import axios                                                   from 'axios';
import Config                                                  from '../../../config/Config';
import Helper                                                  from '../../../config/Helper';
import qs                                                      from "qs";
import Alertify                                                from 'alertifyjs';
import SimpleReactValidator                                    from 'simple-react-validator';
import DatePicker                                              from "react-datepicker";
import classnames                                              from 'classnames';
import Editable                                                from 'react-x-editable';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead }  from 'mdbreact';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import GroupButton from '../../CustomComponents/GroupButton';
import ModalView from './ModalView';



import "react-datepicker/dist/react-datepicker.css";


class Jobsheet extends Component{

constructor ( props ) {
    super( props );
    this.validator = new SimpleReactValidator();
    this.state = {
      modalOpen   : false,    modalTitle  : '',    action        : '',             salesOrder_job  : '',          customer          : '',          cap         : '',          quantity    : '',
      topSeal     : '',       post_date   : '' ,    startDate    : new Date(),     type            : '',          dispatch_date     : '',          substrate   : '',          salesData   : '' ,       special_inc : '',
      add_details : '',        sales_id   : '',     modalOpenJO  : false,          JOData          : '',          modalTitleJO      : '', modalOpen_view: false
    }
    this.toggleModal             = this.toggleModal.bind(this);
    this.CreateSalesOrder        = this.CreateSalesOrder.bind(this);
    this.UpdateSalesOrder        = this.UpdateSalesOrder.bind(this);
    this.InputOnChange           = this.InputOnChange.bind(this);
    this.handleChangeDate        = this.handleChangeDate.bind(this);

}

componentDidMount(){
   Alertify.defaults = Config.AlertConfig
   this.GetSalesOrder();
}
// this.validator.hideMessages();
// this.forceUpdate();
toggleModal = () => {
   this.setState({
      modalOpen      :  !this.state.modalOpen,
   });
}

toggleModal_view = () => {
   this.setState({
      modalOpen_view      :  !this.state.modalOpen_view,
   });
}

handleChangeDate = date => {
      this.setState({
          startDate : new Date(date),
          post_date : Helper.formatDate(date ? date : new Date())
      });
};

convertDate =(date) =>{
    var months_arr      = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
    var newDate         = new Date(date);
    var month           = newDate.getMonth();
    var day             = newDate.getDate();
    var year            = newDate.getFullYear();
    return  months_arr[month] +" "+day+", "+year;
}


GetSalesOrder = async(e) => {
      let response;
      let temp_data =[];
      let url = Config.base_url + 'sales/getSalesOrder';
      response = await axios.post(url , '');
      if (response.data) {
         const m = response.data.map((key, idx) => {
             let groupBtn = [
                 { title: "View" ,icon: "ion-eye",color:"info",function: () => this.toggleModal_view()},
                 { title: "Test" ,icon: "ion-eye",color:"info",function: () => this.getkey(key.sales_id)}
              ];
            let x = {
              salesID: "SOID" + key.sales_id.padStart(5, "0"),
              joborder: "No Jobsheet Created",
              customer: key.customer,
              job: key.job,
              quantity:parseInt(key.quantity).toLocaleString('en'),
              dept:<div key={key.sales_id} className="form-group">
                        <select name="department" className="form-control oval_select">
                            <option selected hidden>Choose a Department</option>
                            <option value='Printing'>Printing</option>
                            <option value='Production'>Production</option>
                        </select>
                   </div>,
              status: <div className="form-group">
                        <select name="status" className="form-control oval_select">
                            <option selected hidden>Set Status</option>
                            <option value='0'>Pending</option>
                            <option value='1'>In Progress</option>
                        </select>
                   </div>,
              dispatch_date:key.dispatch_date,
              action: <GroupButton data={groupBtn}/>
           }
           temp_data.push(x);
         });
         this.setState({salesData: temp_data})
      }
}

// GetSalesOrder = async(e) => {
//       let response;
//       let temp_data =[];
//       let jotemp_data =[];
//       let url     = Config.base_url + 'sales/getSalesOrder';
//       response    = await axios.post(url , '');
//       if (response.data) {
//          const m  = response.data.map((key, idx) => {
//             let x = {
//               salesID         : "SOID" + key.sales_id.padStart(5, "0"),
//               customer        : key.customer,
//               action          :
//                                  <div className="btn-group">
//                                     <Button title="Printing Department"     className="btn-info btn "        onClick={() => this.printDept(key.sales_id)}>Printing Department</Button>
//                                     <Button title="Production Production"   className="btn-warning btn "     onClick={() => this.printDept(key.sales_id)}>Production Department</Button>
//                                     <Button title="For Delivery"            className="btn-secondary btn "   onClick={() => this.printDept(key.sales_id)}>For Delivery</Button>
//                                  </div>,
//             }
//             let y = {
//               salesID         : "SOID" + key.sales_id.padStart(5, "0"),
//               job             : key.job,
//               customer        : key.customer,
//               substrate       : key.substrate,
//               cap             : parseInt(key.cap).toLocaleString('en'),
//               quantity        : parseInt(key.quantity).toLocaleString('en'),
//               top_seal        : (key.top_seal == 1) ? "YES" : "NO",
//               type            : (key.type == 0) ? "For Printing Only" : (key.type == 1) ? "For Production Only" : (key.type == 2) ? "For Production And Printing" : "",
//               dispatch_date   :key.dispatch_date,
//               action          :
//                                  <div className="btn-group">
//                                    <Button title="Create Job Order" className="btn-info btn " onClick={() => this.editSalesOrder(key.sales_id)}>Create Job</Button>
//                                    <Button title="Edit Job Order" className="btn-success btn ">Edit Job</Button>
//                                    <Button title="View Job Order" className="btn-warning btn ">View Job</Button>
//                                    <Button title="Create Issuance" className="btn-danger btn ">Create Issuance</Button>
//                                  </div>,
//            }
//            temp_data.push(x);
//            jotemp_data.push(y);
//          });
//          this.setState({salesData   : temp_data})
//          this.setState({JOData      : jotemp_data})
//       }
// }

printDept = async(sales_id) => {
   this.setState({
      modalOpenJO    :  !this.setState.modalOpenJO,
      modalTitleJO   : 'Job Sheet',
      action         : 'Add',
      salesOrder_job : '',
      customer       : '',
      cap            : '',
      quantity       : '',
      topSeal        : '',
      type           : '',
      dispatch_date  : '',
      substrate      : ''
   });

   let url           = Config.base_url + 'sales/getSalesOrdertoJO/' + sales_id,
   response          = await axios.get(url);

};

UpdateSalesOrder = async(e) => {
   e.preventDefault();
   const { sales_id }         = this.state;
   let url                    = Config.base_url + 'sales/updateSalesOrder/';
   const formData             = new FormData(e.target);
   formData.append('sales_id' , sales_id);
   const response             = await axios.post(url , formData);

   if (response.data.success) {
       Alertify.success('Successfully updated!');
       this.GetSalesOrder();
       this.setState({modalOpen:false});
   }else{
       Alertify.error('Something went wrong!');
   }
}

editSalesOrder = async(sales_id) =>{
   await this.setState({modalTitle:'Edit Sales Order' , modalOpen:true , action : 'Edit'});
   let url           = Config.base_url + 'sales/getSO/' + sales_id,
   response          = await axios.get(url);

   await this.setState({
         sales_id                  : response.data.sales_id,
         salesOrder_job            : response.data.job,
         customer                  : response.data.customer,
         substrate                 : response.data.substrate,
         cap                       : response.data.cap,
         quantity                  : response.data.quantity,
         topSeal                   : response.data.top_seal,
         type                      : response.data.type,
         special_inc               : response.data.special_instructions,
         add_details               : response.data.additional_details,
         startDate                 : new Date(response.data.dispatch_date),
   });
}

InputOnChange(e){
    this.setState({
        [e.target.name] : e.target.value
    });
}
async CreateSalesOrder(e){
    e.preventDefault();

    if (this.validator.allValid()) {

        let url         = Config.base_url + 'sales/CreateSalesOrder',
         formData       = new FormData(e.target);
         formData.append('dispatch_date' , (this.state.post_date ? this.state.post_date : Helper.formatDate(this.state.startDate)));
        const response  = await axios.post(url , formData);

        if (response.data.success) {
             Alertify.success('Successfully added!');
             this.GetSalesOrder();
        }else{
            Alertify.success('Something went wront. Please try again.');
        }

    }else{
        this.validator.showMessages();
        this.forceUpdate();
    }
}

render(){

   const data = {
        columns: [
          { label: 'SALES ID',    field: 'salesID',     width: 150 },
          { label: 'JOB ORDER',    field: 'customer',    width: 200 },

          { label: 'CUSTOMER',    field: 'customer',    width: 200 },
          { label: 'ITEM',        field: 'job',    width: 200 },
          { label: 'QUANTITY',      field: 'quantity',    width: 200 },
          { label: 'DEPARTMENT',    field: 'dept',    width: 200 },
          { label: 'STATUS',    field: 'status',    width: 200 },
          { label: 'DISPATCH DATE',    field: 'dispatch_date',    width: 200 },

          { label: 'ACTION',      field: 'action',      width: 200 }
        ],
        rows: this.state.salesData
      };

      const data2 = {
           columns: [
             { label: 'SALES ID',      field: 'salesID',          width: 150 },
             { label: 'JOB',           field: 'job',              width: 270 },
             { label: 'CUSTOMER',      field: 'customer',         width: 200 },
             { label: 'SUBSTRATE',     field: 'substrate',        width: 270 },
             { label: 'CAP',           field: 'cap',              width: 200 },
             { label: 'QUANTITY',      field: 'quantity',         width: 270 },
             { label: 'TOP SEAL',      field: 'top_seal',         width: 200 },
             { label: 'STATUS',        field: 'type',             width: 270 },
             { label: 'DISPATCH DATE', field: 'dispatch_date',    width: 200 },
             { label: 'ACTION',        field: 'action',           width: 200 }
           ],
           rows: this.state.JOData
         };

    return(
            <AUX>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title-box">
                                <h4 className="page-title">Job Orders</h4>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active">
                                    Job Orders are listed here
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                     <Row>
                        <Col sm={12}>
                             <div className="card m-b-20">
                                 <div className="card-body ">
                                    <br />
                                    <br />
                                    <MDBDataTable
                                         responsive
                                         bordered
                                         hover
                                         data={data}
                                         />
                                 </div>
                             </div>
                         </Col>
                     </Row>



            </AUX>
    );
}

}

export default Jobsheet;
