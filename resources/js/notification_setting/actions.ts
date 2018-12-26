import { ThunkAction } from 'redux-thunk';
import * as types from './actionTypes';
import { NotificationSettingActions } from './interfaces/notification_settings';
import { RootState } from '../interfaces/rootState';

export const updateSwitch = (new_state: boolean): NotificationSettingActions => ({
  type: types.UPDATE_SWITCH,
  new_state,
});

export const requestUpdateSwitch = (): ThunkAction<
  void,
  RootState,
  undefined,
  NotificationSettingActions
> => (dispatch, getState) => {
  const { enabled } = getState().notificationSetting;
  const new_state: boolean = !enabled;
  if (new_state) {
    Notification.requestPermission(status => {
      console.log('Notification permission status:', status);
      return dispatch(updateSwitch(new_state));
    });
  } else {
    return dispatch(updateSwitch(new_state));
  }
};
