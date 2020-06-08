import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable } from 'mdbreact';
import GroupButton from '../../CustomComponents/GroupButton';
import axios from 'axios';
import Config from '../../../config/Config';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row ,Col , Input } from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import Alertify from 'alertifyjs';
import qs from 'qs';
import SimpleReactValidator from 'simple-react-validator';

class Raw_Material extends Component {
   constructor(){
      super();
            this.state = {
               modalOpen         : false ,
               modalTitle        : 'Add raw Material',
               raw_id            : '',
               supplier_name     : [],
               supplier_id       : [] ,
               supplier_data     : [],
               description       : '',
               material_name     : '' ,
               supp_req          : '',
               description_err   : '' ,
               material_name_err : '',
               Options           : [],
               modalOpenDel      : false,
               id                : '',
               id_name           : '',
               table_name        : '',
               selectvalue       : false,
               raw_limit         : '',
               material_limit    : '',
               uom               : '',
            }
            this.validator = new SimpleReactValidator();
            this.removeBtn = this.removeBtn.bind(this);

     }

     componentDidMount(){
        this.GetRawMaterial();
        this.GetSupplier();

        Alertify.defaults = Config.AlertConfig;

     }

     toggleDel = (id, id_name,table_name) =>{
        this.setState({
           modalOpenDel : !this.state.modalOpenDel,
           id:id,
           id_name:id_name,
           table_name:table_name,
        })
      }

    GetRawMaterial = async(e) => {
          let response;
          let temp_data =[];

              let url = Config.base_url + '/api/viewRaw';
              response = await axios.post(url , '');
              console.log(response);
              if (response.data) {
                  const m = response.data.map((key , idx)=>  {
                     let groupBtn = [
                        { title: "Edit",icon: "ion-edit",color:"primary",function: () => this.editRawBtn(key.raw_id)},
                        { title: "Remove" ,icon: "ion-trash-a",color:"secondary",function: () => this.toggleDel(key.raw_id, "raw_id","tbl_raw_materials")}
                     ];
                     let x = {
                       mat_id: "RMID" + key.raw_id.padStart(5, "0"),
                       mat_name: key.material_name,
                       mat_supp: key.supplier_name,
                       mat_limit: key.raw_limit,
                       uom: key.uom,
                       action: <GroupButton data={groupBtn}/>
                    }
                    temp_data.push(x);
                  });
                  this.setState({data: temp_data,supplier_name:'Select'})
              }else{
                   alert('failed');
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
         this.GetRawMaterial();
     }

     editRawBtn = async(raw_id) => {
         await this.setState({modalTitle:'Edit Raw Material' , modalOpen:true , action : 'Edit'});
         let url           = Config.base_url + 'api/getRaw/' + raw_id,
         response          = await axios.get(url);
         let value         = [];
         let label         = [];
         let supplier_data = [];

         response.data.supplier_data.map((data , key) =>{
            if(key == 0){
               label.push(data);
            }else{
               value.push(data);
            }
         })
         label[0].map((data , key) =>{
            let x = {
               value: value[0][key],
               label: data
            }
            supplier_data.push(x);
        })

         await this.setState({
               uom               : response.data.uom,
               raw_id            : response.data.raw_id,
               material_name     : response.data.material_name,
               material_limit    : response.data.raw_limit,
               supplier_id       : response.data.supplier_explode_id,
               supplier_name     : response.data.supplier_name,
               supplier_data     : supplier_data,
               selectvalue       :true,
         });
     }

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

         await this.setState({Options : temp_data});

     }

    toggleModal = () => {
        this.setState({modalOpen : !this.state.modalOpen});
    }


     AddRawMaterial = async(e) => {
         e.preventDefault();
         const {material_name , supplier_id }   = this.state;
         let url                                = Config.base_url + 'api/addRawMaterial';
         const formData                         = new FormData(e.target);
         formData.append('supplier' , supplier_id);

         if (this.validator.allValid()) {
             const response = await axios.post(url , formData);
             if (response.data.success) {
                  Alertify.success('Successfully added!');
                 this.setState({
                     description : '',
                     material_name : '',
                     material_limit : ''

                 });
                 this.GetRawMaterial();
                 this.GetSupplier();
             }else{
                 Alertify.error('Something went wrong!');
             }
         }else{
             this.validator.showMessages();
             this.forceUpdate();
         }
     }

     updateRaw = async(e) => {
         e.preventDefault();
         const { raw_id, supplier_id  }      = this.state;
         let url                             = Config.base_url + 'api/updateRaw/' + raw_id;
         const formData                      = new FormData(e.target);
         formData.append('supplier' , supplier_id);
         const response                      = await axios.post(url , formData);

         if (this.validator.allValid()) {
            if (response.data.success) {
                Alertify.success('Successfully updated!');
                this.GetRawMaterial();
                this.setState({modalOpen:false});
            }else{
                Alertify.error('Something went wrong!');
            }
         }else{
                this.validator.showMessages();
                this.forceUpdate();
         }
     }

    handleMaterialChange = (e) => {
        if (e.target.value === '')
            this.setState({material_name_err: 'This field is required'})
        else
            this.setState({material_name_err: ''})
            this.setState({material_name : e.target.value});
    }

    handleMaterialLimit = (e) => {
        if (e.target.value === '')
            this.setState({material_name_err: 'This field is required'})
        else
            this.setState({material_name_err: ''})
            this.setState({material_limit : e.target.value});
    }

