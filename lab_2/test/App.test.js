import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import App from "../src/components/App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});


describe('App', () => {

  it('renders correctly', () => {
    const tree = shallow(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

});
