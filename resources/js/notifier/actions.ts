import * as types from './actionTypes';
import { NotifierState, NotifierActions } from './interfaces/notifier';
import { UPDATE_CHANNEL_LIST } from '../channel/actionTypes';

export const closeNotifier = (): NotifierActions => ({
  type: types.CLOSE_NOTIFIER,
});

export const notifyHello = (message): NotifierActions => {
  const { user_id, name, text } = message;
  return {
    type: types.NOTIFY_HELLO,
    user_id,
    name,
    text,
  };
};
export const channelListUpdated = channels => {
  return {
    type: UPDATE_CHANNEL_LIST,
    channels,
  };
};
