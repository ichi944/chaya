// @flow
import React from 'react';

import Subheader from '../../application/atoms/Subheader';

type Props = {
  title: string,
};

const EditerHeader = ({ title }: Props) => {
  return (
    <div>
      <Subheader>{title}</Subheader>
    </div>
  );
};

export default EditerHeader;
