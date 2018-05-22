// @flow
import * as types from './actionTypes';

type ArticleState = {
  +id: ?number,
  +heading: string,
  +body: string,
  +current_attachments: Array,
  +created_at: string,
  +user: {
    +name: string,
  },
  +pinned: boolean,
  confirmDeleteDialogOpen: boolean,
};

const initialState = {
  id: null,
  heading: '',
  body: '',
  current_attachments: [],
  created_at: '',
  user: {
    name: '',
  },
  pinned: false,
  confirmDeleteDialogOpen: false,
};

export default function articleReducer(state: ArticleState = initialState, action: any) {
  switch (action.type) {
    case types.END_FETCH_ARTICLE: {
      const data = action.data;
      const pinned = data.pinned !== null;
      return {
        ...state,
        ...data,
        pinned,
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
    case types.SUCCESS_PIN_ARTICLE: {
      return {
        ...state,
        pinned: true,
      };
    }
    case types.SUCEESS_UNPIN_ARTICLE: {
      return {
        ...state,
        pinned: false,
      };
    }
    default: {
      return state;
    }
  }
}
