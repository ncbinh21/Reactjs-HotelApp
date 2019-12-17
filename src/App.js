import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import ListRoom from './components/admin/ListRoom';
import Login from './components/admin/Login';
import CreateEditRoom from './components/admin/CreateEditRoom';
import HeaderRender from './components/admin/Header';
import Homepage from './components/frontend/Homepage';
import { connect } from 'react-redux';
import { setLoginHomepage } from '../src/reducers';
// import { setLoginHomepage } from './redux/actions/hotelAction';
import RoomDetail from './components/frontend/RoomDetail';
import MyAccount from './components/frontend/MyAccount';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Switch>
              {/* Backend */}
              <Route exact path='/admin' component={HeaderRender}>
                  <Redirect to='/admin/login' />
              </Route>
              <Route exact path='/admin/login' component={Login} />
              <Route exact path='/admin/list-room' component={ListRoom} />``
              <Route exact path='/admin/create-edit-room/:roomId?' component={CreateEditRoom} />

              {/* Frontend */}
              <Route exact path='/' component={Homepage} />
              {/* <Route exact path='/my-account' component={Homepage} /> */}
              <Route exact path='/room-detail/:roomId?' component={RoomDetail} />
              <Route exact path='/my-account' component={MyAccount} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
    login: state.login,
});

const mapDispatchToProps = {
    setLoginHomepage
};


export default connect(mapStateToProps, mapDispatchToProps)(App)   