import * as types from './actionTypes';

import { AuthState, AuthActions } from './interfaces/auth';

const initialState = {
  isDoneCheckingStatusAtInitialize: false,
  isAuthenticated: false,
  authorizationToken: null,
};

export default (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case types.END_INITIAL_CHECK_STATUS: {
      return {
        ...state,
        isDoneCheckingStatusAtInitialize: true,
      };
    }
    case types.STORE_AUTHORIZTION_TOKEN_TO_STATE: {
      return {
        ...state,
        authorizationToken: action.token,
      };
    }
    case types.AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case types.SIGN_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        authorizationToken: null,
      };
    }
    case types.FAILED_AUTHENTICATION: {
      return {
        ...state,
        isAuthenticated: false,
        authorizationToken: null,
      };
    }
    case types.START_CHECK_AUTH_STATUS: {
      return state;
    }
    case types.END_CHECK_AUTH_STATUS: {
      return state;
    }
    default: {
      return state;
    }
  }
};
