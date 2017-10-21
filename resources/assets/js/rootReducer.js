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
import articlesReducer from './articles/articlesReducer';
import articleChannelReducer from './articles/articleChannelReducer';
import articleReducer from './articles/articleReducer';
import articleAddReducer from './articles/articleAddReducer';
import articleEditReducer from './articles/articleEditReducer';
import searcherReducer from './articles/searcherReducer';
import teamMembersReducer from './manage_team_members/teamMembersReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  login: loginReducer,
  signup: signupReducer,
  verifyUser: verifyUserReducer,
  profile: profileReducer,
  socket: socketReducer,
  channels: channelsReducer,
  editProfile: editProfileReducer,
  articles: articlesReducer,
  articleChannel: articleChannelReducer,
  article: articleReducer,
  articleAdd: articleAddReducer,
  articleEdit: articleEditReducer,
  searcher: searcherReducer,
  teamMembers: teamMembersReducer,
});

export default rootReducer;
