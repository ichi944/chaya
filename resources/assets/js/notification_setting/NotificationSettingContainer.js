import { connect } from 'react-redux';

import NotificationSetting from './NotificationSetting';

import { requestUpdateSwitch } from './actions';

const mapStateToProps = ({ notificationSetting }) => {
  return {
    notificationSetting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleSwitch() {
      dispatch(requestUpdateSwitch());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSetting);
