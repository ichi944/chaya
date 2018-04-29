import { connect } from 'react-redux';

import ArticleChat from './ArticleChat';

import {
  requestLatestMessages,
  updateChatInput,
  requestPostChatMessage,
  addNewArticleChatMessage,
} from './actions';

const mapStateToProps = ({ auth, article, chat }) => {
  return {
    auth,
    article,
    chat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLatestMessages(article_id) {
      dispatch(requestLatestMessages(article_id));
    },
    handleChange(e) {
      dispatch(updateChatInput(e.target.value));
    },
    handlePressEnter(e, chat_message, article_id) {
      if (e.shiftKey && e.key === 'Enter') {
        // add line-break, do nothing. continue
      } else if (e.key === 'Enter') {
        e.preventDefault();
        dispatch(requestPostChatMessage(chat_message, article_id));
      }
    },
    newArticleChatPosted(message) {
      dispatch(addNewArticleChatMessage(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleChat);
