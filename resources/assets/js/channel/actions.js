import Api from '../services/Api';
import * as types from './actionTypes';

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
