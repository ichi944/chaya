import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import pink from '@material-ui/core/colors/pink';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
  channelListItem: {
    paddingLeft: '1rem',
  },
  channelListItemActive: {
    paddingLeft: '1rem',
    backgroundColor: pink[200],
  },
});

interface Channel {
  id: number;
  name: string;
}
interface Props {
  handleClickChannelListItem: (channelId: number) => void;
  channels: { channels: Channel[] };
  articleLists: { channel: { id: number } };
  classes: {
    channelListItem: string;
    channelListItemActive: string;
  };
}
class ChannelList extends React.Component<Props> {
  render() {
    const { channels } = this.props.channels;
    const { handleClickChannelListItem } = this.props;
    const { classes } = this.props;
    return (
      <List defaultValue="1">
        {channels.map(channel => {
          const active = channel.id === this.props.articleLists.channel.id;
          return (
            <ListItem
              button
              dense
              key={channel.id}
              onClick={() => {
                handleClickChannelListItem(channel.id);
              }}
              className={active ? classes.channelListItemActive : classes.channelListItem}
            >
              <ListItemText primary={channel.name} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default withStyles(styles)(ChannelList);
