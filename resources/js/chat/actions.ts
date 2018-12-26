import { ThunkAction } from 'redux-thunk';
import * as types from './actionTypes';
import Api from '../services/Api';
import { MessageModel, ChatActions } from './interfaces/chat';
import { RootState } from '../interfaces/rootState';
import { AxiosResponse } from 'axios';

export const fetchLatestMessagesSucceeded = (messages: MessageModel[]): ChatActions => {
  const show_no_messages_info = messages.length === 0;
  return {
    type: types.FETCH_LATEST_MESSAGES_SUCCEEDED,
    messages,
    show_no_messages_info,
  };
};

interface GetChatMessagesResponse {
  _code: number;
  content: MessageModel[];
}
export const requestLatestMessages = (
  article_id: number,
): ThunkAction<void, RootState, undefined, ChatActions> => async dispatch => {
  const res: AxiosResponse<GetChatMessagesResponse> = await Api.client.get(
    `/articles/${article_id}/get-chat-messages`,
  );
  if (res.data._code !== 0) {
    console.log('failed to get chat messages');
    return;
  }
  dispatch(fetchLatestMessagesSucceeded(res.data.content));
};

export const fetchMessagesSucceeded = (chat_messages: MessageModel[]): ChatActions => {
  const show_no_messages_info = chat_messages.length === 0;
  return {
    type: types.FETCH_MESSAGES_SUCCEEDED,
    chat_messages,
    show_no_messages_info,
  };
};

export const noMessagesInfoShown = (): ChatActions => ({
  type: types.NO_MESSAGES_INFO_SHOWN,
});

export const requestMessages = (
  article_id: number,
  max_id: number,
): ThunkAction<void, RootState, undefined, ChatActions> => async dispatch => {
  const res: AxiosResponse<GetChatMessagesResponse> = await Api.client.get(
    `/articles/${article_id}/get-chat-messages`,
    {
      params: {
        max_id,
      },
    },
  );
  if (res.data._code !== 0) {
    dispatch(noMessagesInfoShown());
  }
  dispatch(fetchMessagesSucceeded(res.data.content));
};

export const updateChatInput = (value: string): ChatActions => ({
  type: types.UPDATE_CHAT_INPUT,
  value,
});

export const startPostChatMessage = (): ChatActions => ({
  type: types.POST_CHAT_MESSAGE_START,
});

export const successPostChatMessage = (): ChatActions => ({
  type: types.POST_CHAT_MESSAGE_SUCCEEDED,
});

interface RequestPostChatMessageResponse {
  _code: number;
}
export const requestPostChatMessage = (
  chat_message: any,
  article_id: number,
): ThunkAction<void, RootState, undefined, ChatActions> => async dispatch => {
  dispatch(startPostChatMessage());
  const res: AxiosResponse<RequestPostChatMessageResponse> = await Api.client.post(
    `/articles/${article_id}/post-chat-message`,
    {
      chat_message,
    },
  );
  if (res.data._code !== 0) {
    console.log('failed to post a chat message');
    return;
  }
  dispatch(successPostChatMessage());
};

export const addNewArticleChatMessage = (chat_message: MessageModel): ChatActions => {
  return {
    type: types.ADD_NEW_ARTICLE_CHAT_MESSAGE,
    chat_message,
  };
};
