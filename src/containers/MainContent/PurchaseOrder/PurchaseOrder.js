import React , {Component} from 'react';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import GroupButton from '../../CustomComponents/GroupButton';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink, FormText } from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import Alertify from 'alertifyjs';
import classnames from 'classnames';
import SimpleReactValidator from 'simple-react-validator';
import qs from "qs";


class PurchaseOrder extends Component{

      constructor ( props ) {
         super( props );
         this.validator = new SimpleReactValidator();
         this.state = {
            editSupplier            : 0,
            modalOpen               : false,
            modalTitle              : '',
            isDisable               : [false],
            raw_id                  : [] ,
            raw_name                : ['Select Raw Mat'],
            supplier_id             : '0' ,
            supplier_name           : '',
            quantity                : [''],
            packaging_val           : [''],
            packaging_type :[],
            edit_quantity           : [],
            edit_packaging_val      : [],
            edit_packaging_type     : [],
            requested_by            : '',
            activeTab               : '1',
            po_data                 : [],
            Options                 : [],
            OptionsRaw              : [],
            ApproveModal            : false,
            amount                  : [],
            amount_error            : '',
            qty_received            : '',
            purchase_id             : null,
            edit_po_id              : [],
            EditModal               : false,
            quantityEdit            : [],
            po_data_declined        : [],
            inputFields             : ["1"],
            editInputFields         : [],
            viewModal               : false,
            viewInputFields         : [],
            arrInputFields          : [],
            total_amount            : 0,
            quantity_rcv            : [],
            view_po_id              : '',
            modalOpenDec            : false,
            po_dec_id               : '',
            total_qty_rcv           : '',
            approveFields           : [],
            addSelectSupplier       : 0,
            notes                   : [],
        }

         this.toggle                = this.toggle.bind(this);
         this.handleSelectChange    = this.handleSelectChange.bind(this);
         this.handleAddSecondInput  = this.handleAddSecondInput.bind(this);
         this.handleEditSecondInput = this.handleEditSecondInput.bind(this);
         this.handleApproveQTY      = this.handleApproveQTY.bind(this);
         this.handleApproveAmount   = this.handleApproveAmount.bind(this);
         this.toggleModal           = this.toggleModal.bind(this);
         this.handleQtyChange       = this.handleQtyChange.bind(this);
         this.handleEditItemUnit    = this.handleEditItemUnit.bind(this)

      }

    toggleModal(modal,method = null,params = {}){
        if(method){
            this[method](params);
        }
        this.setState({[modal]:!this.state[modal]});
    }

    componentDidMount () {
        this.getPurchaseOrder();
        this.getPurchaseOrderDecline();
        this.GetSupplier();
        this.getAllRaw();
        Alertify.defaults           = Config.AlertConfig


    }

    handleAddSecondInput() {
      this.validator.hideMessages();
      this.forceUpdate();
        this.setState({
           inputFields              : [...this.state.inputFields,this.state.inputFields.length+1],
           isDisable                : [...this.state.isDisable, true],
           supplier_id              : [this.state.supplier_id, ""],
           raw_id                   : [...this.state.raw_id, ""],
           supplier_name            : [this.state.supplier_name, "Select..."],
           raw_name                 : [...this.state.raw_name, "Select Raw Mat"],
           quantity                 : [...this.state.quantity, ""],
           item_unit                : [...this.state.item_unit, ""],
        })
    }

    handleEditSecondInput() {
      this.validator.hideMessages();
      this.forceUpdate();

      this.setState({
          editInputFields          : [...this.state.editInputFields,""],
          supplier_name            : [this.state.supplier_name, 'Select...'],
          raw_name                 : [...this.state.raw_name, 'Select Raw Mat'],
          supplier_id              : [this.state.supplier_id, ""],
          raw_id                   : [...this.state.raw_id, ""],
          edit_quantity            : [...this.state.edit_quantity, ""],
          packaging_type           : [...this.state.packaging_type, ""],
      })
    }

    handlFields(e, index){
      this.state.inputFields[index] = e.target.value

      this.setState({inputFields: this.state.inputFields})
   }

      handleRemove(index){
         this.state.inputFields.splice(index, 1)
         this.state.raw_name.splice(index, 1)
         this.state.quantity.splice(index, 1)
         this.state.item_unit.splice(index, 1)
         this.setState({
            inputFields       : this.state.inputFields,
            supplier_id       : this.state.supplier_id,
            raw_name          : this.state.raw_name,
            raw_id            : this.state.raw_id,
            quantity          : this.state.quantity,
            item_unit         : this.state.item_unit,
         })

      }

      EdithandleRemove(index){
         this.state.editInputFields.splice(index, 1)

         this.state.raw_name.splice(index, 1)
         this.state.edit_quantity.splice(index, 1)
         this.state.packaging_type.splice(index, 1)
         this.setState({
            editInputFields   : this.state.editInputFields,
            supplier_id       : this.state.supplier_id,
            raw_name          : this.state.raw_name,
            raw_id            : this.state.raw_id,
            quantity          : this.state.edit_quantity,
            item_unit         : this.state.edit_item_unit,
        });

      }

      toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
    }

      getAllRaw = async() =>{
         let temp_data =[];
         let url = Config.base_url + '/api/viewRaw';
         let response = await axios.post(url , '');

         if (response.data) {
            this.forceUpdate();
            response.data.map((data , idx) => {
               let Options = {
                 value : data.raw_id,
                 label : data.material_name
               }
               temp_data.push(Options);
            });
            await this.setState({OptionsRaw: temp_data});
         }else{
            alert('failed');
         }
      }

      handleSelectChange = async(newValue, actionMeta) => {
          this.setState({
            editSupplier : newValue
          })
         // this.state.supplier_id[actionMeta]        = (newValue ? newValue.value : '');
         // this.state.supplier_name[actionMeta]      = (newValue ? newValue.label : '');
         //
         // if(this.state.supplier_id[actionMeta]){
         //
         //    this.state.isDisable[actionMeta]       = false
         //    await this.setState({isDisable: this.state.isDisable});
         //
         //    let temp_data =[];
         //    let url = Config.base_url + '/api/viewRaw/' + newValue.value;
         //    let response = await axios.post(url , '');
         //
         //    if (response.data) {
         //       this.forceUpdate();
         //       response.data.map((data , idx) => {
         //          let Options = {
         //            value : data.raw_id,
         //            label : data.material_name
         //          }
         //          temp_data.push(Options);
         //       });
         //       await this.setState({OptionsRaw: temp_data});
         //    }else{
         //       alert('failed');
         //    }
         //
         // }else{
         //    this.state.isDisable[actionMeta] = true;
         //    await this.setState({isDisable: this.state.isDisable, supplier_id: this.state.supplier_id});
         //    this.validator.showMessages();
         //    this.forceUpdate();
         // }


      } // end handleSelectChange

        addPurchaseSelectChange(data){
            this.setState({
                addSelectSupplier : data
            });
        }

      handleSelectChangeRaw = async(newValue, actionMeta) => {
         this.state.raw_id[actionMeta]     = (newValue ? newValue.value : '')
         this.state.raw_name[actionMeta]   = (newValue ? newValue.label : '')

         if(this.state.raw_id[actionMeta]){
            this.state.isDisable[actionMeta] = false
            await this.setState({isDisable   : this.state.isDisable});
         }else{
            this.validator.showMessages();
            this.forceUpdate();
         }
      }

      checkPOstatus = (id , po_id) => {
         let groupBtn = [
            { title: "Approve",icon: "ion-checkmark",color:"primary", disabled : false,function: () => this.ApproveBtn(po_id)},
            { title: "Decline" ,icon: "ion-close",color:"secondary", disabled : false,function: () => this.DeclineModalToggle(po_id)},
            { title: "Edit" ,icon: "ion-edit",color:"info", disabled : false,function: () => this.EditPO(po_id)},
            { title: "View" ,icon: "ion-eye",color:"warning", disabled : false,function: () => this.viewPO(po_id)},
         ];
         let groupBtn2 = [
            { title: "Approved",icon: "ion-checkmark-circled",color:"success" , disabled : true},
            { title: "View" ,icon: "ion-eye",color:"warning", disabled : false,function: () => this.viewPO(po_id)},
         ];
        switch (id) {
            case '0':
                return(
                     <GroupButton data={groupBtn}/>
                    // <ButtonGroup>

                      // <Button className="btn-primary btn waves-effect waves-light btn_spec" title="Approve" onClick={() => this.ApproveBtn(po_id)}><i className="ion-checkmark"></i></Button>
                      // <Button className="btn-secondary btn waves-effect waves-light btn_spec" title="Decline" onClick={() => this.DeclineModalToggle(po_id)}>
                      //  <i className="ion-close"></i></Button>
                      // <Button className="btn-info btn waves-effect waves-light btn_spec" title="Edit" onClick={() => this.EditPO(po_id)}>
                      // <i className="ion-edit"></i></Button>
                      // <Button className="btn-warning btn waves-effect waves-light btn_spec btn_spec_eye" title="View" onClick={() => this.viewPO(po_id)}><i className="ion-eye"></i></Button>

                    // </ButtonGroup>
                )
            break;
            case '1':
                return(
                   <GroupButton data={groupBtn2}/>
                    // <ButtonGroup>
                    // <Button disabled color={'success'} className="no_hover btn_spec" ><i className="ion-checkmark-circled"></i></Button>
                    // <Button className="btn-warning btn waves-effect waves-light btn_spec btn_spec_eye" onClick={() => this.viewPO(po_id)}><i className="ion-eye"></i></Button>
                    // </ButtonGroup>
                )
            break;
        default:
        }
      }

        convertDate =(date) =>{
            var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var newDate = new Date(date);
            var month = newDate.getMonth() - 1;
            var day   = newDate.getDate();
            var year = newDate.getFullYear();
            return  months_arr[month] +" "+day+", "+year;
        }

      getPurchaseOrder = async() =>{
        let po_temp = [];

        let url = Config.base_url + 'purchase/getPurchaseOrder';
        const response = await axios.get(url);
        await this.setState({testdata : response.data});

        if (response.data.success) {
           response.data.po_data.map((data , idx) => {
               let string_holder = data.quantity.split("|");
               let qty_total = 0;
               for (var i = 0; i < string_holder.length; i++) {qty_total = qty_total + parseInt(string_holder[i]);}
               let string_holder_1 = data.received_quantity.split("|");
               let qty_total_1 = 0;
               for (var i = 0; i < string_holder_1.length; i++) {qty_total_1 = qty_total_1 + parseInt(string_holder_1[i]);}
               let string_holder_2 = data.amount.split("|");
               let total_amount_col = 0;
               for (var i = 0; i < string_holder_2.length; i++) {total_amount_col = total_amount_col + parseInt(string_holder_2[i]);}
               let order = {
                   name                   : "POID" + data.po_id.padStart(5, "0"),
                   quantity               : qty_total.toLocaleString('en'),
                   received_quantity      : qty_total_1.toLocaleString('en'),
                   price                  : total_amount_col.toLocaleString('en'),
                   date_requested         : this.convertDate(data.date_requested),
                   requested_by           : data.requested_by,
                   date_received          : this.convertDate(data.date_received),
                   received_by            : data.received_by,
                   action                 : this.checkPOstatus(data.status , data.po_id)
               }
               po_temp.push(order);
           })

           this.setState({po_data : po_temp });
        }else{
          this.setState({po_data_declined : [] });
        }
     } // end getPurchaseOrder


      getPurchaseOrderDecline = async() =>{
        let po_temp = [];
        let url = Config.base_url + 'purchase/getPurchaseOrderDecline';
        const response = await axios.get(url);
        if (response.data.success) {
           response.data.po_data.map((data , idx) => {
            let string_holder = data.quantity.split("|");
            let qty_total = 0;
            for (var i = 0; i < string_holder.length; i++) {
               qty_total = qty_total + parseInt(string_holder[i]);
            }
            let string_holder_1 = data.received_quantity.split("|");
            let qty_total_1 = 0;
            for (var i = 0; i < string_holder_1.length; i++) {
               qty_total_1 = qty_total_1 + parseInt(string_holder_1[i]);
            }
             let order = {
                name               : "POID" + data.po_id.padStart(5, "0"),
                quantity            : qty_total.toLocaleString('en'),
                received_quantity   : qty_total_1,
                price               : data.amount,
                date_requested      : data.date_requested,
                requested_by        : data.requested_by,
                date_received       : data.date_received,
             }
             po_temp.push(order);
          })
          this.setState({po_data_declined : po_temp });
       }else{
          this.setState({po_data_declined : [] });
       }

    } // end getPurchaseOrderDecline

      toggleModal = () => {
          this.setState({
              modalOpen : !this.state.modalOpen
          })
      }

      viewModalToggle = () => {
          this.setState({
              viewModal : !this.state.viewModal
          })
      }

      ApproveModalToggle = () => {
          this.setState({
             ApproveModal : !this.state.ApproveModal
          });
      }

      DeclineModalToggle = (po_id) => {
          this.setState({
             modalOpenDec : !this.state.modalOpenDec,
             po_dec_id    : po_id
          });
      }


      addPurchaseOrderBtn = async() => {
         this.validator.hideMessages();
         this.forceUpdate();
         await this.setState({
             action           :'Add' ,
             modalTitle       :'Add Purchase Order',
             modalOpen        :true,
             name             :'',
             quantity         :[],
             item_unit        :[],
             supplier_name    :"Select...",
             raw_name         :["Select Raw Mat."],
             inputFields      :["1"]
         });
      }


      handleQuantity = (e, index) => {
         this.state.quantity[index]    = e.target.value
         this.setState({quantity       :  this.state.quantity});
      }
      handleEditQuantity = (e, index) => {
         this.state.edit_quantity[index]    = e.target.value
         this.setState({edit_quantity       :  this.state.edit_quantity});
      }

      handleItemUnit = (e, index) => {
          this.state.packaging_val[index]  = e.target.value
          this.setState({packaging_val : this.state.packaging_val});
      }
      handleNote = (e, index) => {
          this.state.notes[index]  = e.target.value
          this.setState({notes     : this.state.notes});

      }

      handleQtyChange = (e , idx) => {
          this.state.quantity[idx] = e.target.value;
          this.setState({
                quantity :   this.state.quantity
          });
      }

      handleEditItemUnit = (e, index) => {
        this.state.edit_packaging_val[index]  = e.target.value
        this.setState({edit_packaging_val     : this.state.edit_packaging_val});
      }

      handleRequestedBy = (e) => {
          this.setState({requested_by : e.target.value});
      }

      SubmitForm = async(e) => {
          e.preventDefault();

         if (this.validator.allValid()) {
            this.forceUpdate();
            let url = Config.base_url + 'purchase/addPurchase';
            const formData = new FormData(e.target);

            const response = await axios.post(url , formData);

            if (response.data.success) {
               this.setState({
                  quantity       : [''],
                  packaging_val  : [''],
                  requested_by   : '',
                  supplier_id    : [],
                  raw_id         : [],
                  raw_name       : ["Select..."],
                  inputFields    : ["1"],
               });

               this.validator.hideMessages();
               this.forceUpdate();
               Alertify.success('Successfully added!');
               this.getPurchaseOrder();
            }else{
                 Alertify.error('Something went wrong!');
            }

         } else {

            this.validator.showMessages();
            this.forceUpdate();
         }

      } // end SubmitForm

      GetSupplier = async() => {
          let url = Config.base_url + 'api/viewSupplier';
          let response = await axios.get(url);
          let temp_data = [];
          response.data.map((data , idx) => {
                 let Options = {
                     value : data.supplier_id,
                     label : data.name
                 }
             temp_data.push(Options);
          });

          this.setState({ Options: temp_data });
      }

      EditModalToggle = () =>{
          this.setState({
              EditModal : !this.state.EditModal
          });
      }

      EditInputChange = (e) => {
         this.setState({
             [e.target.name] : e.target.value
         });
      }

        DeclinePO = async() => {
            let url = Config.base_url + 'purchase/declinePO/' + this.state.po_dec_id;
            const response = await axios.post(url);

            if (response.data.success) {
                this.setState({modalOpenDec : false});
                this.getPurchaseOrder();
                this.getPurchaseOrderDecline();
                Alertify.success(response.data.success);
            }else {
                Alertify.success(response.data.error);
            }
        }

        viewPO = async(po_id) => {
            this.setState({viewInputFields: []})
            let url = Config.base_url + 'purchase/getPO/' + po_id;
            const response = await axios.get(url);


            let int = 0;
            if (response.data.success) {
               for (let i = 0; i < response.data.po_data['quantity'].length; i++) {
                  this.setState({viewInputFields: [...this.state.viewInputFields,""]})
               }

                this.setState({
                    viewModal       : true,
                    edit_po_id      : response.data.po_data['po_id'],
                    packaging_type  : response.data.po_data['packaging_type'],
                    quantity        : response.data.po_data['quantity'],
                    quantity_rcv    : response.data.po_data['received_quantity'],
                    total_qty_rcv   : response.data.po_data['total_quantity'],
                    total_amount    : response.data.po_data['total_amount'],
                    supplier_id     : response.data.po_data['supplier_id'],
                    supplier_name   : response.data.po_data['supplier_name'],
                    raw_name        : response.data.po_data['raw_name'],
                    raw_id          : response.data.po_data['raw_id'],
                });
               int++;
            }

        }

        ApproveBtn = async(po_id) => {
           this.setState({approveFields: [] , quantity_rcv:[], amount:[]})

           let url = Config.base_url + 'purchase/getPO/' + po_id;
           const response = await axios.get(url);
           let int = 0;

           if (response.data.success) {

             for (let i = 0; i < response.data.po_data['quantity'].length; i++) {
                 this.setState({approveFields: [...this.state.approveFields,""]})
             }
               this.setState({
                   ApproveModal    : true,
                   edit_po_id      : response.data.po_data['po_id'],
                   packaging_val   : response.data.po_data['packaging_val'],
                   packaging_type  : response.data.po_data['packaging_type'],
                   quantity        : response.data.po_data['quantity'],
                   supplier_id     : response.data.po_data['supplier_id'],
                   supplier_name   : response.data.po_data['supplier_name'],
                   raw_name        : response.data.po_data['raw_name'],
                   raw_id          : response.data.po_data['raw_id'],
               });
             int++;
           }
        }

        EditPO = async(po_id) => {
            this.forceUpdate();
            this.setState({editInputFields: []})
            let url = Config.base_url + 'purchase/getPO/' + po_id;
            const response = await axios.get(url);

            if (response.data.success) {

               for (let i = 0; i < response.data.po_data['quantity'].length; i++) {
                  this.setState({editInputFields: [...this.state.editInputFields,""]})
               }
               let val = {
                   value : response.data.po_data['supplier_id'][0],
                   label :response.data.po_data['supplier_name']
               };

                this.setState({
                    EditModal            : true,
                    quantity             :['0'],
                    supplier_id          : response.data.po_data['supplier_id'],
                    edit_po_id           : response.data.po_data['po_id'],
                    edit_packaging_val   : response.data.po_data['packaging_val'],
                    edit_packaging_type  : response.data.po_data['packaging_type'],
                    edit_quantity        : response.data.po_data['quantity'],
                    editSupplier         : val,
                    raw_name             : response.data.po_data['raw_name'],
                    raw_id               : response.data.po_data['raw_id'],
                });
            }

        }

        EditFormSubmit = async(e) => {
            e.preventDefault();

            if (this.validator.allValid()) {

               this.forceUpdate();
               const {edit_po_id} = this.state;
               let url = Config.base_url + 'purchase/EditPO'
               let formData = new FormData(e.target);
               formData.append('edit_po_id' , edit_po_id );
               const response = await axios.post(url , formData);
               if (response.data.success) {
                   this.getPurchaseOrder();
                   Alertify.success(response.data.success);
                   this.setState({
                       EditModal : false
                   });
               }
            }else{
               this.validator.showMessages();
               this.forceUpdate();
            }
        }

        handleApproveQTY(e, index){
            this.state.quantity_rcv[index] = e.target.value
            this.setState({quantity_rcv: this.state.quantity_rcv});
        }

        handleApproveAmount(e , index){
            this.state.amount[index] = e.target.value
            this.setState({amount: this.state.amount});
        }

        selectChange(e , idx){
            this.state.edit_packaging_type[idx] = e.target.value;
            this.setState({
                edit_packaging_type : this.state.edit_packaging_type
            });


        }

        SaveApprove = async(e) => {
            e.preventDefault();
            if (this.validator.allValid()) {
                const { edit_po_id } = this.state;
                let url = Config.base_url + 'purchase/SaveApproveChanges';
                let formData = new FormData(e.target);
                formData.append('purchase_id' , edit_po_id);
                formData.append('received_by' , Helper.getUserDetail('username'));
                const response = await axios.post(url , formData);

                if (response.data.success) {
                    Alertify.success(response.data.success);
                    this.getPurchaseOrder();
                    this.forceUpdate();
                    this.setState({ApproveModal : false , quantity_rcv:[], amount:[] })
                }
                //console.log(this.state.quantity_rcv);
            }else{
                this.validator.showMessages();
                this.forceUpdate();
            }
        }

      render(){
         let total = 0;
         let total_rcv = 0;
         const data = {
            columns: [
                {label: 'PO ID',                    field: 'name'               ,sort: 'asc'    ,width: 150},
                {label: 'Qty',                      field: 'quantity'           ,sort: 'asc'    ,width: 200},
                {label: 'Qty Rcvd',                 field: 'received_quantity'  ,sort: 'asc'    ,width: 200},
                {label: 'Amount',                   field: 'price'              ,sort: 'asc'    ,width: 200},
                {label: 'Date Req',                 field: 'date_requested'     ,sort: 'asc'    ,width: 200},
                {label: 'Req By',                   field: 'requested_by'       ,sort: 'asc'    ,width: 200},
                {label: 'Date Rcvd',                field: 'date_received'      ,sort: 'asc'    ,width: 200},
                {label: 'Rcvd By',                  field: 'received_by'        ,sort: 'asc'    ,width: 200},
                {label: 'Action',                   field: 'action'             ,sort: 'asc'    ,width: 200},
            ],
                rows: this.state.po_data
            };

            const dataArchived = {
            columns: [
                {label: 'PO ID',                    field: 'name'               ,sort: 'asc'     ,width: 150},
                {label: 'Qty',                      field: 'quantity'           ,sort: 'asc'     ,width: 200},
                {label: 'Qty Rcvd',                 field: 'received_quantity'  ,sort: 'asc'     ,width: 200},
                {label: 'Amount',                   field: 'price'              ,sort: 'asc'     ,width: 200},
                {label: 'Date Req',                 field: 'date_requested'     ,sort: 'asc'     ,width: 200},
                {label: 'Req By',                   field: 'requested_by'       ,sort: 'asc'     ,width: 200},
                {label: 'Date Rcvd',                field: 'date_received'      ,sort: 'asc'     ,width: 200},
            ],
                rows: this.state.po_data_declined
            };
         return(
            <AUX>
            <div className="row">
                <div className="col-sm-12">
                    <div className="page-title-box">
                        <h4 className="page-title">Purchase Order</h4>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                               PurchaseOrder
                            </li>
                        </ol>
                    </div>
                    <div className="page-btn">
                       <Button type="button" className="btn btn-primary real-btn" onClick={this.addPurchaseOrderBtn}>Add Purchase Order</Button>
                    </div>
                </div>
            </div>

            {/*Navigation*/}
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Purchase Order
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                 Archived Order
                </NavLink>
              </NavItem>
            </Nav>
            {/*End Navigation*/}

            {/*Add Purchase Order Tab*/}
            <TabContent activeTab={this.state.activeTab}>
               <TabPane tabId="1">
                  <div className="row">
                     <div className="col-12">
                          <div className="card m-b-20">
                              <div className="card-body table_shift" >
                                 <MDBDataTable
                                    className=""
                                    responsive
                                    bordered
                                    hover
                                    data={data}
                                 />

                              </div>
                          </div>
                     </div>
                  </div>
               </TabPane>
               <TabPane tabId="2">
                  <div className="row">
                     <div className="col-12">
                        <div className="card m-b-20">
                           <div className="card-body" >
                                <MDBDataTable
                                    bordered
                                    hover
                                    data={dataArchived}
                                 />
                           </div>
                        </div>
                     </div>
                  </div>
               </TabPane>
            </TabContent>
            {/*End Add Purchase Order Tab*/}

            {/*Edit Modal gi lain lang pd nako*/}
            <Modal size="xl" isOpen={this.state.EditModal} toggle={this.EditModalToggle} className={this.props.className}>
               <ModalHeader toggle={this.EditModalToggle}> Edit Purchase Order</ModalHeader>
               <ModalBody>
                   <Form method="POST" onSubmit={this.EditFormSubmit}>   {/* Dynamic Fields*/}
                   <Row>
                      <Col md={3}>
                        <FormGroup>
                           <Label for="supplier">Supplier</Label>

                           <CreatableSelect
                              isClearable
                              name           = "supplier"
                              onChange       = {(e)=>this.handleSelectChange(e)}
                              options        = {this.state.Options}
                              value          = {this.state.editSupplier}
                           />

                           <span id="err">{this.validator.message('supplier name', this.state.editSupplier, 'required')}</span>
                        </FormGroup>
                      </Col>
                   </Row>
                   <Row className="headerMd">
                      <Col md={3}>
                        <Label for="raw_name">Raw Material</Label>
                      </Col>
                      <Col md={3}>
                        <Label for="raw_name">Quantity in pcs</Label>
                      </Col>
                      <Col md={3}>
                        <Label for="raw_name">Packaging <span>(Ex: pcs,box...)</span></Label>
                      </Col>
                      <Col md={3}>
                        <Label for="raw_name">Notes</Label>
                      </Col>
                   </Row>
                     {
                        this.state.editInputFields.map((x,indexs)=>{

                           return(
                              <div className="addNew" key={indexs}>


                                 <Row>
                                    <Col md={3}>
                                          <CreatableSelect
                                             isClearable
                                             name           = "raw_name[]"
                                             onChange       = {(e)=>this.handleSelectChangeRaw(e, indexs)}
                                             options        = {this.state.OptionsRaw}
                                             value          = {[{value : this.state.raw_id[indexs], label : this.state.raw_name[indexs]}]}
                                          />
                                          <span id="err">{this.validator.message('raw material data', this.state.raw_id[indexs], 'required')}</span>

                                    </Col>

                                    <Col md={3} >
                                         <Input type="text" name="quantity[]" id="quantity" placeholder="Enter Quantity" value={this.state.edit_quantity[indexs]} onChange={(e)=>this.handleEditQuantity(e, indexs)}/>
                                         <span id="err">{this.validator.message('quantity in pcs', this.state.edit_quantity[indexs], 'required|numeric')}</span>

                                    </Col>

                                    <Col md={3}>
                                         <FormGroup className="packaging-group">
                                         <Input type="text" className="packaging-val"  name="packaging_val[]" id="edit_packaging_val" placeholder="Enter Amount" value={this.state.edit_packaging_val[indexs]} onChange={(e)=>this.handleEditItemUnit(e, indexs)}/>
                                             <select name="packaging_type[]" value={this.state.edit_packaging_type[indexs]} onChange= {(e) => this.selectChange(e, indexs)}>
                                                <option value="pcs">pcs</option>
                                                <option value="gal">gal</option>
                                                <option value="dia">dia</option>
                                             </select>
                                       </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                         <Input  type="text" name="note[]" id="note" placeholder="Enter Special Instructions" value={this.state.notes[indexs]} onChange={(e)=>this.handleNote(e, indexs)}/>
                                    </Col>
                                    <Col md={1} >
                                       <div className="removeBtnParent">
                                         <button type="button" className="btn btn-danger btn-sm removeBtn" onClick={()=>this.EdithandleRemove(indexs)}>
                                            <span style={{display:'none'}} className="removeAddedPO">Remove</span>
                                            <span className="removeAddedPOicon">X</span>
                                         </button>
                                       </div>
                                    </Col>

                                 </Row>
                              </div>
                           );
                        })
                     }


                     <Row>
                        <Col md={6} >
                            <FormGroup>
                               <Input type="hidden" name="requested_by" id="requested_by" placeholder="Enter Requested By" value="Admin" />
                            </FormGroup>
                        </Col>
                    </Row>


                     <Row>
                         <Col md={12} >
                            <Button className="addMoreMaterials" onClick={(e)=>this.handleEditSecondInput(e)} type="button"><i class="ion-plus"></i> Add More</Button>
                            <br />
                            <br />
                         </Col>
                     </Row>

                     <br />
                       <ModalFooter>
                           <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.EditModalToggle}>Cancel</Button>{' '}
                           <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save Changes</Button>
                       </ModalFooter>

                  </Form>
               </ModalBody>
            </Modal>
            {/*END edit MODAL*/}

            {/*Edit VIEW gi lain lang pd nako 925*/}
            <Modal size="xl" isOpen={this.state.viewModal} toggle={this.viewModalToggle} className={this.props.className}>
               <ModalHeader toggle={this.viewModalToggle}> View Purchase Order</ModalHeader>

               <ModalBody>
               <Row>
                   <Col md={3}>
                      <FormGroup>
                        <Label for=""><strong>PO ID: </strong> {"POID"+String(this.state.edit_po_id).padStart(5, "0")}</Label>
                        <h5></h5>
                      </FormGroup>
                   </Col>
               </Row>

               <Row>
                    <Col md={4}>
                        <div className="p-2 font-16">Supplier:  <span>{this.state.supplier_name}</span> </div>
                    </Col>
               </Row>

                  <div className="row">
                     <div className="col-12">
                          <div className="p-2">
                            <h3 className="font-16"><strong>Purchase Order Summary</strong></h3>
                          </div>
                          <table className="table ">
                             <thead>
                             <tr>
                                  <td className="text-center"><strong>Raw Material</strong></td>
                                  <td className="text-center"><strong>Quantity in pcs</strong></td>
                                  <td className="text-right"><strong>Packaging</strong></td>
                                  <td className="text-right"><strong>Received Quantity</strong></td>
                             </tr>
                             </thead>
                             <tbody>

                             {
                                 this.state.viewInputFields.map((x,index)=>{
                                    total = parseInt(total) + parseInt(this.state.quantity[index]);
                                    total_rcv =  parseInt(total_rcv) + parseInt(this.state.quantity_rcv[index]);

                                    return(
                                       <tr>
                                            <td className="text-center">{this.state.raw_name[index]}</td>
                                            <td className="text-center">{this.state.quantity[index]}</td>
                                            <td className="text-right">{this.state.packaging_type[index]}</td>
                                            <td className="text-right">{this.state.quantity_rcv[index]}</td>
                                       </tr>
                                    )
                                 })

                             }

                             <tr>
                                  <td className="thick-line"></td>
                                  <td className="thick-line"></td>
                                  <td className="thick-line text-center">
                                      <strong>Total Quantity</strong></td>
                                  <td className="thick-line text-right"><strong>{total.toLocaleString('en')}</strong></td>
                             </tr>
                             <tr>
                                  <td className="no-line"></td>
                                  <td className="no-line"></td>
                                  <td className="no-line text-center">
                                      <strong>Total Quantity Received</strong></td>
                                  <td className="no-line text-right">{!isNaN(total_rcv)?total_rcv.toLocaleString('en'):0}</td>
                             </tr>
                             <tr>
                                  <td className="no-line"></td>
                                  <td className="no-line"></td>
                                  <td className="no-line text-center">
                                      <strong>Total Amount</strong></td>
                                  <td className="no-line text-right"><h4 className="m-0">{!isNaN(parseInt(this.state.total_amount)) ?parseInt(this.state.total_amount).toLocaleString('en'):"N/A"}</h4></td>
                             </tr>
                             </tbody>
                          </table>

                     </div>
                  </div>
               </ModalBody>
            </Modal>
            {/*END VIEW MODAL*/}
            {/*Add PO MODAL*/}
            <Modal size="xl" isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
               <ModalHeader toggle={this.toggleModal}>{this.state.modalTitle}</ModalHeader>
               <ModalBody>
                  <Form method="POST" onSubmit={this.SubmitForm}>
                  <Row>
                     <Col md={3}>
                        <FormGroup>
                           <Label for="supplier">Supplier</Label>
                           <CreatableSelect
                              isClearable
                              name              = "supplier"
                              onChange          = {(e)=>this.addPurchaseSelectChange(e)}
                              options           = {this.state.Options}
                              value          = {this.state.addSelectSupplier}
                           />
                       <span id="err">{this.validator.message('supplier', this.state.addSelectSupplier, 'required')}</span>
                        </FormGroup>
                     </Col>
                  </Row>
                  <Row className="headerMd">
                     <Col md={3}>
                       <Label for="raw_name">Raw Material</Label>
                     </Col>
                     <Col md={2}>
                       <Label for="raw_name">Quantity in pcs</Label>
                     </Col>
                     <Col md={3}>
                       <Label for="raw_name">Packaging per</Label>
                     </Col>
                     <Col md={3}>
                       <Label for="raw_name">Notes</Label>
                     </Col>
                  </Row>
                     {/* Dynamic Fields*/}
                     {
                        this.state.inputFields.map((fields,index)=>{
                           return(
                              <div className="addNew" key={index}>


                                 <Row>

                                    <Col md={3}>
                                          <CreatableSelect
                                             isClearable
                                             name              = "raw_name[]"

                                             onChange          = {(e)=>this.handleSelectChangeRaw(e, index)}
                                             options           = {this.state.OptionsRaw}
                                             value          = {[{
                                                                  value : this.state.raw_id[index],
                                                                  label : this.state.raw_name[index]
                                                               }]}
                                          />
                                          <span id="err">{this.validator.message('Raw_material', this.state.raw_id[index], 'required')}</span>

                                    </Col>

                                    <Col md={2} >
                                         <Input type="text" name="quantity[]" id="quantity" placeholder="Enter Quantity" value={this.state.quantity[index]} onChange={(e)=>this.handleQuantity(e, index)} />
                                         <span id="err">{this.validator.message('quantity', this.state.quantity[index], 'required|numeric')}</span>

                                    </Col>

                                    <Col md={3}>
                                         <FormGroup className="packaging-group">
                                          <Input type="text" className="packaging-val"  name="packaging_val[]" id="packaging_val" placeholder="Enter Amount" value={this.state.packaging_val[index]} onChange={(e)=>this.handleItemUnit(e, index)}/>
                                          <select name="packaging_type[]">
                                             <option value="pcs">pcs</option>
                                             <option value="gal">gal</option>
                                             <option value="dia">dia</option>
                                           </select>
                                        </FormGroup>
                                    </Col>

                                    <Col md={3}>
                                         <Input  type="text" name="note[]" id="note" placeholder="Enter Special Instructions" value={this.state.notes[index]} onChange={(e)=>this.handleNote(e, index)}/>
                                    </Col>
                                    <Col md={1} >
                                       <div className="removeBtnParent">
                                          <button type="button" className="btn btn-danger removeBtn btn-sm" style={{display: fields == 1 ? 'none' : '' }} onClick={()=>this.handleRemove(index)}>
                                             <span style={{display:'none'}} className="removeAddedPO">Remove</span>
                                             <span className="removeAddedPOicon">X</span>
                                          </button>

                                       </div>
                                    </Col>
                                 </Row>
                              </div>
                           )
                        })
                     }
                     {/* End Dynamic Fields*/}


                     <Row>
                        <Col md={6} >
                            <FormGroup>
                               <Input type="hidden" name="requested_by" id="requested_by" placeholder="Enter Requested By" value="Admin" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} >
                           <Button className="addMoreMaterials" onClick={(e)=>this.handleAddSecondInput(e)} type="button"><i class="ion-plus"></i> Add More Materials</Button>
                           <br />
                           <br />
                        </Col>
                    </Row>

                    <ModalFooter>
                       <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleModal}>Cancel</Button>{' '}
                       <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save</Button>
                    </ModalFooter>

                  </Form>
               </ModalBody>
            </Modal>
            {/*END Add PO MODAL*/}

            {/*DECLINE CONFIRMATION*/}
            <Modal isOpen={this.state.modalOpenDec} toggle={this.DeclineModalToggle} className={this.props.className}>
             <ModalHeader toggle={this.DeclineModalToggle}>Decline Purchase Order</ModalHeader>
             <ModalBody>
                  <p>Do you really want to decline this Purchase Order?</p>
               <ModalFooter>
                    <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.DeclineModalToggle}>Cancel</Button>
                    <Button type="submit" onClick={this.DeclinePO} color="primary" className="btn btn-secondary waves-effect">Proceed</Button>
               </ModalFooter>
             </ModalBody>
            </Modal>
            {/*END DECLINE CONFIRMATION*/}


            {/* Approval MODAL*/}
            <Modal size="xl" isOpen={this.state.ApproveModal} toggle={this.ApproveModalToggle} className={this.props.className}>
               <ModalHeader toggle={this.ApproveModalToggle}>Approval Form</ModalHeader>
               <ModalBody>
                   <Form method="POST" onSubmit={this.SaveApprove}>
                        <Row>
                         <Col md={2}>
                           <FormGroup>
                              <Label for="item_id">Supplier Name</Label>
                              <h6>{this.state.supplier_name}</h6>
                           </FormGroup>
                         </Col>
                        </Row>
                        <hr />
                     {
                        this.state.approveFields.map((x,idx)=>{
                           return(
                              <div key={idx}>
                                 <Row>

                                    <Col md={2}>
                                       <FormGroup>
                                          <Label for="item_id">Raw Material</Label>
                                          <h6>{this.state.raw_name[idx]}</h6>
                                       </FormGroup>
                                    </Col>

                                    <Col md={2} >
                                       <FormGroup>
                                         <Label for="po_number">Quantity in pcs</Label>
                                        <h6>{this.state.quantity[idx]}</h6 >
                                       </FormGroup>
                                    </Col>

                                    <Col md={2} >
                                       <FormGroup>
                                         <Label for="quantity_rcv[]">Quantity Received</Label>
                                         <Input value={this.state.quantity_rcv[idx]} type="text" name="quantity_rcv[]" id="quantity_rcv" placeholder="Enter Quantity Received"  onChange={(e)=>this.handleApproveQTY(e, idx)} />
                                        <span id="err">{this.validator.message('quantity receieved', this.state.quantity_rcv[idx], 'required|numeric')}</span>
                                       </FormGroup>
                                    </Col>

                                    <Col md={2} >
                                       <FormGroup>
                                         <Label for="amount">Amount</Label>
                                         <Input value={this.state.amount[idx]} type="text" name="amount[]" id="amount" placeholder="Enter Quantity"  onChange={(e)=>this.handleApproveAmount(e, idx)} />
                                         <span id="err">{this.validator.message('amount', this.state.amount[idx], 'required|numeric')}</span>
                                       </FormGroup>
                                    </Col>

                                    <Col md={2} >
                                       <FormGroup>
                                         <Label for="amount">Packaging per</Label>
                                         <Input value={this.state.packaging_val[idx]} type="text" name="packaging_val[]" id="packaging_val" placeholder="Enter Quantity"  onChange={(e)=>this.handleItemUnit(e, idx)} />
                                         <span id="err">{this.validator.message('packaging value', this.state.packaging_val[idx], 'required|numeric')}</span>
                                       </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                       <FormGroup>
                                         <Label for="packaging_type">Packaging</Label>
                                         <Input type="select" name="packaging_type[]" value={this.state.packaging_type[idx]} onChange= {(e) => this.selectChange(e, idx)}>
                                            <option value="pcs">pcs</option>
                                            <option value="gal">gal</option>
                                            <option value="dia">dia</option>
                                         </Input>
                                       </FormGroup>
                                    </Col>

                                 </Row>
                                 <hr />
                              </div>
                           )
                        })
                     }

                     <br />
                       <ModalFooter>
                           <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.ApproveModalToggle}>Cancel</Button>{' '}
                           <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Save Changes</Button>
                       </ModalFooter>

                  </Form>
               </ModalBody>
            </Modal>
            {/*END Approval MODAL*/}
         </AUX>

         );
      }

}

export default PurchaseOrder;
