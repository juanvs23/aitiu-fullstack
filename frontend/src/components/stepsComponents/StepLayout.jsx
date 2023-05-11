import {
	UserIcon,
	IdentificationIcon,
	DocumentArrowUpIcon,
	CheckIcon,
} from '@heroicons/react/24/outline';
import styled from 'styled-components';

import StepButtons from './StepButtons';

const StepLayoutWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	gap: 10px;
	align-items: center;
`;

export const steps = [
	{
		stepNumber: 1,
		stepName: 'Perfil',
		icon: <UserIcon />,
	},
	{
		stepNumber: 2,
		stepName: 'Información',
		icon: <IdentificationIcon />,
	},
	{
		stepNumber: 3,
		stepName: 'Carga de documentos',
		icon: <DocumentArrowUpIcon />,
	},
	{
		stepNumber: 4,
		stepName: 'Registro completado',
		icon: <CheckIcon />,
	},
];
const StepLayout = () => {
	return (
		<StepLayoutWrapper>
			{steps.map((step, index) => (
				<StepButtons
					key={step.stepNumber}
					stepNumber={step.stepNumber}
					title={step.stepName}
					icon={step.icon}
				/>
			))}
		</StepLayoutWrapper>
	);
};

export default StepLayout;
