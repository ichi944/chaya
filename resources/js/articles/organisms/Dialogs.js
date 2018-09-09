// @flow
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

type ArticleIsPublishedDialogProps = {
  open: boolean,
  handleClose: Function,
};
export const ArticleIsPublishedDialog = ({ open, handleClose }: ArticleIsPublishedDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>記事が公開されました</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} autoFocus>OK</Button>
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
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>記事が更新されました</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} autoFocus>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

type ConfirmDeleteCurrentAttachmentDialogProps = {
  open: boolean,
  handleCancel: Function,
  handleSubmit: Function,
};
export const ConfirmDeleteCurrentAttachmentDialog = ({
  open,
  handleCancel,
  handleSubmit,
}: ConfirmDeleteCurrentAttachmentDialogProps) => {
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogContent>
        <DialogContentText>
          本当に削除しますか?<br />
          添付ファイルはすぐに削除され、この操作は取り消せません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>やめておく</Button>
        <Button color="primary" onClick={handleSubmit}>削除する</Button>
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