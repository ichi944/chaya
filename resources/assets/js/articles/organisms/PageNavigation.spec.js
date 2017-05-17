import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import { FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { PageNavigation } from './PageNavigation';

injectTapEventPlugin();

describe('<PageNavigation />', () => {
  it('renders PageNavigation', () => {
    const props = {
      handleNavigatePage: () => {},
      prev_page_url: 'url',
      next_page_url: 'url',
      query: null,
    };
    const wrapper = shallow(<PageNavigation {...props} />);
    expect(wrapper.find(FlatButton)).to.have.length(2);
  });
  // TODO: Test clicking buttons
});
