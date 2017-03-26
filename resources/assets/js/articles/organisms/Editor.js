import React, { Component } from 'react';
import marked from 'marked';

import {
  Paper,
  Divider,
  TextField,
  FlatButton,
  RaisedButton,
  Toggle,
} from 'material-ui';

import EditorHeader from '../molecules/EditorHeader';

class Editor extends Component {
  getMarkdown(rawBody) {
    return marked(rawBody, {
      gfm: true,
    });
  }
  render() {
    const {
      editorHeaderText,
      heading,
      body,
      onPreview,
      handleChange,
      handleCancel,
      handleCancelText,
      handleSubmit,
      handleSubmitText,
      handleTogglePreview,
    } = this.props;
    const styles = {
      paper: {
        backgroundColor: '#FAFAFA',
      },
    };
    return (
      <Paper className="editor-wrapper" style={styles.paper}>
        <EditorHeader
          title={editorHeaderText}
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
                label={handleCancelText}
                onTouchTap={handleCancel}
                style={{ marginRight: '1rem' }}
              />
              <RaisedButton
                label={handleSubmitText}
                primary
                onTouchTap={handleSubmit}
              />
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
    );
  }
}

export default Editor;
