// @flow
import * as types from './actionTypes';

type EditProfileState = {
  name: string,
}

const initialState = {
  name: '',
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
    default: {
      return state;
    }
  }
}
