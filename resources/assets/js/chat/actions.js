import * as types from './actionTypes';
import Api from '../services/Api';

export function updateChatInput(value) {
  return {
    type: types.UPDATE_CHAT_INPUT,
    value,
  };
}

export function startPostChatMessage() {
  return {
    type: types.POST_CHAT_MESSAGE_START,
  };
}

export function successPostChatMessage() {
  return {
    type: types.POST_CHAT_MESSAGE_SUCCEEDED,
  };
}

export function requestPostChatMessage(chat_message, article_id) {
  return function (dispatch) {
    dispatch(startPostChatMessage());
    Api.client
      .post(`/articles/${article_id}/post-chat-message`, {
        chat_message,
      })
      .then((res) => {
        dispatch(successPostChatMessage());
      }); // Api
  };
}