     handleTxtarea = (e) => {
         this.setState({description : e.target.value})
     }

     handleSelectChange = (newValue , actionMeta) => {
        var value = [];
        var label = [];


        if (newValue != null) {
            for (var i = 0, l = newValue.length; i < l; i++) {
                  value.push(newValue[i].value);
                  label.push(newValue[i].label);
             }
        }

        this.state.supplier_id = (value ? value : false);
        this.state.supplier_name = (label ? label.label : false);
        this.setState({supplier_data: newValue})

        if (this.state.supplier_id == false)
            this.setState({supp_req: 'This field is required.'})
        else
            this.setState({supp_req : ''});
     }

     addRawBtn = () => {
               this.setState({
                  action            : 'Add' ,
                  modalTitle        : 'Add Raw Material',
                  modalOpen         : !this.state.modalOpen,
                  raw_id            : '',
                  material_name     : '',
                  description       : '',
                  supplier_id       : '',
                  supplier_name     : '',
                  selectvalue       : false,
               })

           }
   render(){
      const data = {
           columns: [
             { label: 'Item Code',      field: 'mat_id',     width: 150 },
             { label: 'MATERIAL NAME',    field: 'mat_name',   width: 270 },
             { label: 'SUPPLIER NAME',    field: 'mat_sup',    width: 200 },
             { label: 'INVENTORY LIMIT',  field: 'mat_limit',    width: 200 },
             { label: 'UOM',  field: 'uom',    width: 200 },
             { label: 'ACTION',           field: 'action',     width: 200 }
           ],
           rows: this.state.data
         };
         let divStyle = {
             position: "absolute !important",
             top: "108px !important",
             right: "56px !important",
         };

      return(
           <AUX>
    <Button type="button" className="btn btn-primary prime real-btn" style={divStyle} onClick={this.addRawBtn}>Add Raw Material</Button>
                 <Row>
                   <Col sm={12}>
                         <div className="card m-b-20">
                             <div className="card-body">
                                <MDBDataTable
                                    className="rawMatTable"
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
                                    <Button type="button" className="btn btn-primary" onClick={this.addRawBtn}>Add Raw Material</Button>
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
                         </div>
                     </div>
                  */}


               <Modal isOpen={this.state.modalOpenDel} toggle={this.toggleDel} className={this.props.className}>
                 <ModalHeader toggle={this.toggleDel}>Remove Raw Material</ModalHeader>
                 <ModalBody>
                     <p>Do you really want to remove this Raw Material?</p>
                  <ModalFooter>
                       <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleDel}>Cancel</Button>
                       <Button type="submit" onClick={this.removeBtn} color="primary" className="btn btn-secondary waves-effect">Proceed</Button>
                  </ModalFooter>
                 </ModalBody>
               </Modal>


               <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
                 <ModalHeader toggle={this.toggleModal}>{this.state.modalTitle}</ModalHeader>
                 <ModalBody>
                 <form className="" action="POST" method="POST" onSubmit={this.state.action === 'Edit' ? this.updateRaw:this.AddRawMaterial }>

                   <div className="form-group">
                       <label>Material Name</label>
                       <input type="text" className="form-control" name="name" value={this.state.material_name} onChange={this.handleMaterialChange} placeholder="Enter Name"/>
                       <span id="err">{this.validator.message('material name', this.state.material_name, 'required')}</span>
                  </div>

                    <div className="form-group">
                          <label>Material Limit</label>
                          <input type="number" className="form-control" name="limit"  placeholder="Enter Limit" onChange={this.handleMaterialLimit} value={this.state.material_limit}/>
                          <span id="err">{this.validator.message('material limit', this.state.material_limit, 'required')}</span>
                    </div>

                    <div className="form-group">
                          <label>UOM</label>
                              <Input type="select" name="uom" onChange= {(e) => this.setState({uom : e.target.value})}>
                                 <option value="pcs">pcs</option>
                                 <option value="gal">gal</option>
                              </Input>
                                 <span id="err">{this.validator.message('uom', this.state.uom, this.state.action !== 'Edit'?'required':'')}</span>

                    </div>

                    {/*
                  <div className="form-group">
                      <label>Material Description</label>
                      <div>
                          <textarea name="description" value={this.state.description} onChange={this.handleTxtarea} className="form-control" rows="5" placeholder="Material Description"></textarea>
                      </div>
                  </div>
                    */}
                  <div className= "form-group">
                    <label htmlFor="">Supplier</label>
                        {this.state.selectvalue ?(
                        <CreatableSelect
                            isClearable
                            isMulti
                            onChange      = {this.handleSelectChange}
                            options       = {this.state.Options}
                            value         = {this.state.supplier_data}
                          />
                       ):(
                          <CreatableSelect
                             isClearable
                             isMulti
                             onChange     = {this.handleSelectChange}
                             options      = {this.state.Options}
                           />
                        )}
                       <span id="err">{this.validator.message('supplier', this.state.supplier_data, 'required')}</span>
                  </div>
                   <ModalFooter>
                       <Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleModal}>Cancel</Button>{' '}
                       <Button type="submit" color="primary" className="btn btn-secondary waves-effect">{this.state.action === 'Edit' ? 'Save Changes' : 'Save'}</Button>
                   </ModalFooter>
                   </form>
                 </ModalBody>
               </Modal>

           </AUX>
      );
   }
}

export default Raw_Material;
