import * as types from './actionTypes';
import { ProfileState, ProfileActions } from './interfaces/profile';

const initialState = {
  isLoaded: false,
  id: null,
  name: '',
  email: '',
  avatar_img_url: '',
  is_admin: 0,
  created_at: '',
};

export default (state: ProfileState = initialState, action: ProfileActions): ProfileState => {
  switch (action.type) {
    case types.REQUEST_PROFILE: {
      return state;
    }
    case types.LORDED_PROFILE: {
      const { id, name, email, avatar_img_url, is_admin, created_at } = action.profile;
      return {
        ...state,
        isLoaded: true,
        id,
        name,
        email,
        avatar_img_url,
        is_admin,
        created_at,
      };
    }
    case types.CLEAR_PROFILE: {
      return initialState;
    }
    case types.UPDATE_PROFILE: {
      const data = action.data;
      return {
        ...state,
        ...data,
      };
    }
    default: {
      return state;
    }
  }
};
