import { connect } from 'react-redux';

import ArticleChat from './ArticleChat';

import { updateChatInput } from './actions';

const mapStateToProps = ({ article, chat }) => {
  return {
    article,
    chat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(value) {
      dispatch(updateChatInput(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleChat);
