import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '../redux/configureStore';
import AboutUs from './../About Us/aboutus';

const store=configureStore();
test('renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><Provider store={store}><AboutUs></AboutUs></Provider></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
