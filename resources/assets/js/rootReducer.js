import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/authReducer';
import loginReducer from './auth/loginReducer';
import signupReducer from './signup/signupReducer';
import verifyUserReducer from './signup/verifyUserReducer';
import profileReducer from './application/profileReducer';
import socketReducer from './application/socketReducer';
import editProfileReducer from './application/editProfileReducer';
import channelsReducer from './channel/channelsReducer';
import channelAddReducer from './channel/channelAddReducer';
import articleListsReducer from './article_lists/articleListsReducer';
import articleDetailReducer from './articles/articleDetailReducer';
import articleAddReducer from './articles/articleAddReducer';
import articleEditReducer from './articles/articleEditReducer';
import chatReducer from './chat/chatReducer';
import searcherReducer from './articles/searcherReducer';
import teamMembersReducer from './manage_team_members/teamMembersReducer';
import notifierReducer from './notifier/notifierReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  login: loginReducer,
  signup: signupReducer,
  verifyUser: verifyUserReducer,
  profile: profileReducer,
  socket: socketReducer,
  channels: channelsReducer,
  channelAdd: channelAddReducer,
  editProfile: editProfileReducer,
  articleLists: articleListsReducer,
  article: articleDetailReducer,
  articleAdd: articleAddReducer,
  articleEdit: articleEditReducer,
  chat: chatReducer,
  searcher: searcherReducer,
  teamMembers: teamMembersReducer,
  notifier: notifierReducer,
});

export default rootReducer;
