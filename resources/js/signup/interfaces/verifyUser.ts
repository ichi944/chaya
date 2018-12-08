import { Action } from 'redux';

import * as types from '../actionTypes';

interface VerificationSucceeded extends Action {
  type: typeof types.VERIFICATION_SUCCEEDED;
}
interface VerificationFailed extends Action {
  type: typeof types.VERIFICATION_FAILED;
}

export type VerifyUserActions = VerificationSucceeded | VerificationFailed;

export interface VerifyUserState {
  isRequesting: boolean;
  isVerified: boolean;
}
