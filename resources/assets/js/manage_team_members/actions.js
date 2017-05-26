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

export function verifyByAdminIsSucceeded(memberId) {
  return {
    type: types.VERIFY_BY_ADMIN_IS_SUCCEEDED,
    memberId,
  };
}

export function requestVerifyByAdmin(memberId) {
  return (dispatch) => {
    Api.client.put(`team-members/verify/${memberId}`).then((res) => {
      console.log('@update team member', res);
      dispatch(verifyByAdminIsSucceeded(memberId));
    });
  };
}
