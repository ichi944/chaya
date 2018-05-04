import _ from 'lodash';
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
    case types.UPDATE_DESCRIPTION_IS_SUCCEEDED: {
      const updated = _.map(state.channels, (channel) => {
        if (channel.id === action.updated_channel.id) {
          return action.updated_channel;
        }
        return channel;
      });
      return {
        ...state,
        channels: updated,
      };
    }
    case types.UPDATE_CHANNEL_LIST: {
      return {
        ...state,
        channels: action.channels,
      };
    }
    default: {
      return state;
    }
  }
}
