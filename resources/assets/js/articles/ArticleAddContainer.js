import { connect } from 'react-redux';

import ArticleAdd from './ArticleAdd';

import { updateArticleAddForm } from './actions';

const mapStateToProps = ({ articleAdd }) => {
  return {
    ...articleAdd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      dispatch(updateArticleAddForm(e.target.name, e.target.value));
    },
    handleCancel() {},
    handleTogglePreview() {},
    handleSubmit() {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAdd);