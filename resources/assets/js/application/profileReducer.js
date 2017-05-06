import * as types from './actionTypes';

const initialState = {
  isLoaded: false,
  id: null,
  name: '',
  email: '',
  avatorUrl: '',
  created_at: '',
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PROFILE: {
      return state;
    }
    case types.LORDED_PROFILE: {
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
    case types.CLEAR_PROFILE: {
      return initialState;
    }
    case types.UPDATE_PROFILE: {
      const data = action.data;
      return {
        ...state,
        ...data,
      }
    }
    default: {
      return state;
    }
  }
}
