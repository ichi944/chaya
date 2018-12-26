import { connect } from 'react-redux';
import { TeamMembersState } from './interfaces/teamMembers';
import {
  fetchTeamMembers,
  requestVerifyByAdmin,
  requestLockMember,
  requestUnlockMember,
  toggleShowMembersWhoIsNotVerifiedWithEmail,
} from './actions';
import TeamMembers from './TeamMembers';
import { RootState } from '../interfaces/rootState';

const mapStateToProps = ({ teamMembers, auth }: RootState) => {
  return {
    teamMembers,
    auth,
  };
};

const mapDispatchToProps = dispatch => {
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
    handleToggleShowMembersWhoIsNotVerifiedWithEmail(isInputChecked) {
      dispatch(toggleShowMembersWhoIsNotVerifiedWithEmail(isInputChecked));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamMembers);
