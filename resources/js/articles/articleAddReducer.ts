import * as types from './actionTypes';

interface ArticleAddState {
  channelId: number | null,
  channelName: string | null,
  heading: string,
  body: string,
  attachments: Array<any>,
  onPreview: boolean,
  mode: string,
  confirmSuccessDialogOpen: boolean,
  cursor_position: number | null,
};

interface ArticleAddAction {
  type: string,
  name: string,
  value: string,
  attachment: Object,
  index: number,
  cursor_position: number,
  img_tag: string,
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
  cursor_position: 0,
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
    case types.UPDATE_CURSOR_POSITION: {
      return {
        ...state,
        cursor_position: action.cursor_position,
      };
    }
    case types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY: {
      const { cursor_position } = action;
      const first_half = state.body.substring(0, cursor_position);
      const second_half = state.body.substring(cursor_position);
      const body = `${first_half}
${action.img_tag}
${second_half}`;
      return {
        ...state,
        body,
      };
    }
    default: {
      return state;
    }
  }
}
