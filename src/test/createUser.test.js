import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextField, Button, Typography } from '@material-ui/core';
import CreateUser from '../pages/components/CreateUser';

Enzyme.configure({ adapter: new Adapter() });
// const keys = ['a', 'b']
describe('CreateUser component unit test', () => {
  // let defaultProps
	// beforeEach(() => {
	// 	defaultProps = {
	// 		open: false,
	// 	}
	// })
	const wrapper = shallow(<CreateUser />)

	test('renders without an error', () => {
		expect(wrapper.exists()).toBe(true);
	})

	it('should render a <TextField />', () => {
		expect(wrapper.find(TextField)).toHaveLength(1);
	});

	it('should render a <Typography />', () => {
		expect(wrapper.find(Typography)).toHaveLength(1);
	});

	it('should render a <Button />', () => {
		expect(wrapper.find(Button)).toHaveLength(2);
	});

})
