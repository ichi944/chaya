import * as types from './actionTypes';

const initialState = {
  isLoaded: false,
  name: '',
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PROFILE: {
      console.log('REQUEST_PROFILE');
      return state;
    }
    case types.LORDED_PROFILE: {
      console.log('LORDED_PROFILE', action.profile);
      return {
        ...state,
        isLoaded: true,
        name: action.profile.name,
      };
    }
    default: {
      return state;
    }
  }
}
