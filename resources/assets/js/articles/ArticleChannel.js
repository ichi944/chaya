import React, { Component } from 'react';
import { Paper } from 'material-ui';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ContentAdd from 'material-ui-icons/Add';
import { pink200 } from 'material-ui/colors';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import { withStyles } from 'material-ui/styles';

import { ArticleListItem } from './organisms/ArticleListItem';
import { PageNavigation } from './organisms/PageNavigation';
import { EditDescriptionDialog } from './organisms/Dialogs';

const styles = {
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
};

class ArticleChannel extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this);
    this.handleUpdateChannelDescription = this.handleUpdateChannelDescription.bind(this);
    this.handleToggleDescriptionEditor = this.handleToggleDescriptionEditor.bind(this);
    this.handleChangeEditDescriptionContent = this.handleChangeEditDescriptionContent.bind(this);
    this.handleSubmitEditDescription = this.handleSubmitEditDescription.bind(this);
  }
  componentDidMount() {
    const { initialize } = this.props;
    const { current_page = null } = this.props.articleChannel.articles;
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
  handleUpdateChannelDescription(channel_id, description) {
    this.props.handleUpdateChannelDescription(channel_id, description);
  }
  handleToggleDescriptionEditor() {
    if (this.props.articleChannel.descriptionEditorIsOpen) {
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
    const {
      data,
      total,
      from,
      to,
      prev_page_url,
      next_page_url,
    } = this.props.articleChannel.articles;
    const { name, description } = this.props.articleChannel.channel;
    const { descriptionEditorIsOpen, descriptionEditorContent } = this.props.articleChannel;
    const { handleNavigatePage } = this.props;
    const { authorizationToken } = this.props.auth;
    const classes = this.props.classes;

    const pageNavigationProps = {
      prev_page_url,
      next_page_url,
      handleNavigatePage,
    };

    return (
      <div>
        <Paper className="article_index-container">
          <Button
            variant="fab"
            onClick={this.handleCreateNewArticle}
            color="primary"
            aria-label="add"
            className={classes.button}
          >
            <AddIcon />
          </Button>

          <Card className={classes.channelHeader}>
            <CardHeader title={`${name} Channel`} subheader={`${from}件目〜${to}件目 (全${total}件)`} />
            <div className={classes.channelAction}>
              <IconButton onClick={this.handleToggleDescriptionEditor}>
                <SettingsIcon color={pink200} />
              </IconButton>
            </div>
            <Divider />
            <CardContent>
              <Typography
                component="p"
                dangerouslySetInnerHTML={{
                  __html: description ? description.replace(/\r?\n/g, '<br>') : 'no description',
                }}
              />
            </CardContent>
          </Card>

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

export default withStyles(styles)(ArticleChannel);
