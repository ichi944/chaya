import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/authReducer';
import loginReducer from './auth/loginReducer';
import profileReducer from './application/profileReducer';
import articlesReducer from './articles/articlesReducer';
import articleReducer from './articles/articleReducer';
import articleAddReducer from './articles/articleAddReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  login: loginReducer,
  profile: profileReducer,
  articles: articlesReducer,
  article: articleReducer,
  articleAdd: articleAddReducer,
});

export default rootReducer;
