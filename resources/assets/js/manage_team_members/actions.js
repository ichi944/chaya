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

export function verifyByAdminIsFailed() {
  return {
    type: types.VERIFY_BY_ADMIN_IS_FAILED,
  };
}
export function requestVerifyByAdmin(memberId) {
  return (dispatch) => {
    Api.client.put(`team-members/${memberId}/verify`).then((res) => {
      console.log('@update team member', res);
      if (res.data._code !== 0) {
        dispatch(verifyByAdminIsFailed());
      } else {
        dispatch(verifyByAdminIsSucceeded(memberId));
      }
    });
  };
}

export function lockMemberIsFailed() {
  return {
    type: types.LOCK_MEMBER_IS_FAILED,
  };
}

export function lockMemberIsSucceeded(memberId) {
  return {
    type: types.LOCK_MEMBER_IS_SUCCEEDED,
    memberId,
  };
}

export function requestLockMember(memberId) {
  return (dispatch) => {
    Api.client.put(`team-members/${memberId}/lock`).then((res) => {
      console.log('@lock member');
      if (res.data._code !== 0) {
        dispatch(lockMemberIsFailed());
        return;
      }
      dispatch(lockMemberIsSucceeded(memberId));
    });
  };
}

export function unlockMemberIsFailed() {
  return {
    type: types.UNLOCK_MEMBER_IS_FAILED,
  };
}

export function unlockMemberIsSucceeded(memberId) {
  return {
    type: types.UNLOCK_MEMBER_IS_SUCCEEDED,
    memberId,
  };
}

export function requestUnlockMember(memberId) {
  return (dispatch) => {
    Api.client.put(`team-members/${memberId}/unlock`).then((res) => {
      console.log('@unlock member');
      if (res.data._code !== 0) {
        dispatch(unlockMemberIsFailed());
        return;
      }
      dispatch(unlockMemberIsSucceeded(memberId));
    });
  };
}
