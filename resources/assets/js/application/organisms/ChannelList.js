import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
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
  render() {
    const { channels } = this.props.channels;
    return (
      <List defaultValue={1}>
        {channels.map((channel) => {
          const active = channel.id === this.props.articleChannel.channel.id;
          return (
            <ListItem
              key={channel.id}
              primaryText={channel.name}
              style={active ? styles.channelListItemActive : styles.channelListItem}
              containerElement={<Link to={`/app/articles/channel/${channel.id}`} />}
            />
          );
        })}
      </List>
    );
  }
}

export default ChannelList;
