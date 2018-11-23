import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Subheader from '../application/atoms/Subheader';

const NotificationSetting = (props) => {
  const styles = {
    paper: {
      backgroundColor: '#FAFAFA',
    },
  };
  const { handleToggleSwitch } = props;
  const { enabled } = props.notificationSetting;
  const button_text = enabled ? 'disable notification' : 'enable notification';
  return (
    <Paper className="editor-wrapper" style={styles.paper}>
      <div>
        <Subheader>通知設定を変更する...</Subheader>
      </div>

      <div className="editor-forms_inputs">
        <Button variant="raised" color="primary" onClick={handleToggleSwitch}>
          {button_text}
        </Button>
      </div>
    </Paper>
  );
};

export default NotificationSetting;
