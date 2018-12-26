import * as types from './actionTypes';
import { ArticleDetailState } from './interfaces/Article';

const initialState = {
  id: null,
  heading: '',
  body: '',
  current_attachments: [],
  created_at: '',
  user: {
    id: null,
    name: '',
    email: '',
    avatar_img_url: null,
    is_admin: 0,
    created_at: '',
  },
  pinned: false,
  confirmDeleteDialogOpen: false,
};

export default function articleDetailReducer(
  state: ArticleDetailState = initialState,
  action: any,
) {
  switch (action.type) {
    case types.END_FETCH_ARTICLE: {
      const { data } = action;
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
