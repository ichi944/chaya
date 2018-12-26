import * as types from './actionTypes';

import { VerifyUserState, VerifyUserActions } from './interfaces/verifyUser';

const initialState = {
  isRequesting: true,
  isVerified: false,
};

export default (state: VerifyUserState = initialState, action: VerifyUserActions) => {
  switch (action.type) {
    case types.VERIFICATION_SUCCEEDED: {
      return {
        ...state,
        isRequesting: false,
        isVerified: true,
      };
    }
    case types.VERIFICATION_FAILED: {
      return {
        ...state,
        isRequesting: false,
        isVerified: false,
      };
    }
    default: {
      return state;
    }
  }
};
