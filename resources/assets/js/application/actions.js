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

    return Api.client.get('/profiles/me')
      .then((res) => {
        console.log('in fetchProfile');
        console.log(res);
        dispatch(receiveProfile(res.data.user));
      });
  };
}

export function clearProfile() {
  return {
    type: types.CLEAR_PROFILE,
  }
}

export function updateProfileForm(data) {
  return {
    type: types.UPDATE_PROFILE_FORM,
    data,
  }
}

export function requestCurrentProfile() {
  return (dispatch, getState) => {
    const currentData = {
      name: getState().profile.name,
    }
    dispatch(updateProfileForm(currentData));
  }
}

export function updateProfileIsSucceeded(data) {
  return {
    type: types.UPDATE_PROFILE,
    data,
  }
}
export function requestUpdateProfile() {
  return (dispatch, getState) => {
    const {
      name,
    } = getState().editProfile;
    Api.client.post('/profiles/update-me', {
      name,
    })
      .then((res) => {
        console.log(res);
        dispatch(updateProfileIsSucceeded({name}));
      })
  }
}
