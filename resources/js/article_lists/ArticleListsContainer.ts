import { connect } from 'react-redux';
import url from 'url';

import ArticleLists from './ArticleLists';
import {
  fetchArticlesByChannel,
  openDescriptionEditor,
  closeDescriptionEditor,
  changeDescriptionEditorContent,
} from './actions';
import { requestUpdateChannelDescription } from '../channel/actions';
import { RootState } from '../interfaces/rootState';

const mapStateToProps = ({ articleLists, auth }: RootState) => {
  return {
    articleLists,
    auth,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialize(channel_id: number | null = null, current_page = null) {
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
      if (page instanceof Array) {
        return;
      }
      const options = {
        page,
      };
      // TODO: consider about search query on channel.
      // options = query ? { ...options, query } : options;
      dispatch(fetchArticlesByChannel(channel_id, options));
    },
    handleOpenDescriptionEditor() {
      dispatch(openDescriptionEditor());
    },
    handleCloseDescriptionEditor() {
      dispatch(closeDescriptionEditor());
    },
    handleChangeEditDescriptionContent(value: string) {
      dispatch(changeDescriptionEditorContent(value));
    },
    handleSubmitEditDescription() {
      dispatch(requestUpdateChannelDescription());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleLists);
