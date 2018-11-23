import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import CurrentAttachmentProps from '../interfaces/CurrentAttachment';

const styles = createStyles({
  wrapper: {
    maxWidth: '20rem',
  },
  attachmentItem: {
    paddingLeft: '1rem',
  },
  itemText: {
    paddingLeft: 0,
  },
});

interface Props {
  attachments: CurrentAttachmentProps[];
  handleDownloadAttachment?: (id: number, name: string) => void;
  handleShowDialogDeleteCurrentAttachment?: (attachment: CurrentAttachmentProps) => void;
  classes: {
    wrapper: string;
    attachmentItem: string;
    itemText: string;
  };
}
/**
 * List of attachments which have already been uploaded on Article Detail/Edit screen.
 */
const CurrentAttachmentsList = ({
  attachments,
  handleDownloadAttachment,
  handleShowDialogDeleteCurrentAttachment,
  classes,
}: Props) => {
  // For Article Detail Screen
  if (handleDownloadAttachment) {
    return (
      <List dense className={classes.wrapper}>
        {attachments.map(f => (
          <ListItem
            className={classes.attachmentItem}
            button
            key={f.id}
            onClick={() => handleDownloadAttachment(f.id, f.name)}
          >
            <ListItemIcon>
              <AttachmentIcon />
            </ListItemIcon>
            <ListItemText primary={f.name} />
          </ListItem>
        ))}
      </List>
    );
  }
  // For Article Edit Screen
  return (
    <List dense className={classes.wrapper}>
      {attachments.map(f => (
        <ListItem className={classes.attachmentItem} key={f.id}>
          <ListItemIcon>
            <AttachmentIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText} primary={f.name} />
          {!handleShowDialogDeleteCurrentAttachment
            ? null
            : <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => handleShowDialogDeleteCurrentAttachment(f)}
              >
                <DeleteIcon />
              </IconButton>
              </ListItemSecondaryAction>}
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(CurrentAttachmentsList);
