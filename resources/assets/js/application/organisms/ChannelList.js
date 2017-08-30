import React, { Component } from 'react';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { pink200 } from 'material-ui/colors';
import { Link } from 'react-router-dom';

const styles = {
  channelListItem: {
    paddingLeft: '1rem',
  },
  channelListItemActive: {
    paddingLeft: '1rem',
    backgroundColor: pink200,
  },
};

class ChannelList extends Component {
  handleClickChannelList(channelId) {
    this.props.handleClickChannelListItem(channelId);
  }
  render() {
    const { channels } = this.props.channels;
    return (
      <List defaultValue={1}>
        {channels.map((channel) => {
          const active = channel.id === this.props.articleChannel.channel.id;
          return (
            <ListItem
              button
              dense
              key={channel.id}
              onClick={() => {
                this.handleClickChannelList(channel.id);
              }}
              style={active ? styles.channelListItemActive : styles.channelListItem}
            >
              <ListItemText primary={channel.name} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default ChannelList;
