import * as types from './actionTypes';

const initialState = {
  isLoaded: false,
  channels: [],
};

export default function channelsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CHANNEL_IS_SUCCEEDED: {
      return {
        ...state,
        channels: action.channels,
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}
