// @flow
import * as types from './actionTypes';

type EditProfileState = {
  name: string,
  newImageUrl: ?string,
  snackbarIsOpen: boolean,
}

const initialState = {
  name: '',
  newImageUrl: null,
  snackbarIsOpen: false,
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
      };
    }
    default: {
      return state;
    }
  }
}
