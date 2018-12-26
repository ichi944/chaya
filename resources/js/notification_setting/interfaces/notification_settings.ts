import * as types from '../actionTypes';

export interface NotificationSettingState {
  enabled: boolean;
}

export interface UpdateSwitch {
  type: typeof types.UPDATE_SWITCH;
  new_state: boolean;
}
export type NotificationSettingActions = UpdateSwitch;
