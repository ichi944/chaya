// @flow
import * as types from './actionTypes';

type TeamMember = {
  id: number,
  namae: string,
  email: string,
};
type TeamMembersState = {
  members: Array<TeamMember>,
};

const initialState = {
  members: [],
};

export default function teamMembersReducer(state: TeamMembersState = initialState, action: any) {
  switch (action.type) {
    case types.FETCH_TEAM_MEMBERS_IS_SUCCEEDED: {
      const { data } = action;
      return {
        ...state,
        members: data,
      };
    }
    default: {
      return state;
    }
  }
}
