import React, { Component } from 'react';
import { Paper, FlatButton, Avatar, Subheader, Divider } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';

const styles = {
  is_verified_with_email: {
    color: grey400,
  },
};

class TeamMembers extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTapVerifyByAdmin = this.handleTouchTapVerifyByAdmin.bind(this);
    this.handleTouchTapLockMember = this.handleTouchTapLockMember.bind(this);
    this.handleTouchTapUnlockMember = this.handleTouchTapUnlockMember.bind(this);
  }
  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }
  handleTouchTapVerifyByAdmin(e, memberId) {
    this.props.handleVerifyByAdmin(memberId);
  }
  handleTouchTapLockMember(e, memberId) {
    this.props.handleLockMember(memberId);
  }
  handleTouchTapUnlockMember(e, memberId) {
    this.props.handleUnlockMember(memberId);
  }
  render() {
    const { members } = this.props.teamMembers;
    const { authorizationToken } = this.props.auth;
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
                {member.is_verified_with_email
                  ? <span style={styles.is_verified_with_email}>メール認証済み</span>
                  : <span>メール未認証</span>}
              </div>
              <div className="article_index-body">
                {member.is_verified_by_admin
                  ? <span style={styles.is_verified_by_admin}>認証済み</span>
                  : <FlatButton
                    label="承認する"
                    primary
                    onTouchTap={e => this.handleTouchTapVerifyByAdmin(e, member.id)}
                  />}
              </div>
              <div className="article_index-body">
                {member.is_locked
                  ? <div>
                    <span>ロックされています</span>
                    <FlatButton
                      label="ロックを解除する"
                      onTouchTap={e => this.handleTouchTapUnlockMember(e, member.id)}
                    />
                  </div>
                  : <FlatButton
                    secondary
                    label="ロックする"
                    onTouchTap={e => this.handleTouchTapLockMember(e, member.id)}
                  />}
              </div>
            </div>
          </Paper>
        ))}
      </Paper>
    );
  }
}

export default TeamMembers;
