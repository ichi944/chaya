import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import { FlatButton, TextField } from '@material-ui/core';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import Editor from './Editor';

configure({ adapter: new Adapter() });

describe('<Editor />', () => {
  it('renders input fields if it is not preview mode', () => {
    const props = {
      editorHeaderText: 'Edit',
      heading: 'test heading',
      body: 'test body',
      onPreview: false,
      handleChange: () => {},
      handleCancel: () => {},
      handleCancelText: 'cancel',
      handleSubmit: () => {},
      handleSubmitText: 'submit',
      handleTogglePreview: () => {},
    };
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.find(TextField)).to.have.length(2);
    expect(wrapper.find('.editor-previewer_wrapper')).to.have.length(0);
  });

  it('renders previewer if it is preview mode', () => {
    const props = {
      editorHeaderText: 'Edit',
      heading: 'test heading',
      body: 'test body',
      onPreview: true,
      handleChange: () => {},
      handleCancel: () => {},
      handleCancelText: 'cancel',
      handleSubmit: () => {},
      handleSubmitText: 'submit',
      handleTogglePreview: () => {},
    };
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.find(TextField)).to.have.length(0);
    expect(wrapper.find('.editor-previewer_wrapper')).to.have.length(1);
  });
});
