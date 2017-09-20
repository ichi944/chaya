// @flow
import React from 'react';
import { Button, TextField } from 'material-ui';
import Dialog, { DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';

type ArticleIsPublishedDialogProps = {
  open: boolean,
  handleClose: Function,
};
export const ArticleIsPublishedDialog = ({ open, handleClose }: ArticleIsPublishedDialogProps) => {
  const actions = <Button label="OK" primary onTouchTap={handleClose} />;
  return (
    <Dialog
      title="The article is published!"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleClose}
    >
      New article is saved.
    </Dialog>
  );
};

type ArticleIsUpdatedDialogProps = {
  open: boolean,
  handleClose: Function,
};
export const ArticleIsUpdatedDialog = ({ open, handleClose }: ArticleIsUpdatedDialogProps) => {
  const actions = <Button label="OK" primary onTouchTap={handleClose} />;
  return (
    <Dialog
      title="The article is updated!"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleClose}
    >
      The article is updated successfully.
    </Dialog>
  );
};

type ConfirmDeleteArticleDialogProps = {
  open: boolean,
  handleCancel: Function,
  handleSubmit: Function,
};
export const ConfirmDeleteArticleDialog = ({
  open,
  handleCancel,
  handleSubmit,
}: ConfirmDeleteArticleDialogProps) => {
  const actions = (
    <div>
      <Button label="Cancel" primary onTouchTap={handleCancel} />
      <Button raised label="Yes, delete" primary onTouchTap={handleSubmit} />
    </div>
  );
  return (
    <Dialog
      title="Delete this article?"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleCancel}
    >
      aaa
    </Dialog>
  );
};

type EditDescriptionDialogProps = {
  open: boolean,
  handleChange: Function,
  handleCancel: Function,
  handleSubmit: Function,
  content: ?string,
};
export const EditDescriptionDialog = ({
  open,
  handleChange,
  handleCancel,
  handleSubmit,
  content,
}: EditDescriptionDialogProps) => {
  return (
    <Dialog open={open} onRequestClose={handleCancel}>
      <DialogContent>
        <DialogContentText>新しいチャンネルの説明を入力してください。</DialogContentText>
        <TextField
          id="edit_channel_desicription"
          name="content"
          value={content}
          multiline
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
