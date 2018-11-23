import * as types from './actionTypes';

interface NotificationSettingState {
  enabled: boolean;
};

interface NotificationSettingAction {
  type: String;
  new_state: boolean;
};

const initialState = {
  enabled: false,
};

export default function notificationSettingReducer(
  state: NotificationSettingState = initialState,
  action: NotificationSettingAction,
) {
  switch (action.type) {
    case types.UPDATE_SWITCH: {
      return {
        ...state,
        enabled: action.new_state,
      };
    }
    default: {
      return state;
    }
  }
}
