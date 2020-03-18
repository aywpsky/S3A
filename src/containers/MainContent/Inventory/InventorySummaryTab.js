import React , {Component, Suspense} from 'react';
import AUX from '../../../hoc/Aux_';
import { BallBeat } from 'react-pure-loaders';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row ,Col,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Config from '../../../config/Config';
import Helper from '../../../config/Helper';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import qs from "qs";
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import classnames from 'classnames';
import Editable from 'react-x-editable';

class InventorySummaryTab extends Component{

constructor ( props ) {
    super( props );
    this.validator = new SimpleReactValidator();
    this.state = {
         Options        : [],
    }
}

componentDidMount(){
    Alertify.defaults           = Config.AlertConfig
    this.GetRawMaterial();
}

GetRawMaterial = async(e) => {
   let response;
   let temp_data =[];

   let url = Config.base_url + 'inventory/getInventory';
   response = await axios.post(url , '');

   if (response.data) {

     const m = response.data.map((key , idx)=>  {
        let x = {
          mat_name               : key.raw_id,
          beg_balance            : key.running_bal,
          consumed               : key.materials_in,
          add                    : key.materials_out,
          warehouse_qty          : '-',
          warehouse_end_bal      : '-',
          physical_cnt_qty       : '-',
          physical_cnt_end_bal   : '-',
          findings               : '-',
      }
       temp_data.push(x);
     });

     this.setState({data: temp_data})

   }else{
      alert('failed');
   }

 }

render(){
   const data = {
        columns: [
          { label: 'ITEMS',                        field: 'mat_name',                 width: 150 },
          { label: 'BEG. BALANCE',                 field: 'beg_balance',               width: 270 },
          { label: 'CONSUMED',                     field: 'consumed',                width: 200 },
          { label: 'ADD',                          field: 'add',                    width: 200 },
          { label: 'WAREHOUSE QTY',                field: 'warehouse_qty',          width: 200 },
          { label: 'WAREHOUSE END BALANCE',        field: 'warehouse_end_bal',      width: 200 },
          { label: 'PHYSICAL COUNT QTY',           field: 'physical_cnt_qty',       width: 200 },
          { label: 'PHYSICAL COUNT END BALANCE',   field: 'physical_cnt_end_bal',   width: 200 },
          { label: 'FINDINGS',                     field: 'findings',               width: 200 },
        ],
        rows: this.state.data
      };
    return(
      <AUX>
             <div className="row">
                 <div className="col-12">
                     <div className="card m-b-20">
                        <div className="card-body">
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

      </AUX>
    );
}

}

export default InventorySummaryTab;
