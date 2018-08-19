// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';

type Props = {
  article: Object,
  authorizationToken: string,
};

export const ArticleListItem = (props: Props) => {
  const { article, authorizationToken } = props;
  return (
    <Paper>
      <Link to={`/app/articles/${article.id}`} className="article_index-link">
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
            {article.pinned
              ? <Badge badgeContent="p" color="primary">
                <h3 className="article_index-article_title">{article.heading}</h3>
                </Badge>
              : <h3 className="article_index-article_title">{article.heading}</h3>}
            <p className="article_index-description">{article.body.substring(0, 60)}</p>
          </div>
        </div>
      </Link>
    </Paper>
  );
};
