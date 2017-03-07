import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import loginReducer from './auth/loginReducer';
import profileReducer from './application/profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  profile: profileReducer,
});

export default rootReducer;
