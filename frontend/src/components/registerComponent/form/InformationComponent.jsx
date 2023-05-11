import styled from 'styled-components';
import InputsComponent from './inputsComponent';
import { useEffect, useState } from 'react';
import { ButtonLayout, ButonComponent } from '../../index';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { hasProperties } from '../../../utils/utils';
import { useDispatch } from 'react-redux';

const ProfileWrapper = styled.div`
	min-height: 40vh;
	max-width: 800px;
	min-width: 100%;
`;
/**
 *
 * @returns formData={formData} setFormData={setFormData}
 * {label, type, trigger, formInput}
 */
const InformationComponent = ({ info, setFormData, setStep, setProcess }) => {
	// state
	const { formData } = info;
	const [showButton, setshowButton] = useState(false);
	const [infomationData, setinfomationData] = useState({
		curp: formData.curp,
		rfc: formData.rfc,
		birthdate: formData.birthdate,
	});

	// dispatch
	const dispatch = useDispatch();

	// useEffect
	useEffect(() => {
		if (hasProperties(infomationData, ['curp', 'rfc', 'birthdate'])) {
			setshowButton(true);
		}
		console.log(infomationData);
	}, [infomationData]);

	// handler
	const nextHandler = e => {
		dispatch(setFormData({ ...info.formData, ...infomationData }));
		dispatch(setStep(3));
		dispatch(setProcess({ ...info.process, information: true }));
	};
	const prevHandler = e => {
		dispatch(setStep(1));
		dispatch(setFormData({ ...info.formData, ...infomationData }));
		dispatch(setProcess({ ...info.process, information: true }));
	};

	// render
	return (
		<ProfileWrapper>
			<div className="p-2 w-full border-b-1 border-sky-300 pb-5">
				<h2 className="text-2xl lg:text-3xl text-center font-bold text-gray-800">
					Información
				</h2>
			</div>
			<div className="container md:flex">
				<div className="w-full p-1 mt-3">
					<InputsComponent
						type={'text'}
						label={'CURP'}
						id={'curp'}
						trigger={setinfomationData}
						info={infomationData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
						minCharacter={18}
						maxCharacter={18}
					/>
				</div>
			</div>
			<div className="container md:flex">
				<div className="w-full p-1 mt-3">
					<InputsComponent
						type={'text'}
						label={'RFC'}
						id={'rfc'}
						trigger={setinfomationData}
						info={infomationData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
						minCharacter={18}
						maxCharacter={18}
					/>
				</div>
			</div>
			<div className="container md:flex">
				<div className="w-full p-1 mt-3">
					<InputsComponent
						type={'date'}
						label={'Fecha de nacimiento'}
						id={'birthdate'}
						trigger={setinfomationData}
						info={infomationData}
						defaultValue={'2005-01-01'}
						minDate={'1930-01-01'}
						maxDate={'2005-01-02'}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
					/>
				</div>
			</div>
			<div className="container md:flex">
				<ButtonLayout
					leftButton={
						<ButonComponent
							action={prevHandler}
							title={'Atrás'}
							preIcon={<ArrowLeftIcon className="w-5 h-5" />}
						/>
					}
					rightButton={
						<ButonComponent
							action={nextHandler}
							show={showButton}
							title={'Siguiente'}
							postIcon={<ArrowRightIcon className="w-5 h-5" />}
						/>
					}
				/>
			</div>
		</ProfileWrapper>
	);
};

export default InformationComponent;
