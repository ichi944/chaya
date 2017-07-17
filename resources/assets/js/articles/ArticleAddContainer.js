import { connect } from 'react-redux';

import ArticleAdd from './ArticleAdd';

import {
  updateArticleAddForm,
  togglePreviewMode,
  clearArticleAdd,
  createNewArticle,
  confirmedSuccessCreating,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAdd);
