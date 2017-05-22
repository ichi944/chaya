import React, { Component } from 'react';
import { Paper, FlatButton, Avatar, Subheader, Divider } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';

const styles = {
  is_verified_with_email: {
    color: grey400,
  },
};

class TeamMembers extends Component {
  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }
  render() {
    const { members } = this.props.teamMembers;
    const { authorizationToken } = this.props.auth;
    console.log('@team member render', this.props);
    return (
      <Paper className="article_index-container">
        <Subheader>メンバー一覧</Subheader>
        <Divider />
        {members.map(member => (
          <Paper key={member.id}>
            <div className="article_index-wrapper">
              <div className="article_index-avatar">
                <Avatar src={`/private-img/${member.avator_img_url}?token=${authorizationToken}`} />
              </div>
              <div className="article_index-header">
                <p className="article_index-name">{member.name}</p>
                <p className="article_index-date">{member.email}</p>
              </div>
              <div className="article_index-body">
                {member.comment}
              </div>
              <div className="article_index-body">
                {member.is_verified
                  ? <span style={styles.is_verified_with_email}>メール認証済み</span>
                  : <span>メール未認証</span>}
              </div>
              <div className="article_index-body">
                {member.is_verified_by_admin
                  ? <span style={styles.is_verified_with_email}>認証済み</span>
                  : <FlatButton label="承認する" primary />}
              </div>
              <div className="article_index-body">
                {member.is_locked ? 'ロックされています' : <FlatButton label="ロックする" />}
              </div>
            </div>
          </Paper>
        ))}
      </Paper>
    );
  }
}

export default TeamMembers;
