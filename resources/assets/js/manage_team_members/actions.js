// @Flow
import * as types from './actionTypes';
import Api from '../services/Api';

export function fetchTeamMembersIsSucceeded(data) {
  return {
    type: types.FETCH_TEAM_MEMBERS_IS_SUCCEEDED,
    data,
  };
}

export function fetchTeamMembers() {
  return (dispatch) => {
    Api.client.get('team-members').then((res) => {
      console.log('@get team member', res);
      dispatch(fetchTeamMembersIsSucceeded(res.data));
    });
  };
}
