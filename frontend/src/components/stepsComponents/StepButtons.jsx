import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setStep, setProcess } from '../../app/index';
import { hasProperties } from '../../utils/utils';

const StepButtonsContainer = styled.div`
	--tw-text-opacity: 1;
	justify-content: flex-start;
	align-items: center;
	gap: 5px;
	flex-direction: column;
	display: flex;
	min-width: 200px;
	max-width: 200px;
	text-align: center;

	.button-selector {
		width: 60px;
		padding: 15px;
		--tw-border-opacity: 1;
		border-color: rgb(15 23 42 / var(--tw-border-opacity));
		transition: all 0.4s;
		svg {
			path {
				color: rgb(15 23 42 / var(--tw-border-opacity));
			}
		}
	}
	&.active {
		h3.title-selector {
			color: rgb(14 165 233 / var(--tw-text-opacity));
		}
		.button-selector {
			--tw-border-opacity: 1;
			border-color: rgb(14 165 233 / var(--tw-text-opacity));
			background-color: rgb(14 165 233 / var(--tw-text-opacity));
			svg {
				path {
					color: white;
				}
			}
		}
	}
	@media (max-width: 767px) {
		min-width: 70px;
		max-width: 70px;
		h3.title-selector {
			font-size: 0;
		}
		.button-selector {
			width: 50px;
			padding: 10px;
		}
	}
	@media (min-width: 768px) and (max-width: 1023px) {
		min-width: 140px;
		max-width: 140px;
		h3.title-selector {
			font-size: 11px;
		}
		.button-selector {
			width: 50px;
			padding: 10px;
		}
	}
`;

const StepButtons = ({ title, stepNumber, icon }) => {
	const dispath = useDispatch();
	const selector = useSelector(state => state.register);
	const { profile, information, document, confirmation } = selector.formData;
	const activeSelector = selector.step >= stepNumber ? ' active' : '';
	const nextStep = stepNumer => {
		switch (stepNumer) {
			case 1:
				dispath(setStep(1));
				break;
			case 2:
				if (
					hasProperties(selector.formData, ['firstname', 'lastname', 'email', 'mobile'])
				) {
					dispath(setProcess({ ...selector.process, profile: true }));
					if (selector.process.profile) dispath(setStep(2));
				}
				break;
			case 3:
				if (
					hasProperties(selector.formData, [
						'firstname',
						'lastname',
						'email',
						'mobile',
						'curp',
						'rfc',
						'birthdate',
					])
				) {
					if (selector.process.document) dispath(setStep(stepNumer));
				}
				break;
			case 4:
				if (
					hasProperties(selector.formData, [
						'firstname',
						'lastname',
						'email',
						'mobile',
						'curp',
						'rfc',
						'birthdate',
						'documentURL',
						'documentNumber',
						'expiredDocument',
					])
				) {
					if (selector.process.confirmation) dispath(setStep(stepNumer));
				}
				break;
		}
	};
	return (
		<StepButtonsContainer className={activeSelector} style={{ zIndex: stepNumber }}>
			<button
				className={`button-selector rounded-full border-1 `}
				onClick={() => nextStep(stepNumber)}
			>
				{icon}
			</button>
			<h3 className={`title-selector font-semibold`} onClick={() => nextStep(stepNumber)}>
				{stepNumber} - {title}
			</h3>
		</StepButtonsContainer>
	);
};

export default StepButtons;
