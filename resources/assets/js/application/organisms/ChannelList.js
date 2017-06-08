import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';

const styles = {
  channelListItem: {
    paddingLeft: '1rem',
  },
};
class ChannelList extends Component {
  render() {
    console.log(this.props);
    const { channels } = this.props.channels;
    return (
      <List>
        {channels.map((channel) => {
          return (
            <ListItem
              primaryText={channel.name}
              style={styles.channelListItem}
              containerElement={<Link to={`app/channels/${channel.name}`} />}
            />
          );
        })}
      </List>
    );
  }
}

export default ChannelList;
