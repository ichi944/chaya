import { AuthState } from '../auth/interfaces/auth';
import { SignupState } from '../signup/interfaces/signup';
import { LoginState } from '../auth/interfaces/login';
import { VerifyUserState } from '../signup/interfaces/verifyUser';
import { ProfileState, EditProfileState } from '../application/interfaces/profile';
import { SocketState } from '../initialization/interfaces/socket';
import { ChannelsState, ChannelAddState } from '../channel/interfaces/channel';
import { TeamMembersState } from '../manage_team_members/interfaces/teamMembers';
import { ChatState } from '../chat/interfaces/chat';
import { NotifierState } from '../notifier/interfaces/notifier';
import { NotificationSettingState } from '../notification_setting/interfaces/notification_settings';
import { ArticleListsState } from '../article_lists/interfaces/ArticleList';
import {
  ArticleEditState,
  ArticleAddState,
  ArticleDetailState,
} from '../articles/interfaces/Article';
import { RouterState } from 'connected-react-router';

export interface RootState {
  router: RouterState;
  auth: AuthState;
  login: LoginState;
  signup: SignupState;
  verifyUser: VerifyUserState;
  profile: ProfileState;
  socket: SocketState;
  channels: ChannelsState;
  channelAdd: ChannelAddState;
  editProfile: EditProfileState;
  articleLists: ArticleListsState;
  article: ArticleDetailState;
  articleAdd: ArticleAddState;
  articleEdit: ArticleEditState;
  chat: ChatState;
  teamMembers: TeamMembersState;
  notifier: NotifierState;
  notificationSetting: NotificationSettingState;
}
