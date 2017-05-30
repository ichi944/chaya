import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, FlatButton, Avatar, Subheader, Divider, Toggle } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { grey400 } from 'material-ui/styles/colors';

const styles = {
  backButton: {
    margin: '1rem 0 0 1rem',
  },
  is_verified_with_email: {
    color: grey400,
    lineHeight: '3rem',
  },
  is_not_verified_with_email: {
    lineHeight: '3rem',
  },
  is_verified_by_admin: {
    color: grey400,
    lineHeight: '3rem',
  },
  headerCard: {
    margin: '1rem',
  },
  label: {
    fontSize: '12px',
  },
};

class TeamMembers extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTapVerifyByAdmin = this.handleTouchTapVerifyByAdmin.bind(this);
    this.handleTouchTapLockMember = this.handleTouchTapLockMember.bind(this);
    this.handleTouchTapUnlockMember = this.handleTouchTapUnlockMember.bind(this);
    this.handleToggleShowMembersWhoIsNotVerifiedWithEmail = this.handleToggleShowMembersWhoIsNotVerifiedWithEmail.bind(
      this,
    );
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
  handleToggleShowMembersWhoIsNotVerifiedWithEmail(e, isInputChecked) {
    this.props.handleToggleShowMembersWhoIsNotVerifiedWithEmail(isInputChecked);
  }
  render() {
    const { members, showMembersWhoIsNotVerifiedWithEmail } = this.props.teamMembers;
    const { authorizationToken } = this.props.auth;
    return (
      <div>
        <FlatButton
          style={styles.backButton}
          label="home"
          containerElement={<Link to="/app/home" />}
        />
        <Card style={styles.headerCard}>
          <CardHeader
            title="メンバーの管理を行う"
            subtitle="各メンバーのステータスの確認と認証、ロック/アンロックを行います。"
            actAsExpander
            showExpandableButton
          />
          <CardActions>
            <Toggle
              onToggle={this.handleToggleShowMembersWhoIsNotVerifiedWithEmail}
              toggled={showMembersWhoIsNotVerifiedWithEmail}
              label="メール未認証のメンバーを表示する"
              labelPosition="right"
              labelStyle={styles.label}
            />
          </CardActions>
          <CardText expandable>
            メンバーのプロフィールとステータスの確認・変更を行うことが出来ます。<br />
            メンバーのログインには、メール認証を行なったのち管理者による承認が必要です。<br />
            メンバーをロックするとそのメンバーはログイン出来なくなります。投稿はそのまま残ります。
          </CardText>
        </Card>
        <Paper className="article_index-container">
          <Subheader>メンバー一覧</Subheader>
          <Divider />
          {members.map((member) => {
            return member.is_verified_with_email || showMembersWhoIsNotVerifiedWithEmail
              ? <Paper key={member.id}>
                <div className="article_index-wrapper">
                  <div className="article_index-avatar">
                    <Avatar
                      src={`/private-img/${member.avator_img_url}?token=${authorizationToken}`}
                    />
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
                        : <span style={styles.is_not_verified_with_email}>メール未認証</span>}
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
              : null;
          })}
        </Paper>
      </div>
    );
  }
}

export default TeamMembers;
