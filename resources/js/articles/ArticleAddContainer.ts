import { connect } from 'react-redux';

import ArticleAdd from './ArticleAdd';

import {
  updateArticleAddForm,
  fileAddedArticleAddForm,
  deleteAttachementByIndex,
  togglePreviewMode,
  clearArticleAdd,
  createNewArticle,
  confirmedSuccessCreating,
  requestStoreEmbeddedImage,
  updateCursorPosition,
} from './actions';

const mapStateToProps = ({ articleAdd, articleLists }) => {
  return {
    ...articleAdd,
    currentChannelId: articleLists.channel.id,
    currentChannelName: articleLists.channel.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateCursorPosition(e) {
      const cursor_position = e.target.selectionEnd;
      dispatch(updateCursorPosition(cursor_position));
    },
    handleChange(e) {
      dispatch(updateArticleAddForm(e.target.name, e.target.value));
    },
    handleDrop(attachment) {
      dispatch(fileAddedArticleAddForm(attachment));
    },
    handleDeleteAttachment(index) {
      dispatch(deleteAttachementByIndex(index));
    },
    clearEditorContent() {
      dispatch(clearArticleAdd());
    },
    handleTogglePreview() {
      dispatch(togglePreviewMode());
    },
    handleSubmit(data) {
      dispatch(createNewArticle(data));
    },
    handleClose() {
      dispatch(confirmedSuccessCreating());
    },
    handleDropEmbeddedImage(image) {
      dispatch(requestStoreEmbeddedImage(image));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleAdd);
