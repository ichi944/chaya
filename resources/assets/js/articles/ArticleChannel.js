import React, { Component } from 'react';
import { Paper, Divider, FloatingActionButton, Card, CardHeader, CardText } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink200 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';

import { ArticleListItem } from './organisms/ArticleListItem';
import { PageNavigation } from './organisms/PageNavigation';
import { EditDescriptionDialog } from './organisms/Dialogs';

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
    push('articles/add');
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
    const { name, description = 'no description' } = this.props.articleChannel.channel;
    const { descriptionEditorIsOpen, descriptionEditorContent } = this.props.articleChannel;
    const { handleNavigatePage } = this.props;
    const { authorizationToken } = this.props.auth;

    const pageNavigationProps = {
      prev_page_url,
      next_page_url,
      handleNavigatePage,
    };

    const styles = {
      button: {
        position: 'absolute',
        right: '2rem',
        top: '4.7rem',
      },
      channelHeader: {
        position: 'relative',
      },
      channelAction: {
        marginTop: '-1rem',
        martinLeft: '1rem',
      },
    };

    return (
      <div>
        <Paper className="article_index-container">
          <FloatingActionButton
            style={styles.button}
            zDepth={2}
            onTouchTap={this.handleCreateNewArticle}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Divider />
          <Card style={styles.ChannelHeader}>
            <CardHeader title={`${name} Channel`} subtitle={`${from}件目〜${to}件目 (全${total}件)`} />
            <div style={styles.channelAction}>
              <IconButton onTouchTap={this.handleToggleDescriptionEditor}>
                <ActionSettings color={pink200} />
              </IconButton>
            </div>
            <Divider />
            <CardText dangerouslySetInnerHTML={{ __html: description.replace(/\r?\n/g, '<br>') }} />
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

export default ArticleChannel;
