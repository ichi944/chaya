// @flow
import React from 'react';
import { Button, TextField } from 'material-ui';
import Dialog, { DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';

type ArticleIsPublishedDialogProps = {
  open: boolean,
  handleClose: Function,
};
export const ArticleIsPublishedDialog = ({ open, handleClose }: ArticleIsPublishedDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>記事が公開されました</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

type ArticleIsUpdatedDialogProps = {
  open: boolean,
  handleClose: Function,
};
export const ArticleIsUpdatedDialog = ({ open, handleClose }: ArticleIsUpdatedDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>記事が更新されました</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>OK</Button>
      </DialogActions>
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
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogContent>
        <DialogContentText>本当に削除しますか?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>やめておく</Button>
        <Button color="primary" onClick={handleSubmit}>削除する</Button>
      </DialogActions>
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
    <Dialog open={open} onClose={handleCancel}>
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
