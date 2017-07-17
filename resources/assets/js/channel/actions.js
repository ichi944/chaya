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
      console.log('@fetch channel', res);
      dispatch(fetchChannelIsSucceeded(res.data));
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
