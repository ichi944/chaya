// @flow
import * as types from './actionTypes';

type VerifyUserState = {
  isRequesting: boolean,
  isVerified: boolean,
}

const initialState = {
  isRequesting: true,
  isVerified: false,
};

export default function verifyUserReducer(state: VerifyUserState = initialState, action: any) {
  switch (action.type) {
    case types.VERIFICATION_SUCCEEDED: {
      console.log('VERIFICATION_SUCCEEDED');
      return {
        ...state,
        isRequesting: false,
        isVerified: true,
      }
    }
    case types.VERIFICATION_FAILED: {
      console.log('VERIFICATION_FAILED');
      return {
        ...state,
        isRequesting: false,
        isVerified: false,
      }
    }
    default: {
      return state;
    }
  }
}
