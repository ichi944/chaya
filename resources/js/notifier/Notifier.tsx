import * as React from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { closeNotifier, notifyHello } from './actions';
import { ProfileModel, ProfileState } from '../application/interfaces/profile';
import { NotifierState } from './interfaces/notifier';
import { RootState } from '../interfaces/rootState';

interface Window {
  Echo: any;
}
declare var window: Window;

interface Props {
  profile: ProfileState;
  notifier: NotifierState;
  handleRequestClose: () => void;
  listenHello: (message: string) => void;
}
class Notifier extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.listenHello = this.listenHello.bind(this);
    window.Echo.private('shared').listen('Hello', e => {
      this.listenHello({
        user_id: e.id,
        name: e.name,
        text: e.text,
      });
      if (Notification.permission === 'granted') {
        const notification = new Notification(`${e.name}: ${e.text}`);
      }
    });
  }
  handleRequestClose() {
    this.props.handleRequestClose();
  }
  listenHello(message) {
    const { id } = this.props.profile;
    if (message.user_id === id) {
      return;
    }
    this.props.listenHello(message);
  }
  render() {
    const { open, message } = this.props.notifier;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        onClose={this.handleRequestClose}
        message={<span>{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

const mapStateToProps = ({ notifier, profile }: RootState) => {
  return {
    notifier,
    profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRequestClose() {
      dispatch(closeNotifier());
    },
    listenHello(message) {
      dispatch(notifyHello(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifier);
