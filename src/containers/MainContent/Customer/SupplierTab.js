import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import Config from '../../../config/Config';
import GroupButton from '../../CustomComponents/GroupButton';
import $ from 'jquery';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row ,Col } from 'reactstrap';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import qs from 'qs';
//import { Link } from 'react-router-dom';
//import Tinycharts from '../../Chartstypes/Tinycharts';

class Supplier_view extends Component {
   constructor(){
      super();
      this.state={ tin : '' , email:'', email_err:'', name:'',name_err:'', address:'',supplier_id : null,
             digits:'' , digits_err:'',address_err:'', data:[] , modalTitle : 'Add Supplier' , modalOpen : false , action : '',modalOpenDel:false, id:'', id_name:'',table_name:''}

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDigits = this.handleChangeDigits.bind(this);
        this.handleTxtarea = this.handleTxtarea.bind(this);
        this.updateSupplier = this.updateSupplier.bind(this);
        this.removeBtn = this.removeBtn.bind(this);
        this.validator = new SimpleReactValidator();
     }
        handleChangeEmail(e){
            this.setState({email:  e.target.value});
        }

        handleChangeName(e){
            this.setState({name:  e.target.value});
        }

        handleChangeDigits(e){
            this.setState({digits:  e.target.value});
        }

        handleTxtarea(e){
            this.setState({address: e.target.value});
        }

     componentDidMount(){
        this.GetSupplier();
        Alertify.defaults = Config.AlertConfig
     }

     toggleModal = () => {
         this.setState({
             modalOpen : !this.state.modalOpen
         })
     }

     toggleDel = (id, id_name,table_name) =>{
        this.setState({
           modalOpenDel : !this.state.modalOpenDel,
           id:id,
           id_name:id_name,
           table_name:table_name,
        })
        // console.log(this.state);
        // this.GetSupplier();
     }

     addSupplierBtn = async() => {
        await this.setState({
            action : 'Add' ,
            modalOpen : true,
            name:'',
            address:'',
            email:'',
            digits:''
        });
     }

    GetSupplier = async(e) => {
          let response;
          let temp_data =[];

              let url = Config.base_url + 'api/viewSupplier';
              response = await axios.post(url , '');
              // console.log(response);
              if (response.data) {
                  const m = response.data.map((key)=>  {
                     let groupBtn = [
                        { title: "Edit",icon: "ion-edit",color:"primary",function: () => this.editSupplierBtn(key.supplier_id)},
                        { title: "Remove" ,icon: "ion-trash-a",color:"secondary",function: () => this.toggleDel(key.supplier_id, "supplier_id","tbl_supplier")}
                     ];
                     let x = {
                       supplier_id: "SID"+key.supplier_id.padStart(5, "0"),
                       name: key.name,
                       email: key.email,
                       address:key.address,
                       contact_number:key.contact_number,
                       tin : key.tin,
                       date_updated:key.date_updated,
                       date_added:key.date_added,
                       action: <GroupButton data={groupBtn}/>

                    }
                    temp_data.push(x);
                  });
                  this.setState({data: temp_data})
              }else{
                   alert('failed');
              }
     }
     SubmitForm  = async(e) => {
       e.preventDefault();
       if (this.validator.allValid()) {
           let url = Config.base_url + 'api/addSupplier';
           const formData = new FormData(e.target),
           response = await axios.post(url , formData);
           if (response.data.success) {
              Alertify.success('Successfully added!');
              this.setState({name:'',address:'',digits:'',email:''})
              this.GetSupplier();
          }else{
               Alertify.error('Something went wrong!');
          }
      }else{
          this.validator.showMessages();
          this.forceUpdate();
      }

   }
     removeBtn = async() => {
         let remData = {
            id : this.state.id,
            id_name : this.state.id_name,
            table_name : this.state.table_name
         };
         let url = Config.base_url + 'api/moveToTrash';
         const response = await axios.post(url, qs.stringify(remData));
         if (response.data) {
            Alertify.success('Successfully Removed!');
            this.setState({modalOpenDel: false})

         }else {
            Alertify.error('Something went wrong!');
         }

         this.GetSupplier();
     }

     editSupplierBtn = async(supplier_id) => {
         await this.setState({modalTitle:'Edit Supplier' , modalOpen:true , action : 'Edit'});
         let url = Config.base_url + 'api/getSupplier/' + supplier_id,
         response = await axios.get(url);

         await this.setState({
               supplier_id : response.data.supplier_id,
               name: response.data.name,
               address: response.data.address,
               digits: response.data.contact_number,
               email : response.data.email,
               tin : response.data.tin
         });

     }

