import React from 'react';
import { render, screen } from '@testing-library/react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../App';

Enzyme.configure({ adapter: new EnzymeAdapter()});

const setup = (props={}, state=null) => {
    return shallow(<App {...props} />)
}

test('check if App is abled to be rendered', () => {
  const wrapper = setup();
});
