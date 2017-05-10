// @flow
import * as types from './actionTypes';

type EditProfileState = {
  name: string,
  newImageUrl: ?string,
}

const initialState = {
  name: '',
  newImageUrl: null,
};

export default function editProfileReducer(state: EditProfileState = initialState, action: any) {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
}
