import React , {Component, Suspense} from 'react';
import AUX from '../../../hoc/Aux_';
import {Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import GroupButton from '../../CustomComponents/GroupButton';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import qs from "qs";
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';

import classnames from 'classnames';


class Users extends Component{

   constructor ( props ) {
       super( props );
       this.validator = new SimpleReactValidator();
       this.state = {
         deac_action   :'',
         ActModal      : false,
         modalOpen      : false,
         user_id        : '',
         modalTitle     : '',
         firstname      : '',
         lastname       : '',
         position       : '',
         type           : '',
         username       : '',
         password       : '',
         action         : '',
         readOnly       : true
      }

       this.toggleModal         = this.toggleModal.bind(this);
       this.InputOnChange       = this.InputOnChange.bind(this);
       this.AddUser             = this.AddUser.bind(this);
       this.submitEditForm      = this.submitEditForm.bind(this);
       this.Activition          = this.Activition.bind(this);
       this.SubmitStatus          = this.SubmitStatus.bind(this);

   }

   componentDidMount(){
      Alertify.defaults = Config.AlertConfig
      this.GetUserDetails();
   }

   toggleModal = () => {
      this.setState({
         modalOpen      :  this.setState.modalOpen,

      });
   }

   Activition(id , action) {

       this.setState({
            ActModal : !this.stateActModal,
            user_id : id,
            deac_action : action
       })

   }
   async SubmitStatus() {
      let url = Config.base_url + 'users/EditStatus';
      let formData = {
          user_id : this.state.user_id,
          action : this.state.deac_action
      }

      const response = await axios.post(url , qs.stringify(formData));
        if (response.data.success) {
            Alertify.success(response.data.success);
            this.setState({
                 ActModal : false,
            })

            this.GetUserDetails();
        }else{
                Alertify.success(response.data.error);
        }
   }

   GetUserDetails = async(e) => {
         let response;
         let temp_data =[];
         let url = Config.base_url + 'users/GetUserDetails';
         response = await axios.post(url , '');
         if (response.data) {
            
            const m = response.data.map((key, idx) => {
               let groupBtn = [
                  { title: "Edit",icon: "ion-edit",color:"info",function: () => this.EditUserBtn(key.user_id)},
                  // { title: "View" ,icon: "ion-eye",color:"warning",function: ""},
               ];
               let x = {
                 userID          : "UID" + key.user_id.padStart(5, "0"),
                 username        : key.username,
                 fullname       : key.first_name +' '+key.last_name,
                 // lastname        : key.last_name,
                 position        : key.position,
                 type            : (key.type == 0) ? "Admin" : (key.type == 1) ? "Warehouse Manager" : (key.type == 2) ? "Printing Deparment Manager" : (key.type == 3) ? "Production Deparment Manager" : (key.type == 4) ? "Marketing Department Manager" : (key.type == 5) ? "Accounting Department Manager" : "",

                 status          : (key.status == 1) ?  <Badge title="Status" color="primary" pill >Active</Badge> : <Badge title="Status"  color="primary" outline>Inactive</Badge>,
                 action          : <GroupButton data = {groupBtn} >
                                    <Button title="Change Status" className="btn-secondary groupBtn btn btn_spec" onClick={() => this.Activition(key.user_id , key.status == 1 ? 0 : 1)} ><i className={key.status == 1 ? 'fas fa-lock' : 'fas fa-lock-open'}></i></Button>
                                    </GroupButton>  ,
              }
              temp_data.push(x);
            });
            this.setState({salesData: temp_data})
         }
   }



   addModal = () => {

      this.setState({
         modalOpen      :  !this.setState.modalOpen,
         modalTitle     : 'Add User',
         action         : 'Add',
         firstname      : '',
         lastname       : '',
         position       : '',
         type           : '',
         username       : '',
         password       : '',
         readOnly       : true
      });
   };

   InputOnChange(e){
      let password   = '';
      var date       = new Date();
      date           = Helper.formatDate(date ? date : new Date());

      this.setState({
          [e.target.name] : e.target.value
      });

       if (e.target.name == 'firstname') {
          password = this.state.lastname + '!' + date;
          this.setState({
             password        : password
          });
       }else if (e.target.name == 'lastname') {
          password =  e.target.value + '!' + date;
          this.setState({
            password        : password
          });
       }

   }

   // Add New User
   async AddUser(e){
       e.preventDefault();

       if (this.validator.allValid()) {

           let url = Config.base_url + 'users/AddUser',
           formData = new FormData(e.target);
           const response = await axios.post(url , formData);

           if (response.data.success) {
                Alertify.success('Successfully added!');

                this.setState({
                   firstname : '',
                   lastname  : '',
                   position  : '',
                   type      : '',
                   username  : '',
                   password  : '',
                   readOnly  : true
                 });
                this.GetUserDetails();
           }else{
               Alertify.success('Something went wront. Please try again.');
           }

       }else{
           this.validator.showMessages();
           this.forceUpdate();
       }
   }

   // End Add New User
   // Edit User BTN
    async EditUserBtn(id) {
       this.setState({
           user_id : id,
           modalTitle     : 'Edit User Information',
           modalOpen : true,
           action : 'edit',
           readOnly: false
       });
       let url = Config.base_url + 'users/GetUserDetails/'+id;
       let response = await axios.get( url );
       this.setState({
           firstname      : response.data.first_name,
           lastname       : response.data.last_name,
           position       : response.data.position,
           type           : response.data.type,
           username       : response.data.username,
           password       : response.data.password
       });
   }
   // END

   // EDIT FUNCTIONALITY
    async submitEditForm(e){
        const {user_id} = this.state;
        e.preventDefault();
        let url = Config.base_url + 'users/EditUser',
            formData = new FormData(e.target);
            formData.append( 'user_id'  , user_id);

        let response = await axios.post(url  , formData);
            if (response.data.success) {
                Alertify.success(response.data.success);
                this.GetUserDetails();
                this.setState({modalOpen : false});
            }else{
                Alertify.success(response.data.error);
            }
    }
   // END

render(){

   const data = {
        columns: [
          { label: 'User ID',      field: 'userID',     width: 150 },
          { label: 'User Name',     field: 'username',   width: 270 },
          { label: 'Full Name',    field: 'fullname',  width: 200 },
          // { label: 'Last Name',     field: 'lastname',   width: 270 },
          { label: 'Position',     field: 'position',   width: 200 },
          { label: 'Type',         field: 'type',       width: 200 },
          { label: 'Status',       field: 'status',     width: 270 },
          { label: 'Action',       field: 'action',     width: 200 }
        ],
        rows: this.state.salesData
      };

    return(
      <AUX>
         <Row>
            <Col sm={12}>
                 <div className="page-title-box">
                     <h4 className="page-title">User Details</h4>
                     <ol className="breadcrumb">
                         <li className="breadcrumb-item active">
                         List of all users
                         </li>
                     </ol>
                 </div>
                 <div className="page-btn">
                    <Button type="button" className="btn btn-primary real-btn" onClick={this.addModal}>Add New User</Button>
                 </div>
             </Col>
         </Row>

         <Row>
            <Col sm={12}>
                 <div className="card m-b-20">
                     <div className="card-body table_shift">
                        <MDBDataTable
                            className="userTable"
                             responsive
                             bordered
                             hover
                             data={data}
                             />
                     </div>
                 </div>
             </Col>
         </Row>

         <Modal size="lg" isOpen={this.state.modalOpen} toggle={() => this.setState({modalOpen : false})} className={this.props.className}>
           <ModalHeader toggle={() => this.setState({modalOpen : false})}>{this.state.modalTitle}</ModalHeader>
           <ModalBody>

            <form className=""  method="POST" onSubmit={this.state.action === 'edit' ? this.submitEditForm : this.AddUser}>

               <Row>
                  <Col md={4}>
                     <FormGroup>
                         <Label>First Name</Label>
                         <Input type="text" className="form-control" name="firstname" value={this.state.firstname}  onChange={this.InputOnChange} placeholder="Enter First Name"/>
                         <span id="err">{this.validator.message('First Name', this.state.firstname, 'required')}</span>
                     </FormGroup>
                  </Col>
                  <Col md={4}>
                     <FormGroup>
                         <Label>Last Name</Label>
                         <Input type="text" className="form-control" name="lastname" value={this.state.lastname}  onChange={this.InputOnChange} placeholder="Enter Last Name"/>
                         <span id="err">{this.validator.message('Last Name', this.state.lastname, 'required')}</span>
                     </FormGroup>
                  </Col>
                  <Col md={4}>
                     <FormGroup>
                         <Label>Position</Label>
                         <Input type="text" className="form-control" name="position" value={this.state.position}  onChange={this.InputOnChange} placeholder="Enter Position"/>
                         <span id="err">{this.validator.message('Position', this.state.position, 'required')}</span>
                     </FormGroup>
                  </Col>
               </Row>
               <Row>
                  <Col md={4}>
                     <FormGroup>
                         <Label>Type</Label>
                         <select className="form-control select2" name="type" value={this.state.type} onChange={this.InputOnChange}>
                             <option selected hidden>Select Type</option>
                             <option value="0">Admin</option>
                             <option value="1">Warehouse Manager</option>
                             <option value="2">Printing Department Manager</option>
                             <option value="3">Production Department Manager</option>
                             <option value="4">Marketing Department Manager</option>
                             <option value="5">Accounting Department Manager</option>
                         </select>
                         <span id="err">{this.validator.message('Type', this.state.type, 'required')}</span>
                     </FormGroup>
                  </Col>
                  <Col md={4}>
                     <FormGroup>
                         <Label>Username</Label>
                         <Input type="text" className="form-control" name="username" value={this.state.username}  onChange={this.InputOnChange} placeholder="Enter Username"/>
                         <span id="err">{this.validator.message('Username', this.state.username, 'required')}</span>
                     </FormGroup>
                  </Col>
                  <Col md={4}>
                     <FormGroup>
                         <Label>Password</Label>
                         <Input type="password" className="form-control" name="password"  value={this.state.password}  onChange={this.InputOnChange} readOnly={this.state.readOnly}/>
                     </FormGroup>
                  </Col>
               </Row>

                <ModalFooter>
                    <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.setState({modalOpen : false})}>Cancel</Button>
                    <Button type="submit" color="primary" className="btn btn-secondary waves-effect">{(this.state.action === 'Add') ? "Save" : "Save Changes"}</Button>
                </ModalFooter>

             </form>

           </ModalBody>
         </Modal>
        {/*FOR ACTIVATION*/}
            <Modal isOpen= {this.state.ActModal}>
                <ModalHeader toggle= {() => this.setState({ActModal : false})} ></ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to {this.state.deac_action ? 'enable' : 'disable'} this user?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color= "primary" className="btn btn-primary waves-effect" onClick={this.SubmitStatus}>Yes</Button>
                    <Button color= "secondary" onClick={ () => this.setState({ActModal : false})}>Cancel</Button>
                </ModalFooter>
            </Modal>
      </AUX>
    );
}

}

export default Users;
