import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Drawer, AppBar, Subheader, Divider, Popover, Menu, MenuItem } from 'material-ui';

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
    this.state = {
      open: false,
      anchorEl: null,
    };
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
  render() {
    const { profile } = this.props;
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
            </Menu>
          </Popover>
        </AppBar>
        <Subheader>{profile.name}</Subheader>
        <p className="sidebar_link-profile"><Link to="/app/profile">プロフィールを編集する...</Link></p>
        <Divider />

      </Drawer>
    );
  }
}

export default SideBar;
