import * as types from './actionTypes';
import Api from '../services/Api';

export function fetchLatestMessagesSucceeded(messages) {
  const show_no_messages_info = messages.length === 0;
  return {
    type: types.FETCH_LATEST_MESSAGES_SUCCEEDED,
    messages,
    show_no_messages_info,
  };
}

export function requestLatestMessages(article_id) {
  return (dispatch) => {
    Api.client.get(`/articles/${article_id}/get-chat-messages`).then((res) => {
      if (res.data._code === 0) {
        dispatch(fetchLatestMessagesSucceeded(res.data.content));
      }
    });
  };
}

export function fetchMessagesSucceeded(chat_messages) {
  const show_no_messages_info = chat_messages.length === 0;
  return {
    type: types.FETCH_MESSAGES_SUCCEEDED,
    chat_messages,
    show_no_messages_info,
  };
}

export function noMessagesInfoShown() {
  return {
    type: types.NO_MESSAGES_INFO_SHOWN,
  };
}

export function requestMessages(article_id, max_id) {
  return (dispatch) => {
    Api.client
      .get(`/articles/${article_id}/get-chat-messages`, {
        params: {
          max_id,
        },
      })
      .then((res) => {
        if (res.data._code === 0) {
          dispatch(fetchMessagesSucceeded(res.data.content));
        } else {
          dispatch(noMessagesInfoShown());
        }
      });
  };
}

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

export function addNewArticleChatMessage(chat_message) {
  return {
    type: types.ADD_NEW_ARTICLE_CHAT_MESSAGE,
    chat_message,
  };
}
