import React , {Component} from 'react';
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import PageTitle from '../../CustomComponents/PageTitle';
import List from "./List";
import RequestModal from './RequestModal';
import Helper from "../../../config/Helper";
class Production extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
             isOpen : false
        };
    }

    render() {
        if (Helper.getUserDetail('user_type') == 1) {
            return(
                <AUX>
                    <List />
                </AUX>
            );
        }else{
            return(
                <AUX>
                    <PageTitle title="Job Order" subtitle="Job Orders are listed here."/>
                    <List />
                </AUX>
            );
        }

    }
}

export default Production;
