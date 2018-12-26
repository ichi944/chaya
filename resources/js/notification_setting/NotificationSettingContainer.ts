import { connect } from 'react-redux';

import NotificationSetting from './NotificationSetting';

import { requestUpdateSwitch } from './actions';
import { RootState } from '../interfaces/rootState';

const mapStateToProps = ({ notificationSetting }: RootState) => {
  return {
    notificationSetting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleToggleSwitch() {
      dispatch(requestUpdateSwitch());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationSetting);
