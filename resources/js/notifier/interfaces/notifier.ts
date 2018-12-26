import * as types from '../actionTypes';

export interface NotifierState {
  open: boolean;
  message: string;
}

export interface CloseNotifier {
  type: typeof types.CLOSE_NOTIFIER;
}
export interface NotifyHello {
  type: typeof types.NOTIFY_HELLO;
  user_id: number;
  name: string;
  text: string;
}

export type NotifierActions = CloseNotifier | NotifyHello;
