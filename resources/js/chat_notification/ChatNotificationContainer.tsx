import * as React from 'react';
import { connect } from 'react-redux';
import { AuthState } from '../auth/interfaces/auth';
import { ProfileState } from '../application/interfaces/profile';
import { RootState } from '../interfaces/rootState';

interface Window {
  Echo: any;
}
declare var window: Window;

interface Props {
  history: any;
  auth: AuthState;
  profile: ProfileState;
}
class ChatNotification extends React.Component<Props> {
  componentDidMount() {
    const { push } = this.props.history;
    const { authorizationToken } = this.props.auth;
    window.Echo.private('shared').listen('ChatNotification', e => {
      const current_user_id = this.props.profile.id;
      const { user, article, body } = e.message.chat_message;

      if (current_user_id !== user.id && Notification.permission === 'granted') {
        const options = {
          body: article.heading,
          icon: `/private-img/${user.avatar_img_url}?token=${authorizationToken}`,
        };
        const notification = new Notification(`${user.name}: ${body}`, options);
        notification.onclick = () => {
          push(`/app/articles/${article.id}`);
        };
      }
    });
  }
  componentWillUnmount() {
    window.Echo.leave('shared');
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = ({ profile, auth }: RootState) => {
  return {
    profile,
    auth,
  };
};

export default connect(mapStateToProps)(ChatNotification);
