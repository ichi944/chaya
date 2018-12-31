import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';

import { withStyles, createStyles } from '@material-ui/core/styles';

import ArticleListItem from './organisms/ArticleListItem';
import { PageNavigation } from './organisms/PageNavigation';
import { EditDescriptionDialog } from './organisms/Dialogs';
import { ArticleListsState } from './interfaces/ArticleList';
import { AuthState } from '../auth/interfaces/auth';
import { Fab } from '@material-ui/core';

const styles = createStyles({
  button: {
    position: 'fixed',
    right: '2rem',
    bottom: '4.7rem',
  },
  channelHeader: {
    position: 'relative',
  },
  channelAction: {
    marginTop: '-1rem',
    martinLeft: '1rem',
  },
});

interface Props {
  auth: AuthState;
  articleLists: ArticleListsState;
  match: any;
  history: any;
  initialize: (channel_id: number, current_page: any) => void;
  handleCloseDescriptionEditor: () => void;
  handleOpenDescriptionEditor: () => void;
  handleChangeEditDescriptionContent: (e) => void;
  handleSubmitEditDescription: () => void;
  handleNavigatePage: (target_url: string, query: string) => void;
  classes: {
    button: string;
    channelHeader: string;
    channelAction: string;
  };
}
class ArticleLists extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this);
    this.handleToggleDescriptionEditor = this.handleToggleDescriptionEditor.bind(this);
    this.handleChangeEditDescriptionContent = this.handleChangeEditDescriptionContent.bind(this);
    this.handleSubmitEditDescription = this.handleSubmitEditDescription.bind(this);
  }
  componentDidMount() {
    const { initialize } = this.props;
    const { current_page = null } = this.props.articleLists.articles;
    const { channel_id } = this.props.match.params;

    initialize(channel_id, current_page);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.channel_id !== nextProps.match.params.channel_id) {
      const { initialize } = this.props;
      const { channel_id } = nextProps.match.params;

      initialize(channel_id, null);
    }
  }
  handleCreateNewArticle() {
    const { push } = this.props.history;
    console.log('on click create new', this.props);
    push('/app/articles/add');
  }
  handleToggleDescriptionEditor() {
    if (this.props.articleLists.descriptionEditorIsOpen) {
      this.props.handleCloseDescriptionEditor();
    } else {
      this.props.handleOpenDescriptionEditor();
    }
  }
  handleChangeEditDescriptionContent(e) {
    this.props.handleChangeEditDescriptionContent(e.target.value);
  }
  handleSubmitEditDescription() {
    this.props.handleSubmitEditDescription();
  }
  render() {
    if (this.props.articleLists.isFetching) {
      return null;
    }
    if (!this.props.articleLists.channel) {
      return null;
    }
    const {
      data,
      total,
      from,
      to,
      prev_page_url,
      next_page_url,
    } = this.props.articleLists.articles;
    const { name, description } = this.props.articleLists.channel;
    const { descriptionEditorIsOpen, descriptionEditorContent } = this.props.articleLists;
    const { handleNavigatePage } = this.props;
    const { authorizationToken } = this.props.auth;
    const { classes } = this.props;
    const article_total_text =
      total === 0 ? `(全${total}件)` : `${from}件目〜${to}件目 (全${total}件)`;

    const pageNavigationProps = {
      prev_page_url,
      next_page_url,
      handleNavigatePage,
    };

    return (
      <div>
        <Paper className="article_index-container">
          <Fab
            onClick={this.handleCreateNewArticle}
            color="primary"
            aria-label="add"
            className={classes.button}
          >
            <AddIcon />
          </Fab>

          <Card className={classes.channelHeader}>
            <CardHeader title={`${name} Channel`} subheader={article_total_text} />
            <div className={classes.channelAction}>
              <IconButton onClick={this.handleToggleDescriptionEditor}>
                <SettingsIcon color="inherit" />
              </IconButton>
            </div>
            <Divider />
            <CardContent>
              <Typography
                component="p"
                variant="overline"
                dangerouslySetInnerHTML={{
                  __html: description ? description.replace(/\r?\n/g, '<br>') : 'no description',
                }}
              />
            </CardContent>
          </Card>

          {data.length === 0 ? (
            <Paper>
              <div className="article_index-wrapper">記事がありませんでした。</div>
            </Paper>
          ) : (
            data.map(article => {
              return (
                <ArticleListItem
                  article={article}
                  authorizationToken={authorizationToken}
                  key={article.id}
                />
              );
            })
          )}
        </Paper>
        <PageNavigation {...pageNavigationProps} />
        <EditDescriptionDialog
          open={descriptionEditorIsOpen}
          handleChange={this.handleChangeEditDescriptionContent}
          handleCancel={this.handleToggleDescriptionEditor}
          handleSubmit={this.handleSubmitEditDescription}
          content={descriptionEditorContent}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ArticleLists);
