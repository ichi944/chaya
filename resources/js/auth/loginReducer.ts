import * as types from './actionTypes';

import { LoginState, LoginActions } from './interfaces/login';

const initialState = {
  email: '',
  password: '',
  showErrorMessage: false,
  errorMessage: '',
};

export default function loginReducer(
  state: LoginState = initialState,
  action: LoginActions,
): LoginState {
  switch (action.type) {
    case types.LOGIN_CHANGE: {
      return {
        ...state,
        [action.name]: action.value,
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case types.LOGIN_START: {
      return state;
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        email: '',
        password: '',
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case types.LOGIN_FAILED: {
      return {
        ...state,
        password: '',
        showErrorMessage: true,
        errorMessage: action.errorMessage,
      };
    }
    default: {
      return state;
    }
  }
}
