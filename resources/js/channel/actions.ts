import { ThunkAction } from 'redux-thunk';
import Api from '../services/Api';
import * as types from './actionTypes';
import { ChannelModel, ChannelActions } from './interfaces/channel';
import { closeDescriptionEditor } from '../article_lists/actions';
import { RootState } from '../interfaces/rootState';
import { number } from 'prop-types';
import { AxiosResponse } from 'axios';

export const fetchChannelIsSucceeded = (channels: ChannelModel[]): ChannelActions => ({
  type: types.FETCH_CHANNEL_IS_SUCCEEDED,
  channels,
});

interface ChannelsResponse {
  _code: number;
  channels: ChannelModel[];
}
export const fetchChannel = (): ThunkAction<void, RootState, undefined, ChannelActions> => {
  return async dispatch => {
    const res: AxiosResponse<ChannelsResponse> = await Api.client.get('/channels');
    if (res.data._code !== 0) {
      console.log('failed to load channel');
      return;
    }
    dispatch(fetchChannelIsSucceeded(res.data.channels));
  };
};

export const updateDescriptionIsSucceeded = (updated_channel: ChannelModel): ChannelActions => {
  return {
    type: types.UPDATE_DESCRIPTION_IS_SUCCEEDED,
    updated_channel,
  };
};

interface UpdateChannelDescriptionResponse {
  channel: ChannelModel;
}
export const requestUpdateChannelDescription = (): ThunkAction<
  void,
  RootState,
  undefined,
  ChannelActions | any
> => {
  return async (dispatch, getState) => {
    const channel = getState().articleLists.channel;
    if (!channel) {
      return;
    }
    const channel_id = channel.id;
    const description = getState().articleLists.descriptionEditorContent;
    const res: AxiosResponse<UpdateChannelDescriptionResponse> = await Api.client.put(
      `/channels/${channel_id}/description`,
      { description },
    );

    const updated_channel = res.data.channel;
    dispatch(updateDescriptionIsSucceeded(updated_channel));
    dispatch(closeDescriptionEditor());
  };
};

export const updateChannelAddForm = (name: string, value: string): ChannelActions => ({
  type: types.UPDATE_CHANNEL_ADD_FORM,
  name,
  value,
});

export const channelAddSucceeded = (): ChannelActions => ({
  type: types.CHANNEL_ADD_SUCCEEDED,
});

export const validateChannelAddFailed = (errors: {
  nameValid: boolean;
  nameErrorMessage: string;
}): ChannelActions => ({
  type: types.VALIDATE_CHANNEL_ADD_FAILED,
  ...errors,
});

export const validateChannelAdd = (): ThunkAction<void, RootState, undefined, ChannelActions> => (
  dispatch,
  getState,
) => {
  const { name } = getState().channelAdd;
  if (name === '') {
    dispatch(
      validateChannelAddFailed({
        nameValid: false,
        nameErrorMessage: 'チャンネル名は必須です。',
      }),
    );
  } else if (name.length > 20) {
    dispatch(
      validateChannelAddFailed({
        nameValid: false,
        nameErrorMessage: '20文字以内で入力してください。',
      }),
    );
  } else {
    dispatch(requestChannelAdd());
  }
};

interface ChannelAddResponse {
  _code: number;
  created: ChannelModel;
}
export const requestChannelAdd = (): ThunkAction<
  void,
  RootState,
  undefined,
  ChannelActions
> => async (dispatch, getState) => {
  const { name, description } = getState().channelAdd;
  console.log('@requestChannelAdd', name, description);
  const res: AxiosResponse<ChannelAddResponse> = await Api.client.post('/channels/add', {
    name,
    description,
  });
  console.log(res.data);
  dispatch(channelAddSucceeded());
};
