import Api from '../services/Api';
import * as types from './actionTypes';
import { SocketActions } from './interfaces/socket';

interface Window {
  Echo: any;
  location: any;
}
declare var window: Window;

export const clearProfileForm = () => ({ type: types.CLEAR_PROFILE_FORM });
export const requestProfile = () => ({ type: types.REQUEST_PROFILE });
export const receiveProfile = profile => ({
  type: types.LORDED_PROFILE,
  profile,
});
/**
 * async action
 * @return {function}
 */
export function fetchProfile() {
  return dispatch => {
    dispatch(requestProfile());

    return Api.client.get('/profiles/me').then(res => {
      console.log('in fetchProfile');
      console.log(res);
      dispatch(receiveProfile(res.data.user));
    });
  };
}

export function clearProfile() {
  return {
    type: types.CLEAR_PROFILE,
  };
}

export function updateProfileForm(data) {
  return {
    type: types.UPDATE_PROFILE_FORM,
    data,
  };
}

export function requestCurrentProfile() {
  return (dispatch, getState) => {
    const currentData = getState().profile;
    dispatch(updateProfileForm(currentData));
  };
}

export function updateProfileIsSucceeded(data) {
  return {
    type: types.UPDATE_PROFILE,
    data,
  };
}

export function clearNewImagePreview() {
  return {
    type: types.CLEAR_NEW_IMAGE_PREVIEW,
  };
}

export function showSuccessNotification() {
  return {
    type: types.SHOW_SUCCESS_NOTIFICATION,
  };
}

export function showFailedNotification(errorMessage = null) {
  return {
    type: types.SHOW_FAILED_NOTIFICATION,
    errorMessage,
  };
}

export function closeNotification() {
  return {
    type: types.CLOSE_NOTIFICATION,
  };
}

export function requestUpdateAvatar(imageData) {
  return dispatch => {
    const data = new FormData();
    data.append('image_data', imageData);
    Api.client.post('/profiles/update-my-avatar', data).then(res => {
      console.log(res);
      dispatch(updateProfileIsSucceeded({ avatar_img_url: res.data.filename }));
      dispatch(clearNewImagePreview());
      dispatch(showSuccessNotification());
    });
  };
}

export function requestUpdateProfile() {
  return (dispatch, getState) => {
    const { name } = getState().editProfile;
    const data = new FormData();
    data.append('name', name);
    Api.client.post('/profiles/update-me', data).then(res => {
      console.log(res);
      if (res.data._code === 0) {
        dispatch(updateProfileIsSucceeded({ name }));
        dispatch(showSuccessNotification());
      } else {
        dispatch(showFailedNotification());
      }
    });
  };
}

export function updatePasswordForm(password) {
  return {
    type: types.UPDATE_PASSWORD_FORM,
    password,
  };
}

export function clearPasswordForm() {
  return {
    type: types.CLEAR_PASSWORD_FORM,
  };
}
export function requestUpdatePassword() {
  return (dispatch, getState) => {
    const { password } = getState().editProfile;
    Api.client.post('/profiles/update-my-password', { password }).then(res => {
      console.log(res);
      if (res.data._code === 0) {
        dispatch(clearPasswordForm());
        dispatch(showSuccessNotification());
      } else {
        dispatch(showFailedNotification());
      }
    });
  };
}

export function configureSocketId() {
  const socketId = window.Echo.socketId();
  console.log('@getting socketId: ', socketId);
  Api.setSocketId(socketId);
  return {
    type: types.DONE_SET_SOCKET_ID,
  };
}

export const clearSocketId = (): SocketActions => ({ type: types.CLEAR_SOCKET_ID });
