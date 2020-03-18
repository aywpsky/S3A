import React, { Component, Suspense } from 'react';
import AUX from '../../../hoc/Aux_';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const ViewRequests = React.lazy(() => import('./ViewRequests'));
const JobOrders = React.lazy(() => import('./JobOrders'));
class Warehouse extends Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1', page_title: ''
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
							<h4 className="page-title">{this.state.activeTab == 1 ? "Job Orders" : "Requests"}</h4>
							<ol className="breadcrumb">
								<li className="breadcrumb-item active">
									{this.state.activeTab == 1 ? "Job Orders are listed here" : "Requests are listed here"}
								</li>
							</ol>
						</div>
					</div>
				</div>
				<Nav tabs>
					<NavItem>
						<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} > Job Orders </NavLink>
					</NavItem>
					<NavItem>
						<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }} > Requests </NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Suspense fallback={<div>Loading...</div>}>
							<JobOrders />
						</Suspense>
					</TabPane>
					<TabPane tabId="2">
						<Suspense fallback={<div>Loading...</div>}>
							<ViewRequests />
						</Suspense>
					</TabPane>
				</TabContent>
			</AUX>
		);
	}

}

export default Warehouse;
