import { connect } from 'react-redux';

import ArticleEdit from './ArticleEdit';

import {
  // updateArticleAddForm,
  // togglePreviewMode,
  // clearArticleAdd,
  // createNewArticle,
  // confirmedSuccessCreating,
} from './actions';

const mapStateToProps = ({ articleEdit }) => {
  return {
    ...articleEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
