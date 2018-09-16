// @flow
import React from 'react';

import { Paper, TextField, Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';

import parseToMarkdown from '../../services/parseToMarkdown';
import EditorHeader from '../molecules/EditorHeader';
import DropAttachment from './DropAttachment';
import AttachmentList from '../molecules/AttachmentList';
import CurrentAttachmentList from '../molecules/CurrentAttachmentList';

const styles2 = {
  paper: {
    backgroundColor: '#FAFAFA',
  },
};
const styles = {
  paper: {
    backgroundColor: '#FAFAFA',
  },
  attachments_list: {
    padding: '1rem',
  },
  attachments_list_title: {
    color: grey[500],
  },
  dropzone: {
    border: 'none 0 #000',
    borderRadius: '20px',
  },
  dropzoneActive: {
    backgroundColor: grey[100],
  },
};

type Props = {
  editorHeaderText: string,
  dirty: Object,
  errors: Object,
  heading: string,
  body: string,
  current_attachments: Object[] | null,
  attachments: Object[],
  onPreview: boolean,
  handleUpdateCursorPosition: Function,
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
  handleDropEmbeddedImage: Function,
  classes: Object,
};

const Editor = ({
  editorHeaderText,
  dirty,
  errors,
  heading,
  body,
  current_attachments = null,
  attachments,
  onPreview,
  handleUpdateCursorPosition,
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
  handleDropEmbeddedImage,
  classes,
}: Props) => {
  return (
    <Paper className="editor-wrapper" style={styles2.paper}>
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
                error={dirty.heading && errors.has('heading')}
                helperText={
                    dirty.heading && errors.has('heading') ? errors.first('heading') : null
                  }
                fullWidth
                autoFocus
                onChange={handleChange}
                margin="normal"
              />
              <br />
              <Dropzone
                onDrop={handleDropEmbeddedImage}
                disableClick
                accept=".jpeg,.png"
                className={classes.dropzone}
                activeClassName={classes.dropzoneActive}
              >
                <TextField
                  label="本文"
                  name="body"
                  value={body}
                  error={dirty.body && errors.has('body')}
                  helperText={dirty.body && errors.has('body') ? errors.first('body') : null}
                  multiline
                  rows={12}
                  fullWidth
                  onKeyUp={handleUpdateCursorPosition}
                  onClick={handleUpdateCursorPosition}
                  onFocus={handleUpdateCursorPosition}
                  onChange={handleChange}
                  margin="normal"
                />
              </Dropzone>
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
};

export default withStyles(styles)(Editor);
