import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './util_components/PrivateRoute';

import InitialCheckStatus from './auth/InitialCheckStatus';
import LoadProfile from './application/LoadProfile';
import HeaderContainer from './application/HeaderContainer';
import SideBarContainer from './application/SideBarContainer';
import LoginContainer from './auth/LoginContainer';
import HomeContainer from './home/HomeContainer';
import ArticleIndexContainer from './articles/ArticleIndexContainer';
import ArticleDetailContainer from './articles/ArticleDetailContainer';

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
    const {
      auth,
      profile,
    } = this.props;
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
    } else if (auth.isAuthenticated && !profile.isLoaded) {
      return (
        <LoadProfile />
      );
    }
    return (
      <div>
        <BrowserRouter>
          <div>
            <HeaderContainer />
            <SideBarContainer />
            <div style={{ marginLeft: '220px' }}>
              <Switch>
                <Route exact path="/app/login" component={LoginContainer} />
                <Route exact path="/app/home" component={HomeContainer} />
                <Route exact path="/app/articles" component={ArticleIndexContainer} />
                <Route path="/app/articles/:id" component={ArticleDetailContainer} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Initializer;
