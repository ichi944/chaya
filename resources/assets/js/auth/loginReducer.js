import * as types from './actionTypes';

const initialState = {
  email: '',
  password: '',
  showErrorMessage: false,
  errorMessage: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_CHANGE: {
      console.log('LOGIN_CHANGE', action);
      return {
        ...state,
        [action.name]: action.value,
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case types.LOGIN_START: {
      console.log('LOGIN_START', state.email, state.password);
      return {
        ...state,
        email: 'checking',
        password: 'checking',
      };
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
