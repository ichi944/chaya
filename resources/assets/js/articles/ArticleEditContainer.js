import { connect } from 'react-redux';

import ArticleEdit from './ArticleEdit';

import {
  fetchArticleById,
  updateArticleEditForm,
  togglePreviewModeOnEditForm,
  clearArticleEdit,
  requestUpdateArticle,
  confirmedSuccessUpdating,
  attachmentAddedArticleEditForm,
  deleteAttachementOnArticleEditForm,
  showDialogDeleteCurrentAtttachment,
  closeDialogDeleteCurrentAttachment,
  requestDeleteCurrentAttachment,
} from './actions';

const mapStateToProps = ({ articleEdit }) => {
  return {
    ...articleEdit,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialize(articleId) {
      dispatch(fetchArticleById(articleId));
    },
    handleChange(e) {
      dispatch(updateArticleEditForm(e.target.name, e.target.value));
    },
    handleDrop(attachment) {
      dispatch(attachmentAddedArticleEditForm(attachment));
    },
    handleDeleteAttachment(index) {
      dispatch(deleteAttachementOnArticleEditForm(index));
    },
    handleShowDialogDeleteCurrentAttachment(attachment) {
      dispatch(showDialogDeleteCurrentAtttachment(attachment));
    },
    handleCloseDialogDeleteCurrentAttachment() {
      dispatch(closeDialogDeleteCurrentAttachment());
    },
    handleDeleteCurrentAttachment() {
      dispatch(requestDeleteCurrentAttachment());
    },
    handleTogglePreview() {
      dispatch(togglePreviewModeOnEditForm());
    },
    clearEditorContent() {
      dispatch(clearArticleEdit());
    },
    handleSubmit(data) {
      dispatch(requestUpdateArticle(data));
    },
    handleClose() {
      const { id } = ownProps.match.params;
      dispatch(confirmedSuccessUpdating(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
