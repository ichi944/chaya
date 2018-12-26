import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Subheader from '../application/atoms/Subheader';
import { NotificationSettingState } from './interfaces/notification_settings';

const styles = {
  paper: {
    backgroundColor: '#FAFAFA',
  },
};
interface Props {
  handleToggleSwitch: () => void;
  notificationSetting: NotificationSettingState;
}
const NotificationSetting = (props: Props) => {
  const { handleToggleSwitch } = props;
  const { enabled } = props.notificationSetting;
  const button_text = enabled ? 'disable notification' : 'enable notification';
  return (
    <Paper className="editor-wrapper" style={styles.paper}>
      <div>
        <Subheader title="通知設定を変更する..." />
      </div>

      <div className="editor-forms_inputs">
        <Button variant="contained" color="primary" onClick={handleToggleSwitch}>
          {button_text}
        </Button>
      </div>
    </Paper>
  );
};

export default NotificationSetting;
