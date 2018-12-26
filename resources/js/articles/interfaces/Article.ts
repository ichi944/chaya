import * as types from '../actionTypes';
import { ProfileModel } from '../../application/interfaces/profile';
import CurrentAttachmentProps from './CurrentAttachment';

export interface ArticleModel {
  id: number;
  channel_id: number;
  user_id: number;
  user: ProfileModel;
  heading: string;
  pinned: boolean | null;
  body: string;
  created_at: string;
  updated_at: string;
}

interface StartFetchArticleAction {
  type: typeof types.START_FETCH_ARTICLE;
}
interface EndFetchArticleAction {
  type: typeof types.END_FETCH_ARTICLE;
  data: any;
}
interface ClearArticleAction {
  type: typeof types.CLEAR_ARTICLE;
}
interface UpdateArticleAddFormAction {
  type: typeof types.UPDATE_ARTICLE_ADD_FORM;
  name: string;
  value: any;
}
interface FileAddedArticleAddFormAction {
  type: typeof types.FILE_ADDED_ARTICLE_ADD_FORM;
  attachment: any;
}
interface DeleteAttachementByIndexAction {
  type: typeof types.DELETE_ATTACHMENT_BY_INDEX;
  index: number;
}
interface TogglePreviewModeAction {
  type: typeof types.TOGGLE_PREVIEW_MODE;
}
interface ClearArticleAddAction {
  type: typeof types.CLEAR_ARTICLE_ADD;
}
interface SuccessCreateArticleAction {
  type: typeof types.SUCCESS_CREATE_ARTICLE;
}
interface CloseConfirmSuccessDialogAction {
  type: typeof types.CLOSE_CONFIRM_SUCCESS_DIALOG;
}
interface UpdateArticleEditFormAction {
  type: typeof types.UPDATE_ARTICLE_EDIT_FORM;
  name: string;
  value: string;
}
interface TogglePreviewModeOnEditFormAction {
  type: typeof types.TOGGLE_PREVIEW_MODE_ON_EDIT_FORM;
}
interface ClearArticleEditAction {
  type: typeof types.CLEAR_ARTICLE_EDIT;
}
interface AttachmentAddedArticleEditFormAction {
  type: typeof types.ATTACHMENT_ADDED_ARTICLE_EDIT_FORM;
  attachment: any;
}
interface DeleteAttachementOnArticleEditFormAction {
  type: typeof types.DELETE_ATTACHMENT_ARTICLE_EDIT_FORM;
  index: number;
}
interface ShowDialogDeleteCurrentAttachmentAction {
  type: typeof types.SHOW_DIALOG_DELETE_CURRENT_ATTACHMENT;
  attachment: CurrentAttachmentProps;
}
interface CloseDialogDeleteCurrentAttachmentAction {
  type: typeof types.CLOSE_DIALOG_DELETE_CURRENT_ATTACHMENT;
}
interface DeleteCurrentAttachmentSucceededAction {
  type: typeof types.DELETE_CURRENT_ATTACHMENT_SUCCEEDED;
  current_attachments: CurrentAttachmentProps[];
}
interface SuccessUpdateArticleAction {
  type: typeof types.SUCCESS_UPDATE_ARTICLE;
}
interface CloseConfirmSuccessUpdatingDialogAction {
  type: typeof types.CLOSE_CONFIRM_SUCCESS_UPDATING_DIALOG;
}
interface ShowConfirmDeleteArticleDialogAction {
  type: typeof types.SHOW_CONFIRM_DELETE_ARTICLE_DIALOG;
}
interface CloseConfirmDeleteArticleDialogAction {
  type: typeof types.CLOSE_CONFIRM_DELETE_ARTICLE_DIALOG;
}
interface SuccessDeleteArticleAction {
  type: typeof types.SUCCESS_DELETE_ARTICLE;
}
interface SuccessPinArticleAction {
  type: typeof types.SUCCESS_PIN_ARTICLE;
  article_id: number;
}
interface SuccessUnpinArticleAction {
  type: typeof types.SUCEESS_UNPIN_ARTICLE;
  article_id: number;
}
interface UpdateCursorPositionAction {
  type: typeof types.UPDATE_CURSOR_POSITION;
  cursor_position: number;
}
interface InsertEmbeddedImageUrltoBodyAction {
  type: typeof types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY;
  img_tag: string;
  cursor_position: number;
}
interface UpdateCursorPositionOnEditAction {
  type: typeof types.UPDATE_CURSOR_POSITION_ON_EDIT;
  cursor_position: number;
}
interface InsertEmbeddedImageUrltoBodyOnEditAction {
  type: typeof types.INSERT_EMBEDDED_IMAGE_URL_TO_BODY_ON_EDIT;
  img_tag: string;
  cursor_position: number;
}
export type ArticleActions =
  | StartFetchArticleAction
  | EndFetchArticleAction
  | ClearArticleAction
  | UpdateArticleAddFormAction
  | FileAddedArticleAddFormAction
  | DeleteAttachementByIndexAction
  | TogglePreviewModeAction
  | ClearArticleAddAction
  | SuccessCreateArticleAction
  | CloseConfirmSuccessDialogAction
  | UpdateArticleEditFormAction
  | TogglePreviewModeOnEditFormAction
  | ClearArticleEditAction
  | AttachmentAddedArticleEditFormAction
  | DeleteAttachementOnArticleEditFormAction
  | ShowDialogDeleteCurrentAttachmentAction
  | CloseDialogDeleteCurrentAttachmentAction
  | DeleteCurrentAttachmentSucceededAction
  | SuccessUpdateArticleAction
  | CloseConfirmSuccessUpdatingDialogAction
  | ShowConfirmDeleteArticleDialogAction
  | CloseConfirmDeleteArticleDialogAction
  | SuccessDeleteArticleAction
  | SuccessPinArticleAction
  | SuccessUnpinArticleAction
  | UpdateCursorPositionAction
  | InsertEmbeddedImageUrltoBodyAction
  | UpdateCursorPositionOnEditAction
  | InsertEmbeddedImageUrltoBodyOnEditAction;

export interface ArticleDetailState {
  id: number | null;
  heading: string;
  body: string;
  current_attachments: CurrentAttachmentProps[];
  created_at: string;
  user: ProfileModel;
  pinned: boolean;
  confirmDeleteDialogOpen: boolean;
}

export interface ArticleEditState {
  heading: string;
  body: string;
  current_attachments: object[];
  attachments: object[];
  onPreview: boolean;
  confirmSuccessDialogOpen: boolean;
  confirmDeleteCurrentAttachmentDialogOpen: boolean;
  deletingAttachmentId: number | null;
  deletingAttachmentName: string | null;
  cursor_position: number;
}

export interface ArticleAddState {
  channelId: number | null;
  channelName: string | null;
  heading: string;
  body: string;
  attachments: any[];
  onPreview: boolean;
  mode: string;
  confirmSuccessDialogOpen: boolean;
  cursor_position: number;
}
