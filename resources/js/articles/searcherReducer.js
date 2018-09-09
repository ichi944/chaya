// @flow
import * as types from './actionTypes';

type SearcherState = {
  +query: string,
};

const initialState = {
  query: '',
};

export default function searcherReducer(state: SearcherState = initialState, action: any) {
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
