import { connect } from 'react-redux';
import url from 'url';

import ArticleLists from './ArticleLists';
import {
  fetchArticlesByChannel,
  openDescriptionEditor,
  closeDescriptionEditor,
  changeDescriptionEditorContent,
} from './actions';
import { updateDescription, requestUpdateChannelDescription } from '../channel/actions';

const mapStateToProps = ({ articleLists, searcher, auth }) => {
  return {
    articleLists,
    searcher,
    auth,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialize(channel_id = null, current_page = null) {
      if (!channel_id) {
        console.log('@ArticleListsContainer channel_id is not provided');
        return;
      }
      let options = {};
      options = current_page ? { ...options, page: current_page } : options;
      dispatch(fetchArticlesByChannel(channel_id, options));
    },
    handleNavigatePage(nextUrl, query) {
      const { channel_id } = ownProps.match.params;
      const { page } = url.parse(nextUrl, true).query;
      const options = {
        page,
      };
      // TODO: consider about search query on channel.
      // options = query ? { ...options, query } : options;
      dispatch(fetchArticlesByChannel(channel_id, options));
    },
    handleUpdateChannelDescription(channel_id, description) {
      dispatch(updateDescription(channel_id, description));
    },
    handleOpenDescriptionEditor() {
      dispatch(openDescriptionEditor());
    },
    handleCloseDescriptionEditor() {
      dispatch(closeDescriptionEditor());
    },
    handleChangeEditDescriptionContent(value) {
      dispatch(changeDescriptionEditorContent(value));
    },
    handleSubmitEditDescription() {
      dispatch(requestUpdateChannelDescription());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleLists);
