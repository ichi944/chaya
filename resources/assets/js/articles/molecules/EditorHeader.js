// @flow
import React from 'react';

import {
  Subheader,
} from 'material-ui';

type Props = {
  title: string
}

const EditerHeader = ({ title }: Props) => {
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
