import React, { Component, Suspense } from 'react';
import AUX from '../../../hoc/Aux_';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const JobOrder = React.lazy(() => import('./JobOrder'));
const RequestList = React.lazy(() => import('./RequestList'));

class Index extends Component {

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
                           {this.state.activeTab == 1 ? "Job order list" : "Requested material list"}
                        </li>
                     </ol>
                  </div>
                  <div className="page-btn">
                     {/* this.state.activeTab == 1 ? <Button type="button" className="btn btn-primary real-btn" onClick={() => this.addRawBtn()}>Add Raw Material</Button>:<Button type="button" className="btn btn-primary real-btn" onClick={() => this.setState({isModalOpen : true , action : 'Add'})}>Add Supplier</Button>*/}
                  </div>
               </div>
            </div>
            <Nav tabs>
               <NavItem>
                  <NavLink
                     className={classnames({ active: this.state.activeTab === '1' })}
                     onClick={() => { this.toggle('1'); }}
                  >
                     Job Order
                      </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({ active: this.state.activeTab === '2' })}
                     onClick={() => { this.toggle('2'); }}
                  >
                     Resquested Materials
                      </NavLink>
               </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
               
               <TabPane tabId="1">
                  <Suspense fallback={<div>Loading...</div>}>
                     <JobOrder />
                  </Suspense>
               </TabPane>

               <TabPane tabId="2">
                  <Suspense fallback={<div>Loading...</div>}>
                     <RequestList />
                  </Suspense>
               </TabPane>

            </TabContent>

         </AUX>

      )
   }

}

export default Index;
