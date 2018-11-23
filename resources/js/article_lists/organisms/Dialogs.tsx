import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

interface EditDescriptionDialogProps {
  open: boolean,
  handleChange: () => void;
  handleCancel: () => void;
  handleSubmit: () => void;
  content: string | null;
}

export const EditDescriptionDialog = ({
  open,
  handleChange,
  handleCancel,
  handleSubmit,
  content,
}: EditDescriptionDialogProps) => {
  const uw_content = content === null ? '' : content;
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogContent>
        <DialogContentText>新しいチャンネルの説明を入力してください。</DialogContentText>
        <TextField
          id="edit_channel_desicription"
          name="content"
          value={uw_content}
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
