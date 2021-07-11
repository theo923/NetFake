import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Navigation } from '../Navigation';

Enzyme.configure({ adapter: new EnzymeAdapter()});

const setup = (props={}, state=null) => {
    return shallow(<Navigation {...props} />)
}

const findJSXByAttr = (name: string, wrapper: any) => {
    return wrapper.find(`[data-test="${name}"]`)
}

test('check if Navigation is abled to be rendered', () => {
    const wrapper = setup();
    const nav = findJSXByAttr('component-navigation', wrapper)
    expect(nav.length).toBe(1);
})
