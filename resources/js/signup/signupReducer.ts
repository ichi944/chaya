import * as types from './actionTypes';

interface SignupState {
  name: string;
  email: string;
  password: string;
  showErrorMessage: boolean;
  errorMessage: string;
};

const initialState = {
  name: '',
  email: '',
  password: '',
  showErrorMessage: false,
  errorMessage: '',
};

export default function signupReducer(state: SignupState = initialState, action: any) {
  switch (action.type) {
    case types.SIGNUP_CHANGE: {
      return {
        ...state,
        [action.name]: action.value,
        showErrorMessage: false,
        errorMessage: '',
      };
    }
    case types.START_SIGNUP: {
      console.log('starting sign up');
      return state;
    }
    case types.SUCCESS_SIGNUP: {
      return {
        ...state,
        name: '',
        email: '',
        password: '',
        showErrorMessage: false,
        errorMessage: false,
      };
    }
    default: {
      return state;
    }
  }
}
