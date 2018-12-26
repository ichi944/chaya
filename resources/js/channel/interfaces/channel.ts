import { Action } from 'redux';
import * as types from '../actionTypes';
import { type } from 'os';

export interface FetchChannelIsSucceededAction extends Action {
  type: typeof types.FETCH_CHANNEL_IS_SUCCEEDED;
  channels: any[];
}
export interface UpdateDescriptionIsSucceededAction extends Action {
  type: typeof types.UPDATE_DESCRIPTION_IS_SUCCEEDED;
  updated_channel: ChannelModel;
}
export interface UpdateChannelAddForm extends Action {
  type: typeof types.UPDATE_CHANNEL_ADD_FORM;
  [key: string]: string;
  value: string;
}
export interface ChannelAddSucceeded extends Action {
  type: typeof types.CHANNEL_ADD_SUCCEEDED;
}
export interface ValidateChannelAddFailed extends Action {
  type: typeof types.VALIDATE_CHANNEL_ADD_FAILED;
  nameValid: boolean;
  nameErrorMessage: string;
}
export interface UpdateChannelList extends Action {
  type: typeof types.UPDATE_CHANNEL_LIST;
  channels: ChannelModel[];
}

export type ChannelActions =
  | FetchChannelIsSucceededAction
  | UpdateDescriptionIsSucceededAction
  | UpdateChannelAddForm
  | ChannelAddSucceeded
  | ValidateChannelAddFailed
  | UpdateChannelList;

export interface ChannelModel {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ChannelsState {
  isLoaded: boolean;
  channels: ChannelModel[];
}

export interface ChannelAddState {
  name: string;
  description: string;
  nameValid: boolean;
  nameErrorMessage: string;
}
