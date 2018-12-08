import { Action } from 'redux';

import * as types from '../actionTypes';

export interface ClearSocketIdAction extends Action {
  type: typeof types.CLEAR_SOCKET_ID;
}

export type SocketActions = ClearSocketIdAction;
