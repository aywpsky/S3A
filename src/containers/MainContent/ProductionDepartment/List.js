import React , {Component} from 'react';
import AUX from '../../../hoc/Aux_';
import { BallBeat } from 'react-pure-loaders';
import GroupButton from '../../CustomComponents/GroupButton';
import Config from '../../../config/Config';
import { MDBDataTable} from 'mdbreact';
import {Col} from "reactstrap";
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form , FormGroup, Label , Input , Row,ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import ViewModal from './ViewModal';
import RequestModal from './RequestModal';
import { ProgressBar  } from 'react-bootstrap';
import Confirm from "./Confirm";
import AddCompleted from "./AddCompleted";
import {connect} from 'react-redux';
import qs from 'qs';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            data : [],
            js_id : '',
            Confirm : false,
            modalOpen : false,
            requestModal  : false,
            AddCompleted : false
        }

    }

    componentDidMount() {
        this.fetchData();
    }

    toggleModal = (id='') => {
       this.setState({
          js_id:id,
          modalOpen : !this.state.modalOpen
       })
    }

    requestForm = (id) => {
        this.setState({
             js_id:id,
            requestModal : !this.state.requestModal
        });
    }

    approve_jo = async() => {
        let url = Config.base_url + 'production/approve_jo/' + this.state.js_id;
        let response = await axios.get(url);
        if (response.data.status == 'ok') {
            this.approvebtn();
            this.fetchData();
        }
    }

    approvebtn = (id = '') => {
        this.setState({
            Confirm : !this.state.Confirm,
            js_id : id
        });
    }

    formatDateToString() {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var dd = (date < 10 ? '0' : '') + date;
        var MM = ((month) < 10 ? '0' : '') + (month);
        var yyyy = year;
        // var test = (yyyy + "-" + MM + "-" + dd);
        // console.log((yyyy + "-" + MM + "-" + dd));
        return (yyyy + "-" + MM + "-" + dd);
    }

    addCompletebtn = async(id) => {
        var today = this.formatDateToString();
        let url = Config.base_url + 'production/lastdata/' + today + '/' + id;
        let res = await axios.get(url);

        this.props.set_modal();
        this.props.set_id(id);

        if (res.data.status == 'ok') {
            this.props.set_edit(true);
            this.props.set_num_edit(res.data.res.qty);
            this.props.setLogId(res.data.res.log_id);
        }else{
            this.props.set_edit(false);
            this.props.set_num_edit('');
        }

        // this.props.set_edit();
    }

    Status = (stats) => {
        switch (parseInt(stats)) {
            case 1:
                return 'In-Progress';
                break;
            case 2:
                return 'On Hold';
                break;
            case 3:
                return 'Off-Track';
                break;
            case 4:
                return 'Completed';
                break;
            default:
                return 'Pending';
        }
    }

    fetchData = async() => {
        let url = Config.base_url + 'production/GetJobSheet';
        let response = await axios.get(url);
        let temp_data =[];
        let groupBtn = [];
        if (response.data.msg == 'success') {

            response.data.result.map((key) => {
                if (key.production_dep_status === '0') {
                    groupBtn = [
                        {title: "Update to In-progress",icon: "ion-checkmark",color:"success", function: () => this.approvebtn(key.job_sheet_id)},
                        {title: "View",icon: "ion-eye",color:"info", function: () => this.toggleModal(key.job_sheet_id)},
                        {title: "Request Material",icon: "ion-plus",color:"warning", function: () => this.requestForm(key.job_sheet_id)},
                    ];
                }else{
                    groupBtn = [
                        {title: "Finished Items",icon: "ion-ios7-paper-outline",color:"success", function: () => this.addCompletebtn(key.job_sheet_id)},
                        {title: "View",icon: "ion-eye",color:"info", function: () => this.toggleModal(key.job_sheet_id)},
                        {title: "Request Material",icon: "ion-plus",color:"warning", function: () => this.requestForm(key.job_sheet_id)},
                    ];
                }
                let per = parseInt(key.completed_qty) / parseInt(key.max_approved_cap_with) * 100;

                let x = {
                    js_no: "ID" + key.job_sheet_id.padStart(5, "0"),
                    js_name: key.job,
                    dispath_date: key.dispatch_date,
                    no_to_complete:key.max_approved_cap_with,
                    no_completed: key.completed_qty,
                    percentage: <ProgressBar now={per.toFixed(2)} label={`${per.toFixed(2)}%`} />,
                    status: this.Status(key.production_dep_status),
                    action:<GroupButton data={groupBtn}/>,
                }
                    temp_data.push(x);
            });
                    this.setState({data :temp_data, loading: false});
        }
    }

    render() {

        const data = {
          columns: [
              { label: 'JO #', field: 'js_no', sort: 'asc', width: 150 },
              { label: 'Order', field: 'js_name', sort: 'asc', width: 150 },
              { label: 'Dispatch Date', field: 'dispath_date', sort: 'asc', width: 150 },
              { label: 'No. to Complete', field: 'no_to_complete', sort: 'asc', width: 150 },
              { label: 'No. of items Completed', field: 'no_completed', sort: 'asc', width: 150 },
              { label: 'Percentage', field: 'percentage', sort: 'asc', width: 150 },
              { label: 'Status', field: 'in', sort: 'status', width: 150 },
              { label: 'Action', field: 'action', sort: 'action', width: 150 },
          ],
            rows : this.state.data
        };
        if (this.state.loading) {
            return(
                <BallBeat loading = 'true' color = '#EB3B5A'/>
            );
        }else{
            return(
                <>
                <Col sm={12} className="card m-b-20">
                       <div className="card-body table_shift real_tbl">
                          <MDBDataTable
                             responsive
                             bordered
                             hover
                             data={data}
                             className= "production_table"
                          />
                       </div>
                </Col>

                <Modal size="lg" isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                   <ModalHeader toggle={this.toggleModal}>Job Sheet</ModalHeader>
                   <ViewModal js_id={this.state.js_id}/>
                </Modal>

                <RequestModal
                    id = {this.state.js_id}
                    isOpen={this.state.requestModal}
                    toggles={ () => this.requestForm() }
                />

                <Confirm
                    open = {this.state.Confirm}
                    header = {'Confirmation'}
                    body = {'Are you sure?'}
                    toggle = { () => this.approvebtn() }
                    handleConfirm = { () => this.approve_jo() }
                />

                <AddCompleted fetchData = {() => this.fetchData()}/>
                </>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isModalOpen:state.appreducers.isModalOpen,
        js_id:state.appreducers.js_id,
        editable: state.appreducers.isEditable,
        num_edit: state.appreducers.num_edit,
        log_id : state.appreducers.log_id
    }
}

const mapActionToProps = dispatch => {
    return {
        set_modal: () => dispatch({type:'OPEN_MODAL'}),
        set_edit: (val) => dispatch({type:'EDIT_FINISHED' , value : val}),
        set_id: (id) => dispatch({type:'SET_ID',value_id:id}),
        set_num_edit: (num) => dispatch({type:'CHANGE_EDIT',value:num}),
        setLogId: (id) => dispatch({type:'LOG_ID',value:id})
    }
}

export default connect(mapStateToProps,mapActionToProps)(List);
