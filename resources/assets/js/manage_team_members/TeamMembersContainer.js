// @flow
import { connect } from 'react-redux';

import { fetchTeamMembers } from './actions';
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembers);
