import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import LoadingSpinner from "../src/components/LoadingSpinner";


describe('Loading spinner', () => {

  it('renders correctly', () => {
    const tree = shallow(<LoadingSpinner/>);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

});
