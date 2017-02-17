const AUTHENTICATED = 'AUTHENTICATED';
const SIGN_OUT = 'SIGN_OUT';

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
    default: {
      return state;
    }
  }
}
