import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import loginReducer from './auth/loginReducer';
import profileReducer from './application/profileReducer';
import articlesReducer from './articles/articlesReducer';
import articleReducer from './articles/articleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  profile: profileReducer,
  articles: articlesReducer,
  article: articleReducer,
});

export default rootReducer;
