import { Action } from 'redux';

import * as types from '../actionTypes';

export interface ProfileModel {
  id: number | null;
  name: string;
  email: string;
  avatar_img_url: string | null;
  is_admin: number;
  created_at: string;
}
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
  avatar_img_url?: string;
}
export interface UpdateProfileFormAction extends Action {
  type: typeof types.UPDATE_PROFILE_FORM;
  data: {
    [key: string]: string;
  };
}
export interface ClearProfileFormAction extends Action {
  type: typeof types.CLEAR_PROFILE_FORM;
}

export interface RequestProfileAction extends Action {
  type: typeof types.REQUEST_PROFILE;
}
export interface LoadedProfileAction extends Action {
  type: typeof types.LORDED_PROFILE;
  profile: ProfileModel;
}
export interface ClearProfileAction extends Action {
  type: typeof types.CLEAR_PROFILE;
}
export interface UpdateProfileAction extends Action {
  type: typeof types.UPDATE_PROFILE;
  data: any;
}
export interface ClearNewImagePreview extends Action {
  type: typeof types.CLEAR_NEW_IMAGE_PREVIEW;
}
export interface ShowSuccessNotification extends Action {
  type: typeof types.SHOW_SUCCESS_NOTIFICATION;
}
export interface ShowFailedNotification extends Action {
  type: typeof types.SHOW_FAILED_NOTIFICATION;
  errorMessage: string | null;
}
export interface CloseNotification extends Action {
  type: typeof types.CLOSE_NOTIFICATION;
}
export interface UpdatePasswordFormAction extends Action {
  type: typeof types.UPDATE_PASSWORD_FORM;
  password: string;
}
export interface ClearPasswordForm extends Action {
  type: typeof types.CLEAR_PASSWORD_FORM;
}
export type ProfileActions =
  | UpdateProfileFormAction
  | ClearProfileFormAction
  | RequestProfileAction
  | LoadedProfileAction
  | ClearProfileAction
  | UpdateProfileAction
  | ClearNewImagePreview
  | ShowSuccessNotification
  | ShowFailedNotification
  | CloseNotification
  | UpdatePasswordFormAction
  | ClearPasswordForm;

export interface ProfileState extends ProfileModel {
  isLoaded: boolean;
}
export interface EditProfileState {
  name: string;
  password: string;
  newImageUrl: string | null;
  snackbarIsOpen: boolean;
  snackbarMessage: string;
}
