import * as types from './actionTypes';

const initialState = {
  isDoneCheckingStatusAtInitialize: false,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.END_INITIAL_CHECK_STATUS: {
      return {
        ...state,
        isDoneCheckingStatusAtInitialize: true,
      };
    }
    case types.AUTHENTICATED: {
      console.log('in reduser authenticated');
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case types.SIGN_OUT: {
      console.log('in reducer: sign out');
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case types.FAILED_AHTENTICATION: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case types.START_CHECK_AUTH_STATUS: {
      console.log('in START_CHECK_AUTH_STATUS');
      return state;
    }
    case types.END_CHECK_AUTH_STATUS: {
      console.log('in END_CHECK_AUTH_STATUS');
      return state;
    }
    default: {
      return state;
    }
  }
}
