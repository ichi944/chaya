import React, { Component } from 'react';
import { Paper, Divider, Subheader, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SearcherContainer from './SearcherContainer';
import { ArticleListItem } from './organisms/ArticleListItem';
import { PageNavigation } from './organisms/PageNavigation';

class ArticleIndex extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this);
  }
  componentDidMount() {
    const { initialize } = this.props;
    const { current_page = null } = this.props.articles;
    const { query = null } = this.props.searcher;

    initialize(current_page, query);
  }
  handleCreateNewArticle() {
    const { push } = this.props.history;
    push('articles/add');
  }
  render() {
    const { data, total, from, to, prev_page_url, next_page_url } = this.props.articles;
    const { query } = this.props.searcher;
    const { handleNavigatePage } = this.props;
    const { authorizationToken } = this.props.auth;

    const pageNavigationProps = {
      prev_page_url,
      next_page_url,
      handleNavigatePage,
      query,
    };

    const styles = {
      button: {
        position: 'absolute',
        right: '2rem',
        top: '1.2rem',
      },
    };

    return (
      <div>
        <SearcherContainer />
        <Paper className="article_index-container">
          <Subheader>Feed {from}件目〜{to}件目 (全{total}件)</Subheader>
          <FloatingActionButton
            style={styles.button}
            zDepth={2}
            onTouchTap={this.handleCreateNewArticle}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Divider />
          {data.length === 0
            ? <Paper>
              <div className="article_index-wrapper">
                  記事がありませんでした。
                </div>
            </Paper>
            : data.map((article) => {
              return (
                <ArticleListItem
                  article={article}
                  authorizationToken={authorizationToken}
                  key={article.id}
                />
              );
            })}
        </Paper>
        <PageNavigation {...pageNavigationProps} />
      </div>
    );
  }
}

export default ArticleIndex;
