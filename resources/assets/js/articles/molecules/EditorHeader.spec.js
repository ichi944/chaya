import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import { Subheader } from 'material-ui'

import EditorHeader from './EditorHeader';

describe('<EditorHeader />', () => {
  it('renders a Subheader', () => {
    const wrapper = shallow(<EditorHeader />);
    expect(wrapper.find(Subheader)).to.have.length(1);
  });

  it('renders title passed', () => {
    const wrapper = shallow(<EditorHeader title="title test" />);
    expect(wrapper.find(Subheader).at(0).prop('children')).is.string('title test');
  })
});
