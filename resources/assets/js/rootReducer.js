const LOGIN_START = 'LOGIN_START';
const LOGIN_CHANGE = 'LOGIN_CHANGE';
const AUTHENTICATED = 'AUTHENTICATED';

const initialState = {
  email: 'initial',
  password: '',
  isAuthenticated: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CHANGE: {
      console.log('LOGIN_CHANGE', action);
      return Object.assign({}, state, { [action.name]: action.value });
    }
    case LOGIN_START: {
      console.log('LOGIN_START', state.email, state.password);
      const updates = {
        email: 'checking',
        password: 'checking',
      };
      return Object.assign({}, state, updates);
    }
    case AUTHENTICATED: {
      console.log('in reduser authenticated');
      return Object.assign({}, state, { isAuthenticated: true });
    }
    default: {
      return state;
    }
  }
}
