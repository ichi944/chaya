import * as React from 'react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';

import { withStyles, createStyles } from '@material-ui/core/styles';

import Subheader from './atoms/Subheader';

import ChannelList from './organisms/ChannelList';
import { ProfileState } from './interfaces/profile';
import { ChannelsState } from '../channel/interfaces/channel';
import { ArticleListsState } from '../article_lists/interfaces/ArticleList';

const styles = createStyles({
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
});

interface Props {
  router: any;
  articleLists: ArticleListsState;
  profile: ProfileState;
  channels: ChannelsState;
  clearActiveChannel: () => void;
  dispatch: any;
  classes: {
    logo: string;
    paper: string;
    menuItemRoot: string;
  };
}
interface State {
  open: boolean;
  anchorEl: any;
}
class SideBar extends React.Component<Props, State> {
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
    let currentChannelId: number | null = null;
    if (this.props.articleLists.channel) {
      currentChannelId = this.props.articleLists.channel.id;
    }
    // NOTE: If you don't want to clear the active channel, add that url to regex below.
    if (
      !/(channels\/[0-9]+\/articles)|(articles\/add)|(articles\/[0-9]+)/.test(
        router.location.pathname,
      ) &&
      currentChannelId
    ) {
      this.props.clearActiveChannel();
    }
  }
  handleClickLogo() {
    this.props.dispatch(push('/app/home'));
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
    this.props.dispatch(push('/app/admin-preferences'));
  }
  handleManageTeamMembersTouchTap() {
    this.handleRequestClose();
    this.props.dispatch(push('/app/manage-team-members'));
  }
  handleClickChannelListItem(channelId) {
    this.props.dispatch(push(`/app/channels/${channelId}/articles`));
  }
  handleClickAddChannel() {
    console.log('@handleClickAddChannel');
    this.props.dispatch(push('/app/channels/add'));
  }
  render() {
    const { profile, channels, articleLists, classes } = this.props;
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
              variant="h6"
              color="inherit"
              noWrap
              onClick={this.handleClickLogo}
            >
              CHAYA
            </Typography>
          </Toolbar>
        </AppBar>
        <Subheader title={profile.name} />
        <p className="sidebar_link-profile">
          <Link to="/app/profile">プロフィールを編集する...</Link>
        </p>
        <Divider />
        {profile.is_admin ? (
          <Subheader
            title="Channel"
            rightIcon={<AddCircleOutlineIcon onClick={this.handleClickAddChannel} />}
          />
        ) : (
          <Subheader title="Channel" />
        )}

        <ChannelList
          channels={channels}
          articleLists={articleLists}
          handleClickChannelListItem={this.handleClickChannelListItem}
        />
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideBar);
