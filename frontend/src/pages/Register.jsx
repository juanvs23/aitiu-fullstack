import { Layout, StepLayout, RegisterLayout } from '../components';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { steps } from '../components';
import Confetti from 'react-confetti';

const RegisterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
	padding: 1rem;
	gap: 5px;
`;

const RegisterComponent = () => {
	const step = useSelector(state => state.register.step);
	const confetti = steps.length === step && <Confetti className="confetti" />;
	return (
		<Layout title={'Register'}>
			<RegisterWrapper>
				<div className="title-content p-2 pb-3 border-b-1 border-slate-900 m-b-3">
					<h1 className="text-center lg:text-3xl text-2xl font-bold text-sky-500">
						Crear registro
					</h1>
				</div>
				<StepLayout />
				<RegisterLayout />
			</RegisterWrapper>
			{confetti}
		</Layout>
	);
};

export default RegisterComponent;
