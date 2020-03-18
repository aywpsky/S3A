import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import { Route,Switch} from 'react-router-dom';
import mainbuilder from './containers/mainbuilder/mainbuilder';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './App.css';
import Helper from './config/Helper';
class App extends Component {

  render() {
    let layout = null;
      layout = (
        <Layout topbar={this.props.topbar} sidebar = {this.props.sidebar}  footer = {this.props.footer} isloginpage={this.props.loginpage} isLoggedIn={Helper.isLoggedIn()}>
          <Switch>
            <Route path="/" component={mainbuilder} />
          </Switch>
        </Layout>
    );

    return (
      <div className="App">
        {layout}
      </div>
    );
  }
}
const mapStatetoProps = state =>{
  return {
      topbar: state.ui_red.top_bar,
      sidebar:state.ui_red.side_bar,
      loginpage:state.ui_red.loginpage,
      footer:state.ui_red.footer
  };
}

export default withRouter(connect(mapStatetoProps)(App))  ;
