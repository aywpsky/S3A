import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import { BallBeat } from 'react-pure-loaders';
import {  Modal, ModalHeader,Col} from 'reactstrap';
import { MDBDataTable,} from 'mdbreact';
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import ViewModal from './ViewModal';
import axios from 'axios';
import RequestModal from './RequestModal';
import OpenCompleted from './OpenCompleted';


class JobOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            job_sheet_data: [],
            modalOpen: false,
            js_id: '',
            requestModal: false,
            OpenCompleted: false,
        }

    }

    mods = (isOpen) => {
        return <RequestModal isOpen={isOpen} />;
    }

    componentDidMount() {
        this.GetJobSheet();
        Alertify.defaults = Config.AlertConfig
    }

    toggleModal = (id = '') => {
        this.setState({
            js_id: id,
            modalOpen: !this.state.modalOpen
        })
    }

    requestForm = (id = '') => {
        this.setState({
            js_id: id,
            requestModal: !this.state.requestModal
        });
    }
    approveJS = async (id) => {
        let response;
        let url = Config.base_url + 'printingdepartment/updateJobSheet/' + id;
        Alertify.confirm('Are you sure?', () => {
            response = axios.post(url)
            Alertify.success('Successfully Updated Status!')
            this.GetJobSheet();
        });

    }

    OpenCompleted = async (id) => {
        this.setState({
            js_id: id,
            OpenCompleted: !this.state.OpenCompleted
        });

    }

    GetJobSheet = async (e) => {
        let response;
        let temp_data = [];
        let url = Config.base_url + 'printingdepartment/GetJobSheet';
        response = await axios.post(url, '');

        if (response.data.msg == 'success') {
            const m = response.data.result.map((key) => {

                let groupBtn = [
                    { title: "Update to In-progress", icon: (key.printing_dep_status) ? "ion-ios7-paper-outline" : "ion-checkmark", color: "success", function: (key.printing_dep_status) ? () => this.OpenCompleted(key.job_sheet_id) : () => this.approveJS(key.job_sheet_id) },
                    { title: "View", icon: "ion-eye", color: "info", function: () => this.toggleModal(key.job_sheet_id) },
                    { title: "Request Material", icon: "ion-plus", color: "warning", function: () => this.requestForm(key.job_sheet_id) },
                ];
                let status = '';
                switch (key.printing_dep_status) {
                    
                    case '1':
                        status = 'In-Progress';
                       break;
                    case '2':
                        status = 'On-hold';
                       break;
                    case '3':
                        status = 'Off-track';
                       break;
                    case '4':
                        status = 'Completed';
                       break;
                    
                    default:
                        status = 'Pending';
                       break;
                 }


                let percent = ((key.completed_qty / key.max_approved_laminate_with) * 100);
                let x = {
                    js_no: key.job_sheet_id,
                    js_name: key.job,
                    dispath_date: key.dispatch_date,
                    no_to_complete: key.max_approved_laminate_with,
                    no_completed: key.completed_qty ? key.completed_qty : '0',
                    completed_per: percent.toFixed(2) + ' %',
                    status: status,
                    action: <GroupButton data={groupBtn} />,

                }
                temp_data.push(x);
            });
            this.setState({ job_sheet_data: temp_data, loading: false })
        }
    }

    render() {

        const data = {
            columns: [
                { label: 'JO #', field: 'js_no', sort: 'asc', width: 150 },
                { label: 'Job', field: 'js_name', sort: 'asc', width: 150 },
                { label: 'Dispatch Date', field: 'dispath_date', sort: 'asc', width: 150 },
                { label: 'No. to Complete', field: 'no_to_complete', sort: 'asc', width: 150 },
                { label: 'No. of items Completed', field: 'no_completed', sort: 'asc', width: 150 },
                { label: 'Completed Percentage', field: 'completed_per', sort: 'asc', width: 150 },
                { label: 'Status', field: 'in', sort: 'status', width: 150 },
                { label: 'Action', field: 'action', sort: 'action', width: 150 },
            ],
            rows: this.state.job_sheet_data
        };

        if (this.state.loading) {
            return (
                <BallBeat loading='true' color='#EB3B5A' />
            );
        } else {

            return (
                <AUX>

                    <Col md={12} className="printing-department-user card m-b-20">
                        <div className="card-body table_shift real_tbl printingDepartmentTable">

                            <MDBDataTable
                                responsive
                                bordered
                                hover
                                data={data}
                            />

                        </div>
                    </Col>

                    <Modal size="lg" isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Job Sheet</ModalHeader>
                        <ViewModal js_id={this.state.js_id} />
                    </Modal>

                    <RequestModal
                        id={this.state.js_id}
                        isOpen={this.state.requestModal}
                        toggle={() => this.requestForm()}
                    />
                    <OpenCompleted
                        id={this.state.js_id}
                        isOpen={this.state.OpenCompleted}
                        Job={this.state.OpenCompleted}
                        toggle={() => this.OpenCompleted()}
                        reload = {()=>this.GetJobSheet()}
                    />

                </AUX>

            )
        }
    }

}

export default JobOrder;
