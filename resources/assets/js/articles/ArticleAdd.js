import React, { Component } from 'react';
import marked from 'marked';

import {
  Paper,
  Divider,
  Subheader,
  TextField,
  FlatButton,
  RaisedButton,
  Toggle,
} from 'material-ui';

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  render() {
    const {
      heading,
      body,
      onPreview,
      mode,
    } = this.props;
    const {
      handleChange,
      handleTogglePreview,
    } = this.props;
    const styles = {
      paper: {
        backgroundColor: '#FAFAFA',
      },
      headerText: {
      },
    };
    return (
      <div style={{ position: 'relative' }}>
        <Paper className="editor-wrapper" style={styles.paper}>
          <div>
            <Subheader style={styles.headerText}>新しく書く...</Subheader>
          </div>

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
      </div>
    );
  }
}

export default ArticleAdd;
