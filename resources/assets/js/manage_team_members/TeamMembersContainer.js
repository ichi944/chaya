// @flow
import { connect } from 'react-redux';

import {
  fetchTeamMembers,
  requestVerifyByAdmin,
  requestLockMember,
  requestUnlockMember,
} from './actions';
import TeamMembers from './TeamMembers';

const mapStateToProps = ({ teamMembers, auth }) => {
  return {
    teamMembers,
    auth,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    initialize() {
      dispatch(fetchTeamMembers());
    },
    handleVerifyByAdmin(memberId) {
      dispatch(requestVerifyByAdmin(memberId));
    },
    handleLockMember(memberId) {
      dispatch(requestLockMember(memberId));
    },
    handleUnlockMember(memberId) {
      dispatch(requestUnlockMember(memberId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembers);
