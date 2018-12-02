import Echo from 'laravel-echo';

import * as types from './actionTypes';
import { clearSocketId } from '../application/actions';

import Api from '../services/Api';

interface Window { Echo: any, location: any }
declare var window: Window;

export function storeAuthorizationTokenToState(token) {
  return {
    type: types.STORE_AUTHORIZTION_TOKEN_TO_STATE,
    token,
  };
}

export function initializeSocketIOSucceeded() {
  return {
    type: types.INITIALIZE_SOCKET_IO_SUCCEEDED,
  };
}
export function requestInitializeSocketIO(token) {
  return (dispatch) => {
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
}

export function handleCheckAuthStatus() {
  return (dispatch) => {
    console.log('start check auth status');
    dispatch({
      type: types.START_CHECK_AUTH_STATUS,
    });
    // configure the handler when token expired.
    Api.setInterceptors(
      (response) => {
        console.log('@interceptor', response);
        if (response.status === 401) {
          console.log('@interceptor: token expired');
          console.log(response);
          dispatch({
            type: types.FAILED_AUTHENTICATION,
          });
          dispatch({
            type: types.END_INITIAL_CHECK_STATUS,
          });
          // return {
          //   status: 401,
          // };
          return Promise.reject(response);
        }
        return response;
      },
      (error) => {
        console.log('@interceptor: api gets error.');
        console.log(error);
        return Promise.reject(error);
      },
    );
    console.log('check if the token exists in localStorage');
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('token exists: ', token);
      dispatch(storeAuthorizationTokenToState(token));

      Api.setAuthorizationToken(token);
      Api.client.get('/auth/hello').then((res) => {
        console.log('response of hello: ', res.data);
        if (res.data.hasOwnProperty('status') && res.data.status === true) {
          console.log('already authenticated');

          dispatch(requestInitializeSocketIO(token));
          dispatch({
            type: types.AUTHENTICATED,
          });
          dispatch({
            type: types.END_INITIAL_CHECK_STATUS,
          });
        }
      });
    } else {
      dispatch({
        type: types.END_INITIAL_CHECK_STATUS,
      });
      dispatch({
        type: types.END_CHECK_AUTH_STATUS,
      });
    }
  };
}

export function authenticate(email, password) {
  return (dispatch) => {
    console.log('start authentication', email);

    dispatch({
      type: types.LOGIN_START,
    });

    Api.client
      .post('/auth/login', {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log('error');
          dispatch({
            type: types.FAILED_AUTHENTICATION,
          });
          dispatch({
            type: types.LOGIN_FAILED,
            errorMessage: res.data.error,
          });
          return;
        } // endif: when error
        if (res.data.token) {
          console.log('authenticated');
          const { token } = res.data;

          dispatch(requestInitializeSocketIO(token));
          dispatch(storeAuthorizationTokenToState(token));
          Api.setAuthorizationToken(token);
          localStorage.setItem('authToken', token);
          dispatch({
            type: types.LOGIN_SUCCESS,
          });
          dispatch({
            type: types.AUTHENTICATED,
          });
        }
      });
  };
}

export function successSignOut() {
  return {
    type: types.SIGN_OUT,
  };
}
export function requestSignOut() {
  return (dispatch) => {
    Api.client.get('/auth/signout').then(() => {
      Api.clearSocketId();
      Api.clearAuthorizationToken();
      dispatch(clearSocketId());
      dispatch(successSignOut());
    });
  };
}
