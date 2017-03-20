import React, { Component } from 'react';
import {
  Drawer,
  AppBar,
  Subheader,
  Divider,
} from 'material-ui';


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleClickTitle = this.handleClickTitle.bind(this);
  }
  handleClickTitle() {
    const { push } = this.props.history;
    push('/app/home');
  }
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
          onTitleTouchTap={this.handleClickTitle}
          showMenuIconButton={false}
        />
        <Subheader>{ profile.name }</Subheader>
        <Divider />

      </Drawer>
    );
  }
}

export default SideBar;
