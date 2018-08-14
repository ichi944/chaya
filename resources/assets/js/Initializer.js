import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import appHistory from './services/appHistory';

import InitialCheckStatus from './auth/InitialCheckStatus';
import LoadProfile from './application/LoadProfile';
import ConfigureSocket from './application/ConfigureSocket';
import LoadChannel from './channel/LoadChannel';
import HeaderContainer from './application/HeaderContainer';
import SideBarContainer from './application/SideBarContainer';
import EditProfileContainer from './application/EditProfileContainer';
import LoginContainer from './auth/LoginContainer';
import SignupContainer from './signup/SignupContainer';
import SignupCompleteContainer from './signup/SignupCompleteContainer';
import VerifyUserContainer from './signup/VerifyUserContainer';
import HomeContainer from './home/HomeContainer';
import ChannelAddContainer from './channel/ChannelAddContainer';
import ArticleIndexContainer from './articles/ArticleIndexContainer';
import ArticleListsContainer from './article_lists/ArticleListsContainer';
import ArticleDetailContainer from './articles/ArticleDetailContainer';
import ArticleAddContainer from './articles/ArticleAddContainer';
import ArticleEditContainer from './articles/ArticleEditContainer';
import TeamMembersContainer from './manage_team_members/TeamMembersContainer';
import Notifier from './notifier/Notifier';
import ChannelNotifier from './notifier/ChannelNotifier';

const NotFound = () => <div>404 not found</div>;

const RedirectToLogin = props => (
  <Redirect
    to={{
      pathname: '/app/login',
      state: { from: props.location },
    }}
  />
);

class Initializer extends Component {
  componentWillUpdate() {
    const { auth } = this.props;
    if (!auth.isAuthenticated) {
      this.props.requestClearProfile();
    }
  }
  render() {
    const {
      auth, profile, channels, socket,
    } = this.props;
    // check the user status when user comes into the app at first.
    // try to login with the token in localstorage if it's exists.
    if (!auth.isDoneCheckingStatusAtInitialize) {
      return <InitialCheckStatus />;
      // show login screen if not authenticated.
    } else if (!auth.isAuthenticated) {
      return (
        <div>
          <HeaderContainer />
          <ConnectedRouter history={appHistory}>
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
      return <LoadProfile />;
    } else if (!channels.isLoaded) {
      return <LoadChannel />;
    } else if (!socket.hasSocketId) {
      return <ConfigureSocket />;
    }
    return (
      <div>
        <ConnectedRouter history={appHistory}>
          <div>
            <HeaderContainer />
            <SideBarContainer />
            <div style={{ marginLeft: '220px' }}>
              <Switch>
                <Route exact path="/app/login" component={LoginContainer} />
                <Route exact path="/app/home" component={HomeContainer} />
                <Route exact path="/app/channels/add" component={ChannelAddContainer} />
                <Route exact path="/app/articles" component={ArticleIndexContainer} />
                <Route
                  exact
                  path="/app/channels/:channel_id/articles"
                  component={ArticleListsContainer}
                />
                <Route exact path="/app/articles/add" component={ArticleAddContainer} />
                <Route exact path="/app/articles/:id/edit" component={ArticleEditContainer} />
                <Route path="/app/articles/:id" component={ArticleDetailContainer} />
                <Route exact path="/app/profile" component={EditProfileContainer} />
                <Route exact path="/app/manage-team-members" component={TeamMembersContainer} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Notifier />
            <ChannelNotifier />
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}

export default Initializer;
