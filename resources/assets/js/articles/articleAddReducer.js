// @flow
import * as types from './actionTypes';

type ArticleAddState = {
  +heading: string,
  +body: string,
  +onPreview: boolean,
  +mode: string,
  +confirmSuccessDialogOpen: boolean,
}

const initialState = {
  heading: '',
  body: '',
  onPreview: false,
  mode: 'new',
  confirmSuccessDialogOpen: false,
};

export default function articleAddReducer(state: ArticleAddState = initialState, action: any) {
  switch (action.type) {
    case types.UPDATE_ARTICLE_ADD_FORM: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case types.TOGGLE_PREVIEW_MODE: {
      return {
        ...state,
        onPreview: !state.onPreview,
      };
    }
    case types.CLEAR_ARTICLE_ADD: {
      return {
        ...state,
        heading: '',
        body: '',
        onPreview: false,
      };
    }
    case types.SUCCESS_CREATE_ARTICLE: {
      return {
        ...state,
        confirmSuccessDialogOpen: true,
      };
    }
    case types.CLOSE_CONFIRM_SUCCESS_DIALOG: {
      return {
        ...state,
        confirmSuccessDialogOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}
