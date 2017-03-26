import React from 'react';

import {
  Subheader,
} from 'material-ui';

const EditerHeader = ({ title }) => {
  const styles = {
    headerText: {

    },
  };
  return (
    <div>
      <Subheader style={styles.headerText}>{title}</Subheader>
    </div>
  );
};

export default EditerHeader;
