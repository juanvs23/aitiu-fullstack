import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FormComponent from './FormComponent';
import ThankyouComponent from './ThankyouComponent';

const RegisterLayoutWrapper = styled.div``;
const RegisterLayout = () => {
	const { step, emailVerified } = useSelector(state => state.register);
	if (emailVerified) {
		return null;
	} else {
		return (
			<RegisterLayoutWrapper>
				{step >= 4 ? <ThankyouComponent /> : <FormComponent />}
			</RegisterLayoutWrapper>
		);
	}
};

export default RegisterLayout;
