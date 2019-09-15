import * as React from 'react';
import Echo from 'laravel-echo';
import { ThunkAction } from 'redux-thunk';

import * as types from './actionTypes';
import { LoginActions } from './interfaces/login';

import { AuthActions } from './interfaces/auth';
import { RootState } from '../interfaces/rootState';

import { clearSocketId } from '../initialization/actions';
import { SocketActions } from '../initialization/interfaces/socket';

import Api from '../services/Api';
import { AxiosResponse, AxiosError } from 'axios';

interface Window {
  Echo: any;
  location: any;
}
declare var window: Window;

export const updateLoginForm = (e: React.ChangeEvent<HTMLInputElement>): LoginActions => ({
  type: types.LOGIN_CHANGE,
  name: e.currentTarget.name,
  value: e.currentTarget.value,
});

export const storeAuthorizationTokenToState = (token: string): AuthActions => ({
  type: types.STORE_AUTHORIZTION_TOKEN_TO_STATE,
  token,
});

export const initializeSocketIOSucceeded = (): AuthActions => ({
  type: types.INITIALIZE_SOCKET_IO_SUCCEEDED,
});

export const requestInitializeSocketIO = (
  token: string,
): ThunkAction<void, RootState, undefined, AuthActions> => dispatch => {
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: `${window.location.hostname}:6001`,
    auth: {
      headers: {
        Authorization: `Bearer ${token.toString()}`,
      },
    },
  });
  dispatch(initializeSocketIOSucceeded());
};

export const startCheckAuthStatus = (): AuthActions => ({ type: types.START_CHECK_AUTH_STATUS });
export const failedAuthentication = (): AuthActions => ({ type: types.FAILED_AUTHENTICATION });
export const endInitialCheckStatus = (): AuthActions => ({ type: types.END_INITIAL_CHECK_STATUS });
export const authenticated = (): AuthActions => ({ type: types.AUTHENTICATED });
export const endCheckAuthStatus = (): AuthActions => ({ type: types.END_CHECK_AUTH_STATUS });

export const handleCheckAuthStatus = (): ThunkAction<
  void,
  RootState,
  undefined,
  AuthActions
> => async dispatch => {
  console.log('start check auth status');
  dispatch(startCheckAuthStatus());
  // configure the handler when token expired.
  Api.setInterceptors(
    (response: AxiosResponse) => {
      console.log('@interceptor', response);
      if (response.status === 401) {
        console.log('@interceptor: token expired');
        console.log(response);
        dispatch(failedAuthentication());
        dispatch(endInitialCheckStatus());
        // return {
        //   status: 401,
        // };
        return Promise.reject(response);
      }
      return response;
    },
    (error: AxiosError) => {
      console.log('@interceptor: api gets error.');
      console.log(error);
      return Promise.reject(error);
    },
  );
  console.log('check if the token exists in the localStorage');
  const token: string | null = localStorage.getItem('authToken');
  if (!token) {
    console.log('token does not exist');
    dispatch(endInitialCheckStatus());
    dispatch(endCheckAuthStatus());
    return;
  }
  console.log('token exists');
  dispatch(storeAuthorizationTokenToState(token));

  Api.setAuthorizationToken(token);
  const res = await Api.client.get('/auth/hello');
  console.log('response of hello: ', res.data);
  if (res.data.hasOwnProperty('status') && res.data.status === true) {
    console.log('already authenticated');
    dispatch(requestInitializeSocketIO(token));
    dispatch(authenticated());
  }
  dispatch(endInitialCheckStatus());
};

export const loginStart = (): LoginActions => ({ type: types.LOGIN_START });
export const loginFailed = (error: string): LoginActions => ({
  type: types.LOGIN_FAILED,
  errorMessage: error,
});
export const loginSuccess = (): LoginActions => ({ type: types.LOGIN_SUCCESS });

interface LoginResponse {
  data: {
    error: string;
    token: string;
  };
}
export const authenticate = (
  email: string,
  password: string,
): ThunkAction<void, RootState, undefined, AuthActions | LoginActions> => async dispatch => {
  console.log('start authentication', email);

  dispatch(loginStart());

  const res: LoginResponse = await Api.client.post('/auth/login', {
    email,
    password,
  });
  console.log(res.data);
  if (res.data.error) {
    console.log('error');
    dispatch(failedAuthentication());
    dispatch(loginFailed(res.data.error));
    return;
  } // endif: when error

  if (res.data.token) {
    console.log('authenticated');
    const { token } = res.data;

    dispatch(requestInitializeSocketIO(token));
    dispatch(storeAuthorizationTokenToState(token));
    Api.setAuthorizationToken(token);
    localStorage.setItem('authToken', token);
    dispatch(loginSuccess());
    dispatch(authenticated());
  }
};

export const successSignOut = (): AuthActions => ({ type: types.SIGN_OUT });

export const requestSignOut = (): ThunkAction<
  void,
  RootState,
  undefined,
  AuthActions | SocketActions
> => dispatch => {
  Api.client.get('/auth/signout').then(() => {
    Api.clearSocketId();
    Api.clearAuthorizationToken();
    localStorage.removeItem('authToken');
    dispatch(clearSocketId());
    dispatch(successSignOut());
  });
};