     updateSupplier = async(e) => {
         e.preventDefault();
         const { supplier_id } = this.state;
         let url = Config.base_url + 'api/updateSupplier/' + supplier_id,
         formData = new FormData(e.target);
         const response = await axios.post(url , formData);

        if (this.validator.allValid()) {
            if (response.data.success) {
                Alertify.success('Successfully updated!');
                this.GetSupplier();
                this.setState({modalOpen:false});
            }else{
                Alertify.success('Something went wrong!');
            }
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
     }



   render(){

      const data = {
           columns: [
             {
               label: 'ID',
               field: 'supplier_id',
               sort: 'asc',
               width: 150
             },
             {
               label: 'NAME',
               field: 'name',
               sort: 'asc',
               width: 270
             },
             {
               label: 'EMAIL',
               field: 'email',
               sort: 'asc',
               width: 200
             },
             {
               label: 'ADDRESS',
               field: 'address',
               sort: 'asc',
               width: 100
            },
            {
              label: 'Contact Number',
              field: 'contact_number',
              sort: 'asc',
              width: 200
            },
            {
              label: 'TIN',
              field: 'tin',
              sort: 'asc',
              width: 200
            },
             {
               label: 'DATE UPDATED',
               field: 'date_updated',
               sort: 'asc',
               width: 100
            },
             {
               label: 'DATE ADDED',
               field: 'date_added',
               sort: 'asc',
               width: 270
             },
             {
               label: 'ACTION',
               field: 'action',
               sort: 'asc',
               width: 100
             }
           ],
           rows: this.state.data
         };


      return(
           <AUX>
                 <Button type="button" className="btn btn-primary prime real-btn" onClick={this.addSupplierBtn}>Add Supplier</Button>
              <Row>

                <Col sm={12}>
                      <div className="card m-b-20">
                          <div className="card-body table_shift">
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

              {/*
                 <div className="row">
                     <div className="col-12">
                         <div className="card m-b-20">
                             <div className="card-body table_shift">
                                <Button type="button" className="btn btn-primary" onClick={this.addSupplierBtn}>Add Supplier</Button>
                                <br />
                                <br />
                                <MDBDataTable
                                     responsive
                                     bordered
                                     hover
                                     order={['supplier_id', 'asc' ]}
                                     data={data}
                                  />
                             </div>
                         </div>
                     </div>
                 </div>*/}



               <Modal isOpen={this.state.modalOpenDel} toggle={this.toggleDel} className={this.props.className}>
                 <ModalHeader toggle={this.toggleDel}>Remove Supplier</ModalHeader>
                 <ModalBody>
                     <p>Do you really want to remove this Supplier?</p>
                  <ModalFooter>
                       <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleDel}>Cancel</Button>
                       <Button type="submit" onClick={this.removeBtn} color="primary" className="btn btn-secondary waves-effect">Proceed</Button>
                  </ModalFooter>
                 </ModalBody>
               </Modal>


               <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
                 <ModalHeader toggle={this.toggleModal}>{this.state.modalTitle}</ModalHeader>
                 <ModalBody>
                   <form className="" action="#" method="POST" onSubmit={this.state.action === 'Add' ? this.SubmitForm : this.updateSupplier }>

                   <div className="form-group">
                       <label>Name</label>
                       <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChangeName} placeholder="Enter Name"/>
                       <span id="err">{this.validator.message('name', this.state.name, 'required')}</span>
                   </div>
                   <div className="form-group">
                       <label>TIN</label>
                       <input type="text" className="form-control" name="tin" value={this.state.tin} onChange={(e) => this.setState({tin : e.target.value})} placeholder="Enter TIN"/>
                       <span id="err">{this.validator.message('tin', this.state.tin, 'required')}</span>
                   </div>


                   <div className="form-group">
                       <label>Address</label>
                       <div>
                           <textarea name="address" value={this.state.address} onChange={this.handleTxtarea} className="form-control" rows="5"></textarea>
                           <span id="err">{this.validator.message('address', this.state.address, 'required')}</span>
                       </div>
                   </div>

                   <div className="form-group">
                   <label>Contact Number</label>
                       <div>
                           <input type="text" name="contact_number" value={this.state.digits} onChange={this.handleChangeDigits} className="form-control" placeholder="Enter contact Number"/>
                           <span id="err">{this.validator.message('contact number', this.state.digits, 'required')}</span>
                       </div>
                   </div>
                   <div className="form-group">
                       <label>E-Mail</label>
                       <div>
                           <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail}  className="form-control"  placeholder="Enter a valid e-mail"/>
                           <span id="err">{this.validator.message('email', this.state.email, 'required|email')}</span>

                       </div>
                   </div>
                   <ModalFooter>
                       <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleModal}>Cancel</Button>{' '}
                       <Button type="submit" color="primary" className="btn btn-secondary waves-effect">{this.state.action === 'Add' ? 'Save' : 'Save Changes'}</Button>
                   </ModalFooter>
                   </form>
                 </ModalBody>
               </Modal>

           </AUX>
      );
   }
}

export default Supplier_view;
