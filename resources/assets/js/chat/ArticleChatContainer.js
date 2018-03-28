import { connect } from 'react-redux';

import ArticleChat from './ArticleChat';

import { updateChatInput, requestPostChatMessage } from './actions';

const mapStateToProps = ({ article, chat }) => {
  return {
    article,
    chat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      dispatch(updateChatInput(e.target.value));
    },
    handlePressEnter(e, chat_message, article_id) {
      if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        dispatch(requestPostChatMessage(chat_message, article_id));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleChat);
