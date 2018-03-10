import * as types from './actionTypes';

export function updateChatInput(value) {
  return {
    type: types.UPDATE_CHAT_INPUT,
    value,
  };
}
