import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Drawer, AppBar, Subheader, Divider, Popover, Menu, MenuItem } from 'material-ui';

import ChannelList from './organisms/ChannelList';

const styles = {
  menuItem: {
    lineHeight: '36px',
    minHeight: '36px',
    fontSize: '.8rem',
  },
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleClickTitle = this.handleClickTitle.bind(this);
    this.handleLeftIconButtonTouchTap = this.handleLeftIconButtonTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleManageAppSettingTouchTap = this.handleManageAppSettingTouchTap.bind(this);
    this.handleManageTeamMembersTouchTap = this.handleManageTeamMembersTouchTap.bind(this);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }
  componentDidUpdate() {
    const { router } = this.props;
    const currentChannelId = this.props.articleChannel.channel.id;
    if (!/channel/.test(router.location.pathname) && currentChannelId) {
      this.props.clearActiveChannel();
    }
  }
  handleClickTitle() {
    const { push } = this.props.history;
    push('/app/home');
  }
  handleLeftIconButtonTouchTap(e) {
    console.log('toggle');
    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget,
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  }
  handleManageAppSettingTouchTap() {
    const { push } = this.props.history;
    push('/app/admin-preferences');
  }
  handleManageTeamMembersTouchTap() {
    const { push } = this.props.history;
    this.handleRequestClose();
    push('/app/manage-team-members');
  }
  render() {
    const { profile, channels, articleChannel } = this.props;
    return (
      <Drawer docked width={220}>
        <AppBar
          title="CHAYA"
          onTitleTouchTap={this.handleClickTitle}
          onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
        >
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="個人の設定をする..." style={styles.menuItem} disabled />
              <MenuItem
                primaryText="アプリケーションの管理をする..."
                style={styles.menuItem}
                onTouchTap={this.handleManageAppSettingTouchTap}
              />
              <MenuItem
                primaryText="チームメンバーの管理をする..."
                style={styles.menuItem}
                onTouchTap={this.handleManageTeamMembersTouchTap}
              />
            </Menu>
          </Popover>
        </AppBar>
        <Subheader>{profile.name}</Subheader>
        <p className="sidebar_link-profile"><Link to="/app/profile">プロフィールを編集する...</Link></p>
        <Divider />
        <Subheader>Channel</Subheader>
        <ChannelList channels={channels} articleChannel={articleChannel} />

      </Drawer>
    );
  }
}

export default SideBar;
