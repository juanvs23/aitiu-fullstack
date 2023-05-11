import { useSelector } from 'react-redux';
import { Information, Document, Profile } from './form';
import { setFormData, setStep, setProcess } from '../../app/index';
import styled from 'styled-components';

const FormWrapper = styled.div`
	min-height: 40vh;
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
	max-width: 800px;
	margin: auto;
	padding: 15px;
	flex: 1;
	gap: 10px;
`;

const FormComponent = () => {
	const register = useSelector(state => state.register);
	const ProfileStep = register.step === 1 && (
		<Profile
			info={register}
			setFormData={setFormData}
			setStep={setStep}
			setProcess={setProcess}
		/>
	);
	const InformationStep = register.step === 2 && (
		<Information
			info={register}
			setFormData={setFormData}
			setStep={setStep}
			setProcess={setProcess}
		/>
	);
	const Documenttep = register.step === 3 && (
		<Document
			info={register}
			setFormData={setFormData}
			setStep={setStep}
			setProcess={setProcess}
		/>
	);
	return (
		<FormWrapper className="">
			{ProfileStep}
			{InformationStep}
			{Documenttep}
		</FormWrapper>
	);
};

export default FormComponent;
