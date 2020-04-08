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
            cost : []
			// date :  Moment(new Date().toLocaleDateString('en-US', DATE_OPTIONS)).format('Y-MM')
        }
    }

    componentDidMount() {
        this.fetchdata();
    }

    fetchdata = () => {
        const url = Config.base_url + 'dashboard/finishedproduct';
        axios.get(url).then( res => {
            this.setState({
                total : res.data.total,
                cost : res.data.cost
            });
        });
	}

    calc = (amount) => {
        var total = this.state.total - amount

        return (total / amount) * 100;
    }

	// getProgressData = () => {
	// 	const {date} = this.state
	// 	const url = Config.base_url + `expenses/getJobOrderList/${date}`;
	// 	axios.get(url).then( res => {
    //         console.log(res);
    //         return;
	// 		const {total_cost} = res.data.list;
	// 		let total = 0;
	// 		total_cost.forEach((value, i) => {
	// 			total = total + value
	// 		});
	// 		this.setState({total});
	// 	})
	// }

	render(){
	    return(
            <AUX>
				<Row>
					<Col md={4} className="f_product_cont">
						<Label>Total Costs of Finished Product</Label>
					</Col>
					<Col md={8}  className="f_product_cont">
						<Label>{""}</Label>
						<ProgressBar now={this.state.total} label={this.state.total} /> <br/>
					</Col>
				</Row>
				{
                    this.state.cost.map((val , idx) => {
                        return(
                            <Row>
            					<Col md={4} className="f_product_cont">
            						<Label>{val.account}</Label>
            					</Col>
            					<Col md={8}  className="f_product_cont">
                                    <Label>{""}</Label>
            						<ProgressBar now={this.calc(val.amount)} label={val.amount} /> <br/>
            					</Col>

            				</Row>
                        )
                    })
                }
			</AUX>
	    );
	}

}
export default FinishedProduct;
