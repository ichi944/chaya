import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import appHistory from './services/appHistory';

import InitialCheckStatus from './auth/InitialCheckStatus';
import LoadProfile from './application/LoadProfile';
import ConfigureSocket from './initialization/ConfigureSocket';
import LoadChannel from './channel/LoadChannel';
import Header from './application/Header';
import SideBarContainer from './application/SideBarContainer';
import EditProfileContainer from './application/EditProfileContainer';
import LoginContainer from './auth/LoginContainer';
import SignupContainer from './signup/SignupContainer';
import SignupCompleteContainer from './signup/SignupCompleteContainer';
import VerifyUserContainer from './signup/VerifyUserContainer';
import Home from './home/Home';
import ChannelAddContainer from './channel/ChannelAddContainer';
import ArticleListsContainer from './article_lists/ArticleListsContainer';
import ArticleDetailContainer from './articles/ArticleDetailContainer';
import ArticleAddContainer from './articles/ArticleAddContainer';
import ArticleEditContainer from './articles/ArticleEditContainer';
import TeamMembersContainer from './manage_team_members/TeamMembersContainer';
import Notifier from './notifier/Notifier';
import ChannelNotifier from './notifier/ChannelNotifier';
import ChatNotificationContainer from './chat_notification/ChatNotificationContainer';

import { clearProfile } from './application/actions';
import { AuthState } from './auth/interfaces/auth';
import { ProfileState, ProfileActions } from './application/interfaces/profile';
import { SocketState } from './initialization/interfaces/socket';
import { ChannelsState } from './channel/interfaces/channel';
import { RootState } from './interfaces/rootState';
import { ThunkDispatch } from 'redux-thunk';

const NotFound = () => <div>404 not found</div>;

const RedirectToLogin = props => (
  <Redirect
    to={{
      pathname: '/app/login',
      state: { from: props.location },
    }}
  />
);

const RedirectToHome = props => (
  <Redirect
    to={{
      pathname: '/app/home',
      state: { from: props.location },
    }}
  />
);

export interface AppRouterProps {
  auth: AuthState;
  profile: ProfileState;
  channels: ChannelsState;
  socket: SocketState;
  requestClearProfile: () => void;
}
const AppRouter: FunctionComponent<AppRouterProps> = props => {
  const { auth } = props;
  useEffect(() => {
    return () => {
      if (!auth.isAuthenticated) {
        props.requestClearProfile();
      }
    };
  });

  const { profile, channels, socket } = props;
  // check the user status when user comes into the app at first.
  // try to login with the token in localstorage if it's exists.
  if (!auth.isDoneCheckingStatusAtInitialize) {
    return <InitialCheckStatus />;
    // show login screen if not authenticated.
  } else if (!auth.isAuthenticated) {
    return (
      <div>
        <Header />
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
          <Header />
          <SideBarContainer />
          <div style={{ marginLeft: '220px' }}>
            <Switch>
              <Route exact path="/app/login" component={LoginContainer} />
              <Route exact path="/app/home" component={Home} />
              <Route exact path="/app/channels/add" component={ChannelAddContainer} />
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
              <Route exact path="/app/" component={RedirectToHome} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Notifier />
          <ChannelNotifier />
          <ChatNotificationContainer history={appHistory} />
        </div>
      </ConnectedRouter>
    </div>
  );
};

const mapStateToProps = ({ auth, profile, channels, socket }: RootState) => ({
  auth,
  profile,
  channels,
  socket,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, ProfileActions>) => ({
  requestClearProfile() {
    dispatch(clearProfile());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRouter);
