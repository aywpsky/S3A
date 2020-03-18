import React , {Component} from 'react';
import AUX from '../../../hoc/Aux_';
import PageTitle from '../../CustomComponents/PageTitle';

class Reports extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <AUX>
                <PageTitle title="Reports" subtitle="See all reports here." />
            </AUX>
        )
    }
}

export default Reports;
