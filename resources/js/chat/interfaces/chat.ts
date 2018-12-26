import { Action } from 'redux';

import * as types from '../actionTypes';
import { ProfileModel } from '../../application/interfaces/profile';

export interface MessageModel {
  id: number;
  article_id: number;
  user_id: number;
  user: ProfileModel;
  body: string;
  created_at: string;
  updated_at: string;
}
export interface FetchLatestMessagesSucceeded {
  type: typeof types.FETCH_LATEST_MESSAGES_SUCCEEDED;
  messages: MessageModel[];
  show_no_messages_info: boolean;
}
export interface FetchMessagesSucceeded {
  type: typeof types.FETCH_MESSAGES_SUCCEEDED;
  chat_messages: MessageModel[];
  show_no_messages_info: boolean;
}
export interface NoMessagesInfoShown {
  type: typeof types.NO_MESSAGES_INFO_SHOWN;
}
export interface UpdateChatInput {
  type: typeof types.UPDATE_CHAT_INPUT;
  value: string;
}
export interface StartPostChatMessage {
  type: typeof types.POST_CHAT_MESSAGE_START;
}
export interface SuccessPostChatMessage {
  type: typeof types.POST_CHAT_MESSAGE_SUCCEEDED;
}
export interface AddNewArticleChatMessage {
  type: typeof types.ADD_NEW_ARTICLE_CHAT_MESSAGE;
  chat_message: MessageModel;
}

export type ChatActions =
  | FetchLatestMessagesSucceeded
  | FetchMessagesSucceeded
  | NoMessagesInfoShown
  | UpdateChatInput
  | StartPostChatMessage
  | SuccessPostChatMessage
  | AddNewArticleChatMessage;

export interface ChatState {
  messages: MessageModel[];
  chatInput: string;
  show_no_messages_info: boolean;
}
