import React , {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import Config from '../../../config/Config';
import axios from 'axios';
import AUX from '../../../hoc/Aux_';
import { ProgressBar  } from 'react-bootstrap';
import {Row , Col , Label} from 'reactstrap';
import Moment from 'moment';
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
class FinishedProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
			prog: 0,
			total: 0,
			date :  Moment(new Date().toLocaleDateString('en-US', DATE_OPTIONS)).format('Y-MM')
        }
    }

    componentDidMount() {
        this.getProgressData();
		console.log(this.state.date);
    }

    getChartData = () => {

	}

	getProgressData = () => {
		const {date} = this.state
		const url = Config.base_url + `expenses/getJobOrderList/${date}`;
		axios.get(url).then( res => {
            console.log(res);
            return;
			const {total_cost} = res.data.list;
			let total = 0;
			total_cost.forEach((value, i) => {
				total = total + value
			});
			this.setState({total});
		})
	}

	render(){
	    return(
            <AUX>
				<Row>
					<Col md={4} className="f_product_cont">
						<Label>Total Costs of Finished Product</Label>
					</Col>
					<Col md={8}  className="f_product_cont">
						<Label>{""}</Label>
						<ProgressBar now={this.state.prog} label={`Test Label${this.state.prog}%`} /> <br/>
					</Col>
				</Row>
				<Row>
					<Col md={4} className="f_product_cont">
						<Label>Testing</Label>
					</Col>
					<Col md={8}  className="f_product_cont">
						<Label>{""}</Label>
						<ProgressBar now={this.state.prog} label={`Test Label${this.state.prog}%`} /> <br/>
					</Col>

				</Row>
				<Row>
					<Col md={4} className="f_product_cont">
						<Label>Testing</Label>
					</Col>
					<Col md={8}  className="f_product_cont">
						<Label>{""}</Label>
						<ProgressBar now={this.state.prog} label={'Test Label'} /> <br/>
					</Col>
				</Row>
			</AUX>
	    );
	}

}
export default FinishedProduct;
