import * as React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

interface ArticleIsPublishedDialogProps {
  open: boolean;
  handleClose: (event: React.SyntheticEvent<EventTarget>) => void;
}
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

interface ArticleIsUpdatedDialogProps {
  open: boolean;
  handleClose: (event: React.SyntheticEvent<EventTarget>) => void;
}
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

interface ConfirmDeleteCurrentAttachmentDialogProps {
  open: boolean;
  handleCancel: (event: React.SyntheticEvent<EventTarget>) => void;
  handleSubmit: (event: React.SyntheticEvent<EventTarget>) => void;
}
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

interface ConfirmDeleteArticleDialogProps {
  open: boolean,
  handleCancel: (event: React.SyntheticEvent<EventTarget>) => void;
  handleSubmit: (event: React.SyntheticEvent<EventTarget>) => void;
}
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
