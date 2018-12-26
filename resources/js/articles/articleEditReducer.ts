import * as types from './actionTypes';
import { ArticleActions, ArticleEditState } from './interfaces/Article';

const initialState = {
  heading: '',
  body: '',
  current_attachments: [],
  attachments: [],
  onPreview: false,
  confirmSuccessDialogOpen: false,
  confirmDeleteCurrentAttachmentDialogOpen: false,
  deletingAttachmentId: null,
  deletingAttachmentName: null,
  cursor_position: 0,
};

export default function articleEditReducer(
  state: ArticleEditState = initialState,
  action: ArticleActions,
) {
  switch (action.type) {
    case types.END_FETCH_ARTICLE: {
      const { data } = action;
      return {
        ...state,
        ...data,
      };
    }
    case types.UPDATE_ARTICLE_EDIT_FORM: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case types.TOGGLE_PREVIEW_MODE_ON_EDIT_FORM: {
      return {
        ...state,
        onPreview: !state.onPreview,
      };
    }
    case types.ATTACHMENT_ADDED_ARTICLE_EDIT_FORM: {
      return {
        ...state,
        attachments: [...state.attachments, action.attachment],
      };
    }
    case types.DELETE_ATTACHMENT_ARTICLE_EDIT_FORM: {
      // 'splice' doesn't return updated array.
      // we need to copy an array first and run splice.
      const work = [...state.attachments];
      work.splice(action.index, 1);
      return {
        ...state,
        attachments: work,
      };
    }
    case types.SHOW_DIALOG_DELETE_CURRENT_ATTACHMENT: {
      return {
        ...state,
        confirmDeleteCurrentAttachmentDialogOpen: true,
        deletingAttachmentId: action.attachment.id,
        deletingAttachmentName: action.attachment.name,
      };
    }
    case types.CLOSE_DIALOG_DELETE_CURRENT_ATTACHMENT: {
      return {
        ...state,
        confirmDeleteCurrentAttachmentDialogOpen: false,
        deletingAttachmentId: null,
        deletingAttachmentName: null,
      };
    }
    // For deleting current attachments from a server.
    case types.DELETE_CURRENT_ATTACHMENT_SUCCEEDED: {
      return {
        ...state,
        current_attachments: action.current_attachments,
      };
    }
    case types.CLEAR_ARTICLE_EDIT: {
      return {
        ...state,
        heading: '',
        body: '',
        onPreview: false,
      };
    }
    case types.SUCCESS_UPDATE_ARTICLE: {
      return {
        ...state,
        confirmSuccessDialogOpen: true,
      };
    }
    case types.CLOSE_CONFIRM_SUCCESS_UPDATING_DIALOG: {
      return {
        ...state,
        confirmSuccessDialogOpen: false,
      };
    }
    case types.UPDATE_CURSOR_POSITION_ON_EDIT: {
      return {
        ...state,
        cursor_position: action.cursor_position,
      };
    }
    case types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY_ON_EDIT: {
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
