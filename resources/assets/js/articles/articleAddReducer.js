// @flow
import * as types from './actionTypes';

type ArticleAddState = {
  +channelId: ?number,
  +channelName: ?string,
  +heading: string,
  +body: string,
  +attachments: Array<any>,
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
  attachments: [],
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
    case types.FILE_ADDED_ARTICLE_ADD_FORM: {
      return {
        ...state,
        attachments: [...state.attachments, action.attachment],
      };
    }
    case types.DELETE_ATTACHMENT_BY_INDEX: {
      // 'splice' doesn't return updated array.
      // we need to copy an array first and run splice.
      const work = [...state.attachments];
      work.splice(action.index, 1);
      return {
        ...state,
        attachments: work,
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
