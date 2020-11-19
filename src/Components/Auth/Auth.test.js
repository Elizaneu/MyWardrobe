import React from 'react';
import {configure, shallow} from 'enzyme';
import {Auth} from './Auth';
import Adapter from 'enzyme-adapter-react-16';

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
    const input = wrapper.find(`input[name='${inputSelector}']`);
    input.simulate('change', {
        target: {value: newValue},
    })
    return wrapper.find(inputSelector);
}

configure({ adapter: new Adapter() })

it('check submit button', () => {
    const wrapper = shallow(<Auth/>);

    const emailInput = simulateChangeOnInput(
        wrapper,
        'Email',
        'elizabneu@gmail.com',
    );

    expect(emailInput.props().value).toEqual('elizabneu@gmail.com');

    const passwordInput = simulateChangeOnInput(
        wrapper,
        'Password',
        'test0001',
    )
    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate('click');
})