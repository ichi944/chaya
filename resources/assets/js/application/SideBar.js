import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline';
import Divider from 'material-ui/Divider';

import { withStyles } from 'material-ui/styles';

import Subheader from './atoms/Subheader';

import ChannelList from './organisms/ChannelList';

const styles = {
  logo: {
    cursor: 'pointer',
  },
  paper: {
    width: '220px',
  },
  menuItemRoot: {
    fontSize: '0.8rem',
    height: '1rem',
    lineHeight: '1rem',
  },
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleClickLogo = this.handleClickLogo.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleManageAppSettingTouchTap = this.handleManageAppSettingTouchTap.bind(this);
    this.handleManageTeamMembersTouchTap = this.handleManageTeamMembersTouchTap.bind(this);
    this.handleClickChannelListItem = this.handleClickChannelListItem.bind(this);
    this.handleClickAddChannel = this.handleClickAddChannel.bind(this);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }
  componentDidUpdate() {
    const { router } = this.props;
    const currentChannelId = this.props.articleChannel.channel.id;
    // NOTE: If you do not clear the active channel, add that url to regex.
    if (!/(channel)|(articles\/add)/.test(router.location.pathname) && currentChannelId) {
      this.props.clearActiveChannel();
    }
  }
  handleClickLogo() {
    const { push } = this.props.history;
    push('/app/home');
  }
  handleClickMenu(e) {
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
  handleClickChannelListItem(channelId) {
    const { push } = this.props.history;
    push(`/app/articles/channel/${channelId}`);
  }
  handleClickAddChannel() {
    console.log('@handleClickAddChannel');
  }
  render() {
    const {
      profile, channels, articleChannel, classes,
    } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.paper,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.handleClickMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  width: 'auto',
                },
              }}
            >
              <MenuItem
                classes={{ root: classes.menuItemRoot }}
                onClick={this.handleManageAppSettingTouchTap}
              >
                アプリケーションの管理をする...
              </MenuItem>
              <MenuItem
                classes={{ root: classes.menuItemRoot }}
                onClick={this.handleManageTeamMembersTouchTap}
              >
                チームメンバーの管理をする...
              </MenuItem>
            </Menu>
            <Typography
              className={classes.logo}
              variant="title"
              color="inherit"
              noWrap
              onClick={this.handleClickLogo}
            >
              CHAYA
            </Typography>
          </Toolbar>
        </AppBar>
        <Subheader>{profile.name}</Subheader>
        <p className="sidebar_link-profile"><Link to="/app/profile">プロフィールを編集する...</Link></p>
        <Divider />
        <Subheader rightIcon={<AddCircleOutlineIcon onClick={this.handleClickAddChannel} />}>
          Channel
        </Subheader>
        <ChannelList
          channels={channels}
          articleChannel={articleChannel}
          handleClickChannelListItem={this.handleClickChannelListItem}
        />

      </Drawer>
    );
  }
}

export default withStyles(styles)(SideBar);
