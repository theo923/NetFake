import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Banner } from '../Banner';

Enzyme.configure({ adapter: new EnzymeAdapter()});

const setup = (props={}, state=null) => {
    return shallow(<Banner {...props} />)
}

const findJSXByAttr = (name: string, wrapper: any) => {
    return wrapper.find(`[data-test="${name}"]`);
}

test('check if Banner is abled to be rendered', () => {
    const wrapper = setup();
    const banner = findJSXByAttr('component-banner', wrapper)
    expect(banner.length).toBe(1);
})