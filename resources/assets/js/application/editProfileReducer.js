// @flow
import * as types from './actionTypes';

type EditProfileState = {
  name: string,
  password: string,
  newImageUrl: ?string,
  snackbarIsOpen: boolean,
  snackbarMessage: string,
}

const initialState = {
  name: '',
  password: '',
  newImageUrl: null,
  snackbarIsOpen: false,
  snackbarMessage: '',
};

export default function editProfileReducer(state: EditProfileState = initialState, action: any) {
  switch (action.type) {
    case types.CLEAR_PROFILE_FORM: {
      return {
        ...state,
        ...initialState,
      };
    }
    case types.UPDATE_PROFILE_FORM: {
      console.log('@UPDATE_PROFILE_FORM');
      return {
        ...state,
        ...action.data,
      };
    }
    case types.CLEAR_NEW_IMAGE_PREVIEW: {
      return {
        ...state,
        newImageUrl: null,
      };
    }
    case types.SHOW_SUCCESS_NOTIFICATION: {
      return {
        ...state,
        snackbarIsOpen: true,
        snackbarMessage: 'Your update is succeeded.',
      };
    }
    case types.SHOW_FAILED_NOTIFICATION: {
      return {
        ...state,
        snackbarIsOpen: true,
        snackbarMessage: 'Your update was Failed.',
      };
    }
    case types.CLOSE_NOTIFICATION: {
      return {
        ...state,
        snackbarIsOpen: false,
      }
    }
    case types.CLEAR_PASSWORD_FORM: {
      return {
        ...state,
        password: '',
      };
    }
    case types.UPDATE_PASSWORD_FORM: {
      return {
        ...state,
        password: action.password,
      };
    }
    default: {
      return state;
    }
  }
}
