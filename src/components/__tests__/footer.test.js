import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '../redux/configureStore';
import footer from './../Footer/footer';

const store=configureStore();
test('renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><Provider store={store}><footer/></Provider></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
