import { connect } from 'react-redux';

import ArticleChat from './ArticleChat';

import {
  requestMessages,
  requestLatestMessages,
  updateChatInput,
  requestPostChatMessage,
  addNewArticleChatMessage,
} from './actions';
import { RootState } from '../interfaces/rootState';
import { MessageModel, ChatActions } from './interfaces/chat';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = ({ auth, article, chat }: RootState) => {
  return {
    auth,
    article,
    chat,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, ChatActions>) => {
  return {
    fetchLatestMessages(article_id: number) {
      dispatch(requestLatestMessages(article_id));
    },
    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      dispatch(updateChatInput(e.currentTarget.value));
    },
    handlePressEnter(e, chat_message: string, article_id: number) {
      if (e.shiftKey && e.key === 'Enter') {
        // add line-break, do nothing. continue
      } else if (e.key === 'Enter') {
        e.preventDefault();
        dispatch(requestPostChatMessage(chat_message, article_id));
      }
    },
    newArticleChatPosted(message: MessageModel) {
      dispatch(addNewArticleChatMessage(message));
    },
    handleLoadOldMessage(article_id: number, max_id: number | null = null) {
      if (max_id === null) {
        alert("max id doesn't exist");
        return;
      }
      dispatch(requestMessages(article_id, max_id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleChat);
