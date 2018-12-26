import * as types from '../actionTypes';
import { ProfileModel } from '../../application/interfaces/profile';

export interface TeamMemberModel extends ProfileModel {
  is_verified_with_email: boolean;
  is_verified_by_admin: boolean;
  is_locked: boolean;
}
export interface TeamMembersState {
  members: TeamMemberModel[];
  show_members_who_is_not_verified_with_email: boolean;
}

export interface FetchTeamMembersIsSucceededAction {
  type: typeof types.FETCH_TEAM_MEMBERS_IS_SUCCEEDED;
  data: TeamMemberModel[];
}
export interface VerifyByAdminIsSucceededAction {
  type: typeof types.VERIFY_BY_ADMIN_IS_SUCCEEDED;
  memberId: number;
}
export interface VerifyByAdminIsFailedAction {
  type: typeof types.VERIFY_BY_ADMIN_IS_FAILED;
}
export interface LockMemberIsFailedAction {
  type: typeof types.LOCK_MEMBER_IS_FAILED;
}
export interface LockMemberIsSucceededAction {
  type: typeof types.LOCK_MEMBER_IS_SUCCEEDED;
  memberId: number;
}
export interface UnlockMemberIsFailedAction {
  type: typeof types.UNLOCK_MEMBER_IS_FAILED;
}
export interface UnlockMemberIsSucceededAction {
  type: typeof types.UNLOCK_MEMBER_IS_SUCCEEDED;
  memberId: number;
}
export interface ToggleShowMembersWhoIsNotVerifiedWithEmail {
  type: typeof types.TOGGLE_SHOW_MEMBERS_WHO_IS_NOT_VERIFIED_WITH_EMAIL;
  isInputChecked: boolean;
}

export type TeamMembersActions =
  | FetchTeamMembersIsSucceededAction
  | VerifyByAdminIsSucceededAction
  | VerifyByAdminIsFailedAction
  | LockMemberIsFailedAction
  | LockMemberIsSucceededAction
  | UnlockMemberIsFailedAction
  | UnlockMemberIsSucceededAction
  | ToggleShowMembersWhoIsNotVerifiedWithEmail;
