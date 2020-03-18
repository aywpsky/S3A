import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';

const JobOrder = React.lazy(() => import('./JobOrder'));

class User_Index extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1', page_title: '',
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }


    render() {


        return (
            <AUX>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <h4 className="page-title">Printing Department </h4>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    Job order list
                                </li>
                            </ol>
                        </div>
                        <div className="page-btn">
                            {/* this.state.activeTab == 1 ? <Button type="button" className="btn btn-primary real-btn" onClick={() => this.addRawBtn()}>Add Raw Material</Button>:<Button type="button" className="btn btn-primary real-btn" onClick={() => this.setState({isModalOpen : true , action : 'Add'})}>Add Supplier</Button>*/}
                        </div>
                    </div>
                </div>

                <JobOrder />


            </AUX>

        )
    }

}

export default User_Index;
