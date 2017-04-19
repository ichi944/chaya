// @flow
import * as types from './actionTypes';

type ArticleState = {
  +id: ?number,
  +heading: string,
  +body: string,
  +created_at: string,
  +user: {
    +name: string,
  },
  confirmDeleteDialogOpen: boolean,
}

const initialState = {
  id: null,
  heading: '',
  body: '',
  created_at: '',
  user: {
    name: '',
  },
  confirmDeleteDialogOpen: false,
};

export default function articleReducer(state: ArticleState = initialState, action: any) {
  switch (action.type) {
    case types.END_FETCH_ARTICLE: {
      const data = action.data;
      return {
        ...state,
        ...data,
      };
    }
    case types.CLEAR_ARTICLE: {
      return initialState;
    }
    case types.SHOW_CONFIRM_DELETE_ARTICLE_DIALOG: {
      return {
        ...state,
        confirmDeleteDialogOpen: true,
      };
    }
    case types.CLOSE_CONFIRM_DELETE_ARTICLE_DIALOG: {
      return {
        ...state,
        confirmDeleteDialogOpen: false,
      };
    }
    case types.SUCCESS_DELETE_ARTICLE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
