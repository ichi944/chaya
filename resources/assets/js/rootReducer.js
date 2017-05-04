import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/authReducer';
import loginReducer from './auth/loginReducer';
import signupReducer from './signup/signupReducer';
import verifyUserReducer from './signup/verifyUserReducer';
import profileReducer from './application/profileReducer';
import editProfileReducer from './application/editProfileReducer';
import articlesReducer from './articles/articlesReducer';
import articleReducer from './articles/articleReducer';
import articleAddReducer from './articles/articleAddReducer';
import articleEditReducer from './articles/articleEditReducer';
import searcherReducer from './articles/searcherReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  login: loginReducer,
  signup: signupReducer,
  verifyUser: verifyUserReducer,
  profile: profileReducer,
  editProfile: editProfileReducer,
  articles: articlesReducer,
  article: articleReducer,
  articleAdd: articleAddReducer,
  articleEdit: articleEditReducer,
  searcher: searcherReducer,
});

export default rootReducer;
