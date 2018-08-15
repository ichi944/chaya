import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatNotification extends Component {
  componentDidMount() {
    const { push } = this.props.history;
    const { authorizationToken } = this.props.auth;
    window.Echo.private('shared').listen('ChatNotification', (e) => {
      const current_user_id = this.props.profile.id;
      const { user, article, body } = e.message.chat_message;

      if (current_user_id !== user.id && Notification.permission === 'granted') {
        const options = {
          body: article.heading,
          icon: `/private-img/${user.avator_img_url}?token=${authorizationToken}`,
        };
        const notification = new Notification(`${user.name}: ${body}`, options);
        notification.onclick = () => {
          push(`/app/articles/${article.id}`);
        };
      }
    });
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = ({ profile, auth }) => {
  return {
    profile,
    auth,
  };
};

export default connect(mapStateToProps)(ChatNotification);
