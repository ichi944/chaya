import * as types from './actionTypes';
import { UPDATE_CHANNEL_LIST } from '../channel/actionTypes';

export function closeNotifier() {
  return {
    type: types.CLOSE_NOTIFIER,
  };
}
export function notifyHello(message) {
  const { user_id, name, text } = message;
  return {
    type: types.NOTIFY_HELLO,
    user_id,
    name,
    text,
  };
}
export function channelListUpdated(channels) {
  return {
    type: UPDATE_CHANNEL_LIST,
    channels,
  };
}
