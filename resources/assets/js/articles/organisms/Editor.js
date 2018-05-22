// @flow
import React, { Component } from 'react';

import { Paper, TextField, Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import parseToMarkdown from '../../services/parseToMarkdown';
import EditorHeader from '../molecules/EditorHeader';
import DropAttachment from './DropAttachment';
import AttachmentList from '../molecules/AttachmentList';
import CurrentAttachmentList from '../molecules/CurrentAttachmentList';

const styles = {
  attachments_list: {
    padding: '1rem',
  },
  attachments_list_title: {
    color: grey[500],
  },
};

type Props = {
  editorHeaderText: string,
  heading: string,
  body: string,
  current_attachments: ?Array,
  attachments: Array,
  onPreview: boolean,
  handleChange: Function,
  handleCancel: Function,
  handleCancelText: string,
  handleDrop: Function,
  handleShowDialogDeleteCurrentAttachment: ?Function,
  handleDeleteCurrentAttachment: ?Function,
  handleDeleteAttachment: Function,
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
      current_attachments = null,
      attachments,
      onPreview,
      handleChange,
      handleCancel,
      handleCancelText,
      handleDrop,
      handleDeleteAttachment,
      handleShowDialogDeleteCurrentAttachment = null,
      handleDeleteCurrentAttachment = null,
      handleSubmit,
      handleSubmitText,
      handleTogglePreview,
      classes,
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
                  autoFocus
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

            {!current_attachments
              ? null
              : <Grid container className={classes.attachments_list}>
                <Grid item xs>
                  <Typography className={classes.attachments_list_title} variant="subheading">
                      current attachments
                  </Typography>
                  <CurrentAttachmentList
                    attachments={current_attachments}
                    handleShowDialogDeleteCurrentAttachment={
                        handleShowDialogDeleteCurrentAttachment
                      }
                    handleDeleteCurrentAttachment={handleDeleteCurrentAttachment}
                  />
                </Grid>
                </Grid>}

            <Divider />

            <Grid container className={classes.attachments_list}>
              <Grid item xs>
                <Typography className={classes.attachments_list_title} variant="subheading">
                  attachments
                </Typography>
                <AttachmentList
                  attachments={attachments}
                  handleDeleteAttachment={handleDeleteAttachment}
                />
                <DropAttachment handleDrop={handleDrop} />

              </Grid>
            </Grid>

            <Divider />

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

export default withStyles(styles)(Editor);
