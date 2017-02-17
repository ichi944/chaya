const LOGIN_START = 'LOGIN_START';
const LOGIN_CHANGE = 'LOGIN_CHANGE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';

const initialState = {
  email: '',
  password: '',
  showErrorMessage: false,
  errorMessage: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CHANGE: {
      console.log('LOGIN_CHANGE', action);
      return {
        ...state,
        [action.name]: action.value,
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case LOGIN_START: {
      console.log('LOGIN_START', state.email, state.password);
      return {
        ...state,
        email: 'checking',
        password: 'checking',
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        email: '',
        password: '',
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case LOGIN_FAILED: {
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
