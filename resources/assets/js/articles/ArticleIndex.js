import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Paper,
  Divider,
  Subheader,
  FloatingActionButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SearcherContainer from './SearcherContainer';
import { PageNavigation } from './organisms/PageNavigation';

class ArticleIndex extends Component {
  componentDidMount() {
    const { initialize } = this.props;
    const { current_page = null } = this.props.articles;
    const { query = null } = this.props.searcher;

    initialize(current_page, query);

    this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this);
  }
  handleCreateNewArticle() {
    const { push } = this.props.history;
    push('articles/add');
  }
  render() {
    const {
      data,
      total,
      from,
      to,
      prev_page_url,
      next_page_url,
    } = this.props.articles;
    const {
      query,
    } = this.props.searcher;
    const {
      handleNavigatePage,
    } = this.props;
    const {
      authorizationToken,
    } = this.props.auth;

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
    let articlesEl;
    if (data.length === 0) {
      articlesEl = (
        <Paper>
          <div className="article_index-wrapper">
            記事がありませんでした。
          </div>
        </Paper>
      );
    } else {
      articlesEl = data.map((article) => {
        return (
          <Paper key={article.id}>
            <div className="article_index-wrapper">
              <div className="article_index-avatar">
                <Avatar
                  src={`/private-img/${article.user.avator_img_url}?token=${authorizationToken}`}
                />
              </div>
              <div className="article_index-header">
                <p className="article_index-name">{article.user.name}</p>
                <p className="article_index-date">{article.created_at}</p>
              </div>
              <div className="article_index-body">
                <Link to={`/app/articles/${article.id}`}>
                  <h3 className="article_index-article_title">{article.heading}</h3>
                  <p className="article_index-description">{article.body.substring(0, 60)}...</p>
                </Link>
              </div>
            </div>
          </Paper>
        );
      });
    }

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
          { articlesEl }
        </Paper>
        <PageNavigation
          {...pageNavigationProps}
        />
      </div>
    );
  }
}

export default ArticleIndex;
