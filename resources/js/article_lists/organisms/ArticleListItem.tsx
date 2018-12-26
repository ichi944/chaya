import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ArticleModel } from '../../articles/interfaces/Article';

interface UserProps {
  avatar_img_url: string | null;
  name: string;
}

interface Props {
  article: ArticleModel;
  authorizationToken: string | null;
  classes: {
    wrapper: string;
    meta: string;
    avatar_grid: string;
    avatar: string;
    body: string;
  };
}

const styles = createStyles({
  wrapper: {
    padding: '.7rem',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  },
  meta: {
    width: 120,
  },
  avatar_grid: {
    marginRight: '.7rem',
  },
  avatar: {
    height: 48,
    width: 48,
  },
  body: {
    marginLeft: '.7rem',
    maxWidth: 'none',
    flexGrow: 6,
    '@media (max-width: 960px)': {
      marginLeft: 0,
      marginTop: '.7rem',
    },
  },
});

const ArticleListItem = (props: Props) => {
  const { article, authorizationToken, classes } = props;
  if (!authorizationToken) {
    return <div>Not Authenticated</div>;
  }
  return (
    <Paper>
      <Link to={`/app/articles/${article.id}`} className="article_index-link">
        <Grid container justify="flex-start" className={classes.wrapper}>
          <Grid item className={classes.avatar_grid}>
            {article.user.avatar_img_url === null ? (
              <Avatar className={classes.avatar} src="/img/no-image.png" />
            ) : (
              <Avatar
                className={classes.avatar}
                src={`/private-img/${article.user.avatar_img_url}?token=${authorizationToken}`}
              />
            )}
          </Grid>
          <Grid item>
            <p className="article_index-name">{article.user.name}</p>
            <p className="article_index-date">{article.created_at}</p>
          </Grid>
          <Grid item xs={12} md={8} className={classes.body}>
            {article.pinned ? (
              <Badge badgeContent="p" color="primary">
                <h3 className="article_index-article_title">{article.heading}</h3>
              </Badge>
            ) : (
              <h3 className="article_index-article_title">{article.heading}</h3>
            )}
          </Grid>
        </Grid>
      </Link>
    </Paper>
  );
};

export default withStyles(styles)(ArticleListItem);
