import React, { Component } from 'react';
import {
  Drawer,
  AppBar,
  Subheader,
  Divider,
} from 'material-ui';

class SideBar extends Component {
  render() {
    const {
      profile,
    } = this.props;
    return (
      <Drawer
        docked
        width={220}
      >
        <AppBar
          title="CHAYA"
          showMenuIconButton={false}
        />
        <Subheader>{ profile.name }</Subheader>
        <Divider />

      </Drawer>
    );
  }
}

export default SideBar;
