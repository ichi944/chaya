import { push } from 'react-router-redux';
import * as types from './actionTypes';
import Api from '../services/Api';

export function startSignup() {
  return {
    type: types.START_SIGNUP,
  };
}

export function successSiginup() {
  console.log('successSiginup');
  return {
    type: types.SUCCESS_SIGNUP,
  };
}
export function requestSignup(name, email, password) {
  console.log('start request signup');
  return (dispatch) => {
    dispatch(startSignup());
    Api.client
      .post('/auth/signup', {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        dispatch(successSiginup());
        dispatch(push('/app/signup-complete'));
      });
  };
}

export function verificationSucceeded() {
  return {
    type: types.VERIFICATION_SUCCEEDED,
  };
}

export function verificationFailed() {
  return {
    type: types.VERIFICATION_FAILED,
  };
}
export function requestVerifyUser(token) {
  return (dispatch) => {
    Api.client.get(`/auth/verification/${token}`).then((res) => {
      console.log('@requestVerifyUser', res);
      if (res.data._code === 0) {
        dispatch(verificationSucceeded());
      } else {
        dispatch(verificationFailed());
      }
    });
  };
}
