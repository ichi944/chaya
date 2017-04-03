import * as types from './actionTypes';

const initialState = {
  query: '',
};

export default function searcherReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_SEARCH_QUERY: {
      return {
        ...state,
        query: action.query,
      };
    }
    default: {
      return state;
    }
  }
}
