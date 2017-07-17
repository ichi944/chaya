// @flow
import * as types from './actionTypes';

type ArticleAddState = {
  +channelId: ?number,
  +channelName: ?string,
  +heading: string,
  +body: string,
  +onPreview: boolean,
  +mode: string,
  +confirmSuccessDialogOpen: boolean,
};

type ArticleAddAction = {
  type: string,
  +name: string,
  +value: string,
};
const initialState = {
  channelId: null,
  channelName: '',
  heading: '',
  body: '',
  onPreview: false,
  mode: 'new',
  confirmSuccessDialogOpen: false,
};

export default function articleAddReducer(
  state: ArticleAddState = initialState,
  action: ArticleAddAction,
) {
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
      return initialState;
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
