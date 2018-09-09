import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, Avatar, Divider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import grey from '@material-ui/core/colors/grey';
import Subheader from '../application/atoms/Subheader';

const styles = {
  backButton: {
    margin: '1rem 0 0 1rem',
  },
  is_verified_with_email: {
    color: grey[400],
    lineHeight: '3rem',
  },
  is_not_verified_with_email: {
    lineHeight: '3rem',
  },
  is_verified_by_admin: {
    color: grey[400],
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
    this.handleToggleShowMembersWhoIsNotVerifiedWithEmail = this.handleToggleShowMembersWhoIsNotVerifiedWithEmail.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }
  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }
  handleClickBack(e) {
    this.props.history.goBack();
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
        <Button style={styles.backButton} onClick={this.handleClickBack}>back</Button>
        <Card style={styles.headerCard}>
          <CardHeader title="メンバーの管理を行う" subheader="各メンバーのステータスの確認と認証、ロック/アンロックを行います。" />
          <CardActions>
            <FormControlLabel
              control={
                <Switch
                  checked={showMembersWhoIsNotVerifiedWithEmail}
                  onChange={this.handleToggleShowMembersWhoIsNotVerifiedWithEmail}
                />
              }
              label="メール未認証のメンバーを表示する"
            />
          </CardActions>
          <CardContent>
            メンバーのプロフィールとステータスの確認・変更を行うことが出来ます。<br />
            メンバーのログインには、メール認証を行なったのち管理者による承認が必要です。<br />
            メンバーをロックするとそのメンバーはログイン出来なくなります。投稿はそのまま残ります。
          </CardContent>
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
                      src={`/private-img/${member.avatar_img_url}?token=${authorizationToken}`}
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
                        ? <Button disabled>メール認証済み</Button>
                        : <Button disabled>メール未認証</Button>}
                  </div>
                  <div className="article_index-body">
                    {member.is_verified_by_admin
                        ? <Button disabled>管理者認証済み</Button>
                        : <Button
                          color="primary"
                          onClick={e => this.handleTouchTapVerifyByAdmin(e, member.id)}
                        >
                            承認する
                          </Button>}
                  </div>
                  <div className="article_index-body">
                    {member.is_locked
                        ? <div>
                          <span>ロックされています</span>
                          <Button onClick={e => this.handleTouchTapUnlockMember(e, member.id)}>
                              ロックを解除する
                          </Button>
                          </div>
                        : <Button
                          color="primary"
                          onClick={e => this.handleTouchTapLockMember(e, member.id)}
                        >
                            ロックする
                          </Button>}
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
