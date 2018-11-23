import _ from 'lodash';
import * as types from './actionTypes';

// type TeamMember = {
//   id: number,
//   namae: string,
//   email: string,
// };
// type TeamMembersState = {
//   members: Array<TeamMember>,
//   showMembersWhoIsNotVerifiedWithEmail: boolean,
// };

const initialState = {
  members: [],
  show_members_who_is_not_verified_with_email: false,
};

export default function teamMembersReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TEAM_MEMBERS_IS_SUCCEEDED: {
      const { data } = action;
      return {
        ...state,
        members: data,
      };
    }
    case types.VERIFY_BY_ADMIN_IS_SUCCEEDED: {
      const { memberId } = action;
      const updated = _.map(state.members, (member) => {
        if (member.id === memberId) {
          return {
            ...member,
            is_verified_by_admin: true,
          };
        }
        return member;
      });
      return {
        state,
        members: updated,
      };
    }
    case types.VERIFY_BY_ADMIN_IS_FAILED: {
      console.log('failed to verivy by admin');
      return state;
    }
    case types.LOCK_MEMBER_IS_SUCCEEDED: {
      const { memberId } = action;
      const updated = _.map(state.members, (member) => {
        if (member.id === memberId) {
          return {
            ...member,
            is_locked: true,
          };
        }
        return member;
      });
      return {
        state,
        members: updated,
      };
    }
    case types.LOCK_MEMBER_IS_FAILED: {
      return state;
    }
    case types.UNLOCK_MEMBER_IS_SUCCEEDED: {
      const { memberId } = action;
      const updated = _.map(state.members, (member) => {
        if (member.id === memberId) {
          return {
            ...member,
            is_locked: false,
          };
        }
        return member;
      });
      return {
        state,
        members: updated,
      };
    }
    case types.UNLOCK_MEMBER_IS_FAILED: {
      return state;
    }
    case types.TOGGLE_SHOW_MEMBERS_WHO_IS_NOT_VERIFIED_WITH_EMAIL: {
      const { isInputChecked } = action;
      return {
        ...state,
        showMembersWhoIsNotVerifiedWithEmail: isInputChecked,
      };
    }
    default: {
      return state;
    }
  }
}
