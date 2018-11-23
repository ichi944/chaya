import * as types from './actionTypes';

export const updateSwitch = (new_state: boolean) => {
  return {
    type: types.UPDATE_SWITCH,
    new_state,
  };
};

export const requestUpdateSwitch = () => (dispatch: Function, getState: Function) => {
  const { enabled } = getState().notificationSetting;
  const new_state: boolean = !enabled;
  if (new_state) {
    Notification.requestPermission((status) => {
      console.log('Notification permission status:', status);
      return dispatch(updateSwitch(new_state));
    });
  } else {
    return dispatch(updateSwitch(new_state));
  }
};
