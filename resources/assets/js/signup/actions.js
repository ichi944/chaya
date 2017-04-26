import * as types from './actionTypes';
import Api from '../utils/Api';

export function startSignup() {
  return {
    type: types.START_SIGNUP,
  }
}

export function successSiginup() {
  console.log('successSiginup');
  return {
    type: types.SUCCESS_SIGNUP,
  }
}
export function requestSignup(name, email, password) {
  console.log('start request signup');
  return (dispatch) => {
    dispatch(startSignup());
    Api.client.post('/auth/signup', {
      name,
      email,
      password,
    })
      .then((res) => {
        console.log(res);
        dispatch(successSiginup());
      });
  }
}
