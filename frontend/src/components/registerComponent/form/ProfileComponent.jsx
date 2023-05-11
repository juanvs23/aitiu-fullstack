import styled from 'styled-components';
import InputsComponent from './inputsComponent';
import { useEffect, useState } from 'react';
import { ButtonLayout, ButonComponent } from '../../index';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
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
const ProfileComponent = ({ info, setFormData, setStep, setProcess }) => {
	// state
	const { formData } = info;
	const [showButton, setshowButton] = useState(false);
	const [profileData, setProfileData] = useState({
		firstname: formData.firstname || '',
		lastname: formData.lastname || '',
		email: formData.email || '',
		mobile: formData.mobile || '',
	});

	// dispatch
	const dispatch = useDispatch();

	// useEffect
	useEffect(() => {
		if (hasProperties(profileData, ['firstname', 'lastname', 'email', 'mobile'])) {
			setshowButton(true);
		}
	}, [profileData]);

	// handler
	const nextHandler = e => {
		dispatch(setFormData({ ...info.formData, ...profileData }));
		dispatch(setStep(2));
		dispatch(setProcess({ ...info.process, profile: true }));
	};

	// render
	return (
		<ProfileWrapper>
			<div className="p-2 w-full border-b-1 border-sky-300 pb-5">
				<h2 className="text-2xl lg:text-3xl text-center font-bold text-gray-800">Perfil</h2>
			</div>
			<div className="container md:flex">
				<div className="lg:w-1/2 w-full p-1 mt-3">
					<InputsComponent
						type={'text'}
						label={'Nombre'}
						id={'firstname'}
						trigger={setProfileData}
						info={profileData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
					/>
				</div>
				<div className="lg:w-1/2 w-full p-1 mt-3">
					<InputsComponent
						type={'text'}
						label={'Apellido'}
						id={'lastname'}
						trigger={setProfileData}
						info={profileData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
					/>
				</div>
			</div>
			<div className="container md:flex">
				<div className="lg:w-1/2 w-full p-1 mt-3">
					<InputsComponent
						type={'phone'}
						label={'Celular'}
						id={'mobile'}
						trigger={setProfileData}
						info={profileData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
					/>
				</div>
				<div className="lg:w-1/2 w-full p-1 mt-3">
					<InputsComponent
						type={'email'}
						label={'Correo electrónico'}
						id={'email'}
						trigger={setProfileData}
						info={profileData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
					/>
				</div>
			</div>
			<div className="container md:flex">
				<ButtonLayout
					leftButton={<></>}
					rightButton={
						<ButonComponent
							show={showButton}
							action={nextHandler}
							title={'Siguiente'}
							postIcon={<ArrowRightIcon className="w-5 h-5" />}
						/>
					}
				/>
			</div>
		</ProfileWrapper>
	);
};

export default ProfileComponent;
