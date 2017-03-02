import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import PrivateRoute from './util_components/PrivateRoute';

import InitialCheckStatus from './auth/InitialCheckStatus';
import HeaderContainer from './application/HeaderContainer';
import SideBarContainer from './application/SideBarContainer';
import LoginContainer from './auth/LoginContainer';


class Home extends Component {
  render() {
    return (
      <div>home screen</div>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <div>404 not found</div>
    );
  }
}

class RedirectToLogin extends Component {
  render() {
    return (
      <Redirect
        to={{
          pathname: '/app/login',
          state: { from: this.props.location },
        }}
      />
    );
  }
}

class Initializer extends Component {
  render() {
    const { auth } = this.props;
    // check the user status when user comes into the app at first.
    // try to login with the token in localstorage if it's exists.
    if (!auth.isDoneCheckingStatusAtInitialize) {
      return (
        <InitialCheckStatus />
      );
      // show login screen if not authenticated.
    } else if (!auth.isAuthenticated) {
      return (
        <div>
          <HeaderContainer />
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/app/login" component={LoginContainer} />
                <Route component={RedirectToLogin} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      );
    }
    return (
      <div>
        <HeaderContainer />
        <SideBarContainer />
        <BrowserRouter>
          <div>
            <Link to="/app/home">home</Link>
            <Switch>
              <Route path="/app/login" component={LoginContainer} />
              <PrivateRoute path="/app/home" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Initializer;
