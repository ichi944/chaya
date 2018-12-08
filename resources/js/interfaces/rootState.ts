import { AuthState } from '../auth/interfaces/auth';
import { SignupState } from '../signup/interfaces/signup';
import { LoginState } from '../auth/interfaces/login';
import { VerifyUserState } from '../signup/interfaces/verifyUser';
import { ProfileState, EditProfileState } from '../application/interfaces/profile';
import { SocketState } from '../application/interfaces/socket';

export interface RootState {
  router: any;
  auth: AuthState;
  login: LoginState;
  signup: SignupState;
  verifyUser: VerifyUserState;
  profile: ProfileState;
  socket: SocketState;
  channels: any;
  channelAdd: any;
  editProfile: EditProfileState;
  articleLists: any;
  article: any;
  articleAdd: any;
  articleEdit: any;
  chat: any;
  searcher: any;
  teamMembers: any;
  notifier: any;
  notificationSetting: any;
}
