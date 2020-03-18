import React , {Component} from 'react';
import AUX from '../../../hoc/Aux_';
import Config from '../../../config/Config';
import axios from 'axios';
import GroupButton from '../../CustomComponents/GroupButton';
import {connect} from 'react-redux';
import { MDBDataTable} from 'mdbreact';
import {Col , Row} from "reactstrap";
import { BallBeat } from 'react-pure-loaders';

class ListOfCompleted extends Component {
    constructor(props ) {
        super(props );

        this.state = {
            data : [],
            loading : true
        };
        
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        let me = this;
        setTimeout(function () {
            me.fetchData();
        }, 1000);
    }

    fetchData = async() => {
        const {js_id} = this.props;

        let temp_data =[];
        let groupBtn = [];
        let url = Config.base_url + 'production/getCompleted/' + js_id;
        let response = await axios.get(url);

        if (response) {
            response.data.map((val , key ) => {

                let x = {
                    date : val.date_added,
                    no_complete : val.qty,
                }

                temp_data.push(x);

            });

            this.setState({
                data : temp_data,
                loading : false
            })
        }
    }

    render() {
        const data = {
            columns :[
            { label: 'Date' , field : 'date' , sort : 'asc' ,},
            { label: 'No. of Items Completed' , field : 'no_complete' , sort : 'asc' , },

        ],
        rows : this.state.data
        }

        if (this.state.loading) {
            return(
                <BallBeat loading = 'true' color = '#EB3B5A'/>
            );
        }else{
            return(
                <>
                    <Row>
                        <Col sm={12} className="">
                            <div className="">
                                <MDBDataTable
                                    responsive
                                    bordered
                                    hover
                                    data={data}
                                    />
                            </div>
                        </Col>
                    </Row>
                </>
        );
        }
    }
}
const mapStateToProps = state => {
    return {
        isModalOpen:state.appreducers.isModalOpen,
        js_id:state.appreducers.js_id,
        isEditable:state.appreducers.isEditable,
        num_edit:state.appreducers.num_edit
    }
}

const mapActionToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps,mapActionToProps)(ListOfCompleted);
