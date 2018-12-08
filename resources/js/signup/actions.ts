import { push, RouterAction } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';

import * as types from './actionTypes';
import { SignupActions } from './interfaces/signup';
import Api from '../services/Api';
import { VerifyUserActions } from './interfaces/verifyUser';
import { RootState } from '../interfaces/rootState';

export const signupChange = (name: string, value: string): SignupActions => ({
  type: types.SIGNUP_CHANGE,
  name,
  value,
});
export const startSignup = (): SignupActions => ({ type: types.START_SIGNUP });
export const successSiginup = (): SignupActions => ({ type: types.SUCCESS_SIGNUP });

export const requestSignup = (
  name: string,
  email: string,
  password: string,
): ThunkAction<void, RootState, undefined, SignupActions | RouterAction> => async dispatch => {
  console.log('start request signup');
  dispatch(startSignup());
  const res = await Api.client.post('/auth/signup', {
    name,
    email,
    password,
  });
  console.log(res);
  dispatch(successSiginup());
  dispatch(push('/app/signup-complete'));
};

export const verificationSucceeded = (): VerifyUserActions => ({
  type: types.VERIFICATION_SUCCEEDED,
});
export const verificationFailed = (): VerifyUserActions => ({ type: types.VERIFICATION_FAILED });

interface VerifyUserResponse {
  data: {
    _code: number;
  };
}
export const requestVerifyUser = (
  token: string,
): ThunkAction<void, RootState, undefined, VerifyUserActions> => async dispatch => {
  const res: VerifyUserResponse = await Api.client.get(`/auth/verification/${token}`);
  console.log('@requestVerifyUser', res);
  if (res.data._code === 0) {
    dispatch(verificationSucceeded());
  } else {
    dispatch(verificationFailed());
  }
};
