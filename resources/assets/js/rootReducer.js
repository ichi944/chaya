import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import loginReducer from './auth/loginReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
});

export default rootReducer;
