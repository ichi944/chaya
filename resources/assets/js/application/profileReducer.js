import * as types from './actionTypes';

const initialState = {
  isLoaded: false,
  id: null,
  name: '',
  email: '',
  created_at: '',
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PROFILE: {
      console.log('REQUEST_PROFILE');
      return state;
    }
    case types.LORDED_PROFILE: {
      console.log('LORDED_PROFILE', action.profile);
      const {
        id,
        name,
        email,
        created_at,
      } = action.profile;
      return {
        ...state,
        isLoaded: true,
        id,
        name,
        email,
        created_at,
      };
    }
    default: {
      return state;
    }
  }
}
