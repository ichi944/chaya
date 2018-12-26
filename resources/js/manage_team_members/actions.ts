import * as types from './actionTypes';
import Api from '../services/Api';
import { TeamMembersActions, TeamMemberModel } from './interfaces/teamMembers';
import { ThunkAction } from 'redux-thunk';
import { AxiosResponse } from 'axios';
import { RootState } from '../interfaces/rootState';

export const fetchTeamMembersIsSucceeded = (data: TeamMemberModel[]): TeamMembersActions => ({
  type: types.FETCH_TEAM_MEMBERS_IS_SUCCEEDED,
  data,
});

export const fetchTeamMembers = (): ThunkAction<
  void,
  RootState,
  undefined,
  TeamMembersActions
> => async dispatch => {
  const res: AxiosResponse = await Api.client.get('team-members');
  console.log('@get team member', res);
  dispatch(fetchTeamMembersIsSucceeded(res.data));
};

export const verifyByAdminIsSucceeded = (memberId: number): TeamMembersActions => ({
  type: types.VERIFY_BY_ADMIN_IS_SUCCEEDED,
  memberId,
});

export const verifyByAdminIsFailed = (): TeamMembersActions => ({
  type: types.VERIFY_BY_ADMIN_IS_FAILED,
});

export const requestVerifyByAdmin = (
  memberId: number,
): ThunkAction<void, RootState, undefined, TeamMembersActions> => async dispatch => {
  const res: AxiosResponse = await Api.client.put(`team-members/${memberId}/verify`);
  console.log('@update team member', res);
  if (res.data._code !== 0) {
    dispatch(verifyByAdminIsFailed());
  } else {
    dispatch(verifyByAdminIsSucceeded(memberId));
  }
};

export const lockMemberIsFailed = (): TeamMembersActions => ({
  type: types.LOCK_MEMBER_IS_FAILED,
});

export const lockMemberIsSucceeded = (memberId: number): TeamMembersActions => ({
  type: types.LOCK_MEMBER_IS_SUCCEEDED,
  memberId,
});

export const requestLockMember = (
  memberId: number,
): ThunkAction<void, RootState, undefined, TeamMembersActions> => async dispatch => {
  const res: AxiosResponse = await Api.client.put(`team-members/${memberId}/lock`);
  console.log('@lock member');
  if (res.data._code !== 0) {
    dispatch(lockMemberIsFailed());
    return;
  }
  dispatch(lockMemberIsSucceeded(memberId));
};

export const unlockMemberIsFailed = (): TeamMembersActions => ({
  type: types.UNLOCK_MEMBER_IS_FAILED,
});

export const unlockMemberIsSucceeded = (memberId): TeamMembersActions => ({
  type: types.UNLOCK_MEMBER_IS_SUCCEEDED,
  memberId,
});

export const requestUnlockMember = (
  memberId: number,
): ThunkAction<void, RootState, undefined, TeamMembersActions> => async dispatch => {
  const res: AxiosResponse = await Api.client.put(`team-members/${memberId}/unlock`);
  console.log('@unlock member');
  if (res.data._code !== 0) {
    dispatch(unlockMemberIsFailed());
    return;
  }
  dispatch(unlockMemberIsSucceeded(memberId));
};

export const toggleShowMembersWhoIsNotVerifiedWithEmail = (isInputChecked): TeamMembersActions => ({
  type: types.TOGGLE_SHOW_MEMBERS_WHO_IS_NOT_VERIFIED_WITH_EMAIL,
  isInputChecked,
});
