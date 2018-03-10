import * as types from './actionTypes';

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
