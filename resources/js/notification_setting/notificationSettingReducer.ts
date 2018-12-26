import * as types from './actionTypes';
import {
  NotificationSettingActions,
  NotificationSettingState,
} from './interfaces/notification_settings';

const initialState = {
  enabled: false,
};

export default function notificationSettingReducer(
  state: NotificationSettingState = initialState,
  action: NotificationSettingActions,
): NotificationSettingState {
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
