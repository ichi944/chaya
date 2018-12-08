import { Action } from 'redux';

import * as types from '../actionTypes';

export interface SayHelloSucceededAction extends Action {
  type: typeof types.SAY_HELLO_SUCCEEDED;
}

export type HomeActions = SayHelloSucceededAction;
