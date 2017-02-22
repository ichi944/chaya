const AUTHENTICATED = 'AUTHENTICATED';
const SIGN_OUT = 'SIGN_OUT';
const START_CHECK_AUTH_STATUS = 'START_CHECK_AUTH_STATUS';
const END_CHECK_AUTH_STATUS = 'END_CHECK_AUTH_STATUS';
const FAILED_AHTENTICATION = 'FAILED_AHTENTICATION';

const initialState = {
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED: {
      console.log('in reduser authenticated');
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case SIGN_OUT: {
      console.log('in reducer: sign out');
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case FAILED_AHTENTICATION: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case START_CHECK_AUTH_STATUS: {
      console.log('in START_CHECK_AUTH_STATUS');
      return state;
    }
    case END_CHECK_AUTH_STATUS: {
      console.log('in END_CHECK_AUTH_STATUS');
      return state;
    }
    default: {
      return state;
    }
  }
}
