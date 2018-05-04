import Api from '../services/Api';
import * as types from './actionTypes';
import { closeDescriptionEditor } from '../articles/actions';

export function fetchChannelIsSucceeded(channels) {
  return {
    type: types.FETCH_CHANNEL_IS_SUCCEEDED,
    channels,
  };
}

export function fetchChannel() {
  return (dispatch) => {
    Api.client.get('/channels').then((res) => {
      if (res.data._code !== 0) {
        console.log('failed to load channel');
        return;
      }
      dispatch(fetchChannelIsSucceeded(res.data.channels));
    });
  };
}

export function updateDescriptionIsSucceeded(updated_channel) {
  return {
    type: types.UPDATE_DESCRIPTION_IS_SUCCEEDED,
    updated_channel,
  };
}

export function requestUpdateChannelDescription() {
  return (dispatch, getState) => {
    const channel_id = getState().articleChannel.channel.id;
    const description = getState().articleChannel.descriptionEditorContent;
    Api.client.put(`/channels/${channel_id}/description`, { description }).then((res) => {
      const updated_channel = res.data.channel;
      dispatch(updateDescriptionIsSucceeded(updated_channel));
      dispatch(closeDescriptionEditor());
    });
  };
}

export function updateChannelAddForm(name, value) {
  return {
    type: types.UPDATE_CHANNEL_ADD_FORM,
    name,
    value,
  };
}

export function channelAddSucceeded() {
  return {
    type: types.CHANNEL_ADD_SUCCEEDED,
  };
}

export function validateChannelAddFailed(errors) {
  return {
    type: types.VALIDATE_CHANNEL_ADD_FAILED,
    ...errors,
  };
}
export function validateChannelAdd() {
  return (dispatch, getState) => {
    const { name, description } = getState().channelAdd;
    if (name === '') {
      dispatch(validateChannelAddFailed({
        nameValid: false,
        nameErrorMessage: 'チャンネル名は必須です。',
      }));
    } else if (name.length > 20) {
      dispatch(validateChannelAddFailed({
        nameValid: false,
        nameErrorMessage: '20文字以内で入力してください。',
      }));
    } else {
      dispatch(requestChannelAdd());
    }
  };
}

export function requestChannelAdd() {
  return (dispatch, getState) => {
    const { name, description } = getState().channelAdd;
    console.log('@requestChannelAdd', name, description);
    Api.client
      .post('/channels/add', {
        name,
        description,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(channelAddSucceeded());
      });
  };
}
