import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import AttachmentProps from '../interfaces/Attachment';

const styles = createStyles({
  attachmentItem: {
    padding: '0.6rem 1rem',
  },
  itemText: {
    paddingLeft: 0,
  },
  noItemText: {
    padding: '0.6rem 1rem',
    color: grey[300],
  },
});

interface Props {
  attachments: AttachmentProps[];
  handleDeleteAttachment?: (index: number) => void;
  classes: {
    wrapper: string;
    attachmentItem :string;
    noItemText: string;
    itemText: string;
  };
}
/**
 * List of attachments which have been not uploaded yet on ArticleAdd/Edit screen
 */
const AttachmentsList = ({
  attachments,
  handleDeleteAttachment,
  classes,
}: Props) => {
  if (attachments.length === 0) {
    return <Typography variant="caption" className={classes.noItemText}>無し</Typography>;
  }
  return (
    <List dense className={classes.wrapper}>
      {attachments.map((f, index) => (
        <ListItem className={classes.attachmentItem} key={index}>
          <ListItemIcon>
            <AttachmentIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText} primary={f.name} />
          {!handleDeleteAttachment
            ? null
            : <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={() => handleDeleteAttachment(index)}>
                <DeleteIcon />
              </IconButton>
              </ListItemSecondaryAction>}
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(AttachmentsList);
