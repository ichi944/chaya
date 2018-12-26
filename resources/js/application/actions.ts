import { ThunkAction } from 'redux-thunk';
import Api from '../services/Api';
import * as types from './actionTypes';
import { SocketActions, SocketState } from './interfaces/socket';
import {
  ProfileModel,
  ProfileState,
  ProfileActions,
  UpdateProfileRequest,
} from './interfaces/profile';
import { RootState } from '../interfaces/rootState';
import { AxiosResponse } from 'axios';

interface Window {
  Echo: any;
  location: any;
}
declare var window: Window;

export const clearProfileForm = (): ProfileActions => ({ type: types.CLEAR_PROFILE_FORM });
export const requestProfile = (): ProfileActions => ({ type: types.REQUEST_PROFILE });
export const receiveProfile = (profile: ProfileModel): ProfileActions => ({
  type: types.LORDED_PROFILE,
  profile,
});

interface MeResponse {
  data: {
    user: ProfileModel;
  };
}
export const fetchProfile = (): ThunkAction<
  void,
  ProfileState,
  undefined,
  ProfileActions
> => async dispatch => {
  dispatch(requestProfile());

  const res: MeResponse = await Api.client.get('/profiles/me');
  console.log('in fetchProfile');
  console.log(res);
  dispatch(receiveProfile(res.data.user));
};

export const clearProfile = (): ProfileActions => ({ type: types.CLEAR_PROFILE });

export const updateProfileForm = (data): ProfileActions => {
  return {
    type: types.UPDATE_PROFILE_FORM,
    data,
  };
};

export const requestCurrentProfile = (): ThunkAction<
  void,
  RootState,
  undefined,
  ProfileActions
> => (dispatch, getState) => {
  const currentData = getState().profile;
  dispatch(updateProfileForm(currentData));
};

export const updateProfileIsSucceeded = (data: UpdateProfileRequest): ProfileActions => {
  return {
    type: types.UPDATE_PROFILE,
    data,
  };
};

export const clearNewImagePreview = (): ProfileActions => ({ type: types.CLEAR_NEW_IMAGE_PREVIEW });
export const showSuccessNotification = (): ProfileActions => ({
  type: types.SHOW_SUCCESS_NOTIFICATION,
});

export const showFailedNotification = (errorMessage = null): ProfileActions => {
  return {
    type: types.SHOW_FAILED_NOTIFICATION,
    errorMessage,
  };
};

export const closeNotification = (): ProfileActions => ({ type: types.CLOSE_NOTIFICATION });

interface UpdateAvatarResponse {
  filename: string;
}
export const requestUpdateAvatar = (
  imageData,
): ThunkAction<void, RootState, undefined, ProfileActions> => async dispatch => {
  const data = new FormData();
  data.append('image_data', imageData);
  const res: AxiosResponse<UpdateAvatarResponse> = await Api.client.post(
    '/profiles/update-my-avatar',
    data,
  );
  console.log(res);
  dispatch(updateProfileIsSucceeded({ avatar_img_url: res.data.filename }));
  dispatch(clearNewImagePreview());
  dispatch(showSuccessNotification());
};

interface UpdateProfileResponse {
  data: {
    _code: number;
  };
}
export const requestUpdateProfile = (): ThunkAction<
  void,
  RootState,
  undefined,
  ProfileActions
> => async (dispatch, getState) => {
  const { name } = getState().editProfile;
  const data = new FormData();
  data.append('name', name);
  const res: UpdateProfileResponse = await Api.client.post('/profiles/update-me', data);
  console.log(res);
  if (res.data._code === 0) {
    dispatch(updateProfileIsSucceeded({ name }));
    dispatch(showSuccessNotification());
  } else {
    dispatch(showFailedNotification());
  }
};

export const updatePasswordForm = (password: string): ProfileActions => ({
  type: types.UPDATE_PASSWORD_FORM,
  password,
});

export const clearPasswordForm = (): ProfileActions => ({
  type: types.CLEAR_PASSWORD_FORM,
});

interface UpdataPasswordResponse {
  data: {
    _code: number;
  };
}
export const requestUpdatePassword = (): ThunkAction<
  void,
  RootState,
  undefined,
  ProfileActions
> => async (dispatch, getState) => {
  const { password } = getState().editProfile;
  const res: UpdateProfileResponse = await Api.client.post('/profiles/update-my-password', {
    password,
  });
  console.log(res);
  if (res.data._code === 0) {
    dispatch(clearPasswordForm());
    dispatch(showSuccessNotification());
  } else {
    dispatch(showFailedNotification());
  }
};

export const doneSetSocketId = (): SocketActions => ({ type: types.DONE_SET_SOCKET_ID });

export const configureSocketId = (): ThunkAction<
  void,
  SocketState,
  undefined,
  SocketActions
> => dispatch => {
  const socketId = window.Echo.socketId();
  console.log('@getting socketId: ', socketId);
  Api.setSocketId(socketId);
  dispatch(doneSetSocketId());
};

export const clearSocketId = (): SocketActions => ({ type: types.CLEAR_SOCKET_ID });
