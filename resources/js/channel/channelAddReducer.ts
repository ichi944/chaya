import * as types from './actionTypes';
import { ChannelAddState, ChannelActions } from './interfaces/channel';

const initialState = {
  name: '',
  description: '',
  nameValid: true,
  nameErrorMessage: '',
};

export default function channelAddReducer(
  state: ChannelAddState = initialState,
  action: ChannelActions,
): ChannelAddState {
  switch (action.type) {
    case types.UPDATE_CHANNEL_ADD_FORM: {
      return {
        ...state,
        [action.name]: action.value,
        nameValid: true,
        nameErrorMessage: '',
      };
    }
    case types.VALIDATE_CHANNEL_ADD_FAILED: {
      const { nameValid, nameErrorMessage } = action;
      return {
        ...state,
        nameValid,
        nameErrorMessage,
      };
    }
    case types.CHANNEL_ADD_SUCCEEDED: {
      return {
        ...state,
        name: '',
        description: '',
        nameValid: true,
        nameErrorMessage: '',
      };
    }
    default: {
      return state;
    }
  }
}
