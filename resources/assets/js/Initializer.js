import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import appHistory from './utils/appHistory';
import PrivateRoute from './util_components/PrivateRoute';

import InitialCheckStatus from './auth/InitialCheckStatus';
import LoadProfile from './application/LoadProfile';
import HeaderContainer from './application/HeaderContainer';
import SideBarContainer from './application/SideBarContainer';
import EditProfileContainer from './application/EditProfileContainer';
import LoginContainer from './auth/LoginContainer';
import SignupContainer from './signup/SignupContainer';
import SignupCompleteContainer from './signup/SignupCompleteContainer';
import VerifyUserContainer from './signup/VerifyUserContainer';
import HomeContainer from './home/HomeContainer';
import ArticleIndexContainer from './articles/ArticleIndexContainer';
import ArticleDetailContainer from './articles/ArticleDetailContainer';
import ArticleAddContainer from './articles/ArticleAddContainer';
import ArticleEditContainer from './articles/ArticleEditContainer';

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
  componentWillUpdate() {
    const {
      auth,
    } = this.props;
    if(!auth.isAuthenticated) {
      this.props.requestClearProfile();
    }
  }
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
          <ConnectedRouter
            history={appHistory}
          >
            <div>
              <Switch>
                <Route exact path="/app/login" component={LoginContainer} />
                <Route exact path="/app/verify-user/:token" component={VerifyUserContainer} />
                <Route exact path="/app/signup-complete" component={SignupCompleteContainer} />
                <Route exact path="/app/signup" component={SignupContainer} />
                <Route component={RedirectToLogin} />
              </Switch>
            </div>
          </ConnectedRouter>
        </div>
      );
    } else if (auth.isAuthenticated && !profile.isLoaded) {
      return (
        <LoadProfile />
      );
    }
    return (
      <div>
        <ConnectedRouter
          history={appHistory}
        >
          <div>
            <HeaderContainer />
            <SideBarContainer />
            <div style={{ marginLeft: '220px' }}>
              <Switch>
                <Route exact path="/app/login" component={LoginContainer} />
                <Route exact path="/app/home" component={HomeContainer} />
                <Route exact path="/app/articles" component={ArticleIndexContainer} />
                <Route exact path="/app/articles/add" component={ArticleAddContainer} />
                <Route exact path="/app/articles/:id/edit" component={ArticleEditContainer} />
                <Route path="/app/articles/:id" component={ArticleDetailContainer} />
                <Route exact path="/app/profile" component={EditProfileContainer} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}

export default Initializer;
