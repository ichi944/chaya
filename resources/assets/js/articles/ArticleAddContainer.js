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
} from './actions';

const mapStateToProps = ({ articleAdd, articleChannel }) => {
  return {
    ...articleAdd,
    currentChannelId: articleChannel.channel.id,
    currentChannelName: articleChannel.channel.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAdd);
