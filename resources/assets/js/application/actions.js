import Api from '../utils/Api';
import * as types from './actionTypes';
import * as authTypes from '../auth/actionTypes';

export function requestProfile() {
  return {
    type: types.REQUEST_PROFILE,
  };
}

export function receiveProfile(profile) {
  return {
    type: types.LORDED_PROFILE,
    profile,
  };
}
/**
 * async action
 * @return {function}
 */
export function fetchProfile() {
  return function (dispatch) {
    dispatch(requestProfile());
    const token = localStorage.getItem('authToken');
    if (!token) {
      return dispatch({
        type: authTypes.FAILED_AHTENTICATION,
      });
    }
    Api.setAuthorizationToken(token);
    return Api.client.get('/profiles/me')
      .then((res) => {
        console.log('in fetchProfile');
        console.log(res);
        dispatch(receiveProfile(res.data.user));
      });
  };
}
