const LOGIN_START = 'LOGIN_START';
const LOGIN_CHANGE = 'LOGIN_CHANGE';

const initialState = {
  email: 'initial',
  password: '',
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CHANGE: {
      console.log('LOGIN_CHANGE', action);
      return Object.assign({}, state, { [action.name]: action.value });
    }
    case LOGIN_START: {
      console.log('LOGIN_START', state.email, state.password);
      return {
        email: 'checking',
        password: 'checking',
      };
    }
    default: {
      return state;
    }
  }
}
