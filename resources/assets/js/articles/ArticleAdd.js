import React, { Component } from 'react';
import marked from 'marked';

import {
  Paper,
  Divider,
  TextField,
  FlatButton,
  RaisedButton,
  Toggle,
  Dialog,
} from 'material-ui';

import EditorHeader from './molecules/EditorHeader';
import {
  ArticleIsPublishedDialog,
} from './organisms/Dialogs';

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  getMarkdown(rawBody) {
    return marked(rawBody, {
      gfm: true,
    });
  }
  handleCancel() {
    const {
      history,
      clearEditorContent,
    } = this.props;
    clearEditorContent();
    history.goBack();
  }
  handleSubmit() {
    const {
      heading,
      body,
    } = this.props;
    this.props.handleSubmit({
      heading,
      body,
    });
  }
  handleClose() {
    this.props.handleClose();
  }
  render() {
    const {
      heading,
      body,
      onPreview,
      mode,
      confirmSuccessDialogOpen,
    } = this.props;
    const {
      handleChange,
      handleTogglePreview,
    } = this.props;
    const styles = {
      paper: {
        backgroundColor: '#FAFAFA',
      },
    };
    return (
      <div style={{ position: 'relative' }}>
        <Paper className="editor-wrapper" style={styles.paper}>
          <EditorHeader
            title="新しく書く..."
          />

          <div className="editor-main">
            <div className="editor-forms">
              {onPreview ? (
                <div className="editor-previewer_wrapper">
                  <h2 className="editor-previewer_heading">{heading}</h2>
                  <Divider />
                  <div
                    className="markdown-body editor-previewer_body"
                    dangerouslySetInnerHTML={{ __html: this.getMarkdown(body) }}
                  />
                </div>
              ) : (
                <div className="editor-forms_inputs">
                  <TextField
                    floatingLabelText="見出し"
                    hintText=""
                    name="heading"
                    value={heading}
                    fullWidth
                    onChange={handleChange}
                  />
                  <br />

                  <TextField
                    floatingLabelText="本文"
                    hintText=""
                    name="body"
                    value={body}
                    multiLine
                    rows={12}
                    fullWidth
                    onChange={handleChange}
                  /><br />
                </div>
              )}

              <div className="editor-actions">
                <FlatButton
                  label="やめる"
                  onTouchTap={this.handleCancel}
                  style={{ marginRight: '1rem' }}
                />
                {mode === 'new' ? (
                  <RaisedButton
                    label="公開する"
                    primary
                    onTouchTap={this.handleSubmit}
                  />
                ) : null}
                {mode === 'edit' ? (
                  <RaisedButton
                    label="更新する"
                    primary
                    onTouchTap={this.handleSubmit}
                  />
                  ) : null}
              </div>
            </div>

            <div className="editor-tools">
              <Toggle
                label="プレビュー"
                labelPosition="right"
                toggled={onPreview}
                onToggle={handleTogglePreview}
              />
            </div>

          </div>

        </Paper>

        <ArticleIsPublishedDialog
          open={confirmSuccessDialogOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default ArticleAdd;
