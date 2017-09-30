// @flow
import React, { Component } from 'react';

import { Paper, Divider, TextField, Button } from 'material-ui';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import parseToMarkdown from '../../services/parseToMarkdown';
import EditorHeader from '../molecules/EditorHeader';

type Props = {
  editorHeaderText: string,
  heading: string,
  body: string,
  onPreview: boolean,
  handleChange: Function,
  handleCancel: Function,
  handleCancelText: string,
  handleSubmit: Function,
  handleSubmitText: string,
  handleTogglePreview: Function,
};

class Editor extends Component<void, Props, void> {
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
        <EditorHeader title={editorHeaderText} />

        <div className="editor-main">
          <div className="editor-forms">
            {onPreview
              ? <div className="editor-previewer_wrapper">
                <h2 className="editor-previewer_heading">{heading}</h2>
                <Divider />
                <div
                  className="markdown-body editor-previewer_body"
                  dangerouslySetInnerHTML={{ __html: parseToMarkdown(body) }}
                />
              </div>
              : <div className="editor-forms_inputs">
                <TextField
                  label="見出し"
                  name="heading"
                  value={heading}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                />
                <br />

                <TextField
                  label="本文"
                  name="body"
                  value={body}
                  multiline
                  rows={12}
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                />
                <br />
              </div>}

            <div className="editor-actions">
              <Button onClick={handleCancel}>{handleCancelText}</Button>
              <Button color="primary" onClick={handleSubmit}>{handleSubmitText}</Button>
            </div>
          </div>

          <div className="editor-tools">
            <FormControlLabel
              control={<Switch checked={onPreview} onChange={handleTogglePreview} />}
              label="プレビュー"
            />

          </div>

        </div>

      </Paper>
    );
  }
}

export default Editor;
