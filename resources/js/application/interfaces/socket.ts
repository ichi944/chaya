import { Action } from 'redux';

import * as types from '../actionTypes';

export interface ClearSocketIdAction extends Action {
  type: typeof types.CLEAR_SOCKET_ID;
}

export interface DoneSetSocketIDAction extends Action {
  type: typeof types.DONE_SET_SOCKET_ID;
}

export type SocketActions = ClearSocketIdAction | DoneSetSocketIDAction;

export interface SocketState {
  hasSocketId: boolean;
}
