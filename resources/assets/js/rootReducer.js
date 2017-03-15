import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import loginReducer from './auth/loginReducer';
import profileReducer from './application/profileReducer';
import articleReducer from './articles/articleReducer';
import articleDetailReducer from './articles/articleDetailReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  profile: profileReducer,
  articles: articleReducer,
  article: articleDetailReducer,
});

export default rootReducer;
