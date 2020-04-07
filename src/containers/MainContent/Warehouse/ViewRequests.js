import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import Config from '../../../config/Config';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import Alertify from 'alertifyjs';
import qs from 'qs';
//import { Link } from 'react-router-dom';
//import Tinycharts from '../../Chartstypes/Tinycharts';

class ViewRequests extends Component {
	constructor() {
		super();
		this.state = { request: [], raw_mat: '', qty_rcv: '', department: '', date_requested: '', modalOpenDel: false, qty_requested: '',id: '' }

	}
	componentDidMount() {
		this.GetRequest();
		Alertify.defaults = Config.AlertConfig
	}

	toggleDel = () =>{
	   this.setState({
		  modalOpenDel : !this.state.modalOpenDel,
	   })
	 }

	 approveBtn = async() => {
		 let response;
		 let id = this.state.id
		 let url = Config.base_url + 'warehouse/get_single_requests/' + id;
		 response = await axios.post(url, '');


		 if (response.data) {
            Alertify.success('Successfully Approved!');
            this.setState({modalOpenDel: false});
			this.GetRequest();
		}else if(response.data == 0){
            Alertify.error('Stocks not available!');
		}else{
			Alertify.error('Something went wrong!');
		}
	 }

	modalOpen = async (id) => {
			this.setState({
				modalOpenDel : !this.state.modalOpenDel,
	  		  	id:id,
			})
	}

	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	convertDate = (date) => {
		var months_arr = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var newDate = new Date(date);
		var month = newDate.getMonth();
		var day = newDate.getDate();
		var year = newDate.getFullYear();
		return months_arr[month] + " " + day + ", " + year;
	}

	GetRequest = async (e) => {
		let response;
		let temp_data = [];
		let url = Config.base_url + 'warehouse/get_requests';
		response = await axios.post(url, '');
		if (response.data) {
			const m = response.data.map((key) => {
				let x = {
					request_id: "RID" + key.request_id.padStart(5, "0"),
					raw_mat: key.material_name,
					quantity_requested: key.quantity_requested.toLocaleString('en'),
					department: key.department != 0?'Production':'Printing',
					date_requested: this.convertDate(key.date_requested),
					status: key.status != 0?'Approved':'Pending',
					action: <div className="btn-group" style={{display:key.status != 0 ?'none':'block'}}><Button color="success" onClick={() => this.modalOpen(key.request_id)} ><i className="ion-checkmark"></i></Button></div>
				}
				temp_data.push(x);
			})
			this.setState({ request: temp_data })
		}
	}

	render() {
		const data = {
			columns: [
				{
					label: 'ID',
					field: 'request_id',
					sort: 'asc',
					width: 150
				},
				{
					label: 'RAW MATERIAL',
					field: 'raw_mat',
					sort: 'asc',
					width: 150
				},
				{
					label: 'QUANTITY REQUESTED',
					field: 'quantity_requested',
					sort: 'asc',
					width: 150
				},
				{
					label: 'DEPARTMENT',
					field: 'department',
					sort: 'asc',
					width: 150
				},
				{
					label: 'DATE REQUESTED',
					field: 'date_requested',
					sort: 'asc',
					width: 150
				},
				{
					label: 'STATUS',
					field: 'status',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Action',
					field: 's',
					sort: 'asc',
					width: 150
				}
			],
			rows: this.state.request

		}

		return (
			<AUX>

				<div className="row">
					<div className="col-12">
						<div className="card m-b-20">
							<div className="card-body table_shift">
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

				<Modal size="lg" isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
					<ModalHeader toggle={this.toggleModal}>Issuance Form</ModalHeader>
					<ModalBody>
						<form className="" action="#" method="POST" onSubmit={this.state.action === 'Add' ? this.SubmitForm : this.updateSupplier}>
							<Row>
								<Col md={4}>
									<div className="form-group">
										<label>Department</label>
										<input type="text" disabled className="form-control" name="name" value={this.state.department} placeholder="Enter Department" />
									</div>
								</Col>
								<Col md={4}>
									<div className="form-group">
										<label>Raw Materials</label>
										<input type="text" disabled className="form-control" name="name" value={this.state.raw_mat} placeholder="Enter Raw" />
									</div>
								</Col>
								<Col md={4}>
									<div className="form-group">
										<label>Quantity Requested</label>
										<input type="text" disabled className="form-control" name="name" value={this.state.qty_requested} placeholder="Enter Qty" />
									</div>
								</Col>
							</Row>
							<Row>
								<Col md={4}>
									<div className="form-group">
										<label>Quantity</label>
										<input type="number" className="form-control" name="name" placeholder="Enter Quantity to be issued" />
									</div>
								</Col>
							</Row>
							<ModalFooter>
								<Button color="secondary" className="btn btn-secondary waves-effect" onClick={this.toggleModal}>Cancel</Button>{' '}
								<Button type="submit" color="primary" className="btn btn-secondary waves-effect">Issue Materials</Button>
							</ModalFooter>
						</form>
					</ModalBody>
				</Modal>



				<Modal isOpen={this.state.modalOpenDel} toggle={this.toggleDel}>
				  <ModalHeader toggle={this.toggleDel}>Approve Request</ModalHeader>
				  <ModalBody>
					  <p>Are you sure to approve this request?</p>
				   <ModalFooter>
						<Button color="primary" className="btn btn-secondary waves-effect" onClick={this.toggleDel}>Cancel</Button>
						<Button type="submit" onClick={this.approveBtn} color="success" className="btn btn-secondary waves-effect">Yes</Button>
				   </ModalFooter>
				  </ModalBody>
				</Modal>

			</AUX>
		);
	}
}

export default ViewRequests;
