import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable } from 'mdbreact';
import GroupButton from '../../CustomComponents/GroupButton';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../../../config/Config';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row ,Col , Input } from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import Alertify from 'alertifyjs';
import qs from 'qs';
import SimpleReactValidator from 'simple-react-validator';

class RawMaterialArchivedTab extends Component {
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
               uom               :''
            }
            this.validator = new SimpleReactValidator();

     }

     componentDidMount(){
        this.GetRawMaterial();

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

              let url = Config.base_url + '/api/viewRaw/1';
              response = await axios.post(url , '');
              if (response.data) {
                  const m = response.data.map((key , idx)=>  {
                     let groupBtn = [
                        { title: "Remove" ,icon: "fas fa-lock-open",color:"secondary",function: () => this.toggleDel(key.raw_id, "raw_id","tbl_raw_materials")}
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
         let url = Config.base_url + 'api/moveToTrash/0';
         const response = await axios.post(url, qs.stringify(remData));
         if (response.data) {
            Alertify.success('Successfully Removed!');
            this.setState({modalOpenDel: false})
         }else {
            Alertify.error('Something went wrong!');
         }
         this.GetRawMaterial();
     }


    toggleModal = () => {
        this.setState({modalOpen : !this.state.modalOpen});
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

           </AUX>
      );
   }
}

export default RawMaterialArchivedTab;
