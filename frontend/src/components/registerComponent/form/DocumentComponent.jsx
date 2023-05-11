import styled from 'styled-components';
import InputsComponent from './inputsComponent';
import { useEffect, useState } from 'react';
import { ButtonLayout, ButonComponent } from '../../index';

import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { hasProperties } from '../../../utils/utils';
import { useDispatch } from 'react-redux';
import { senData } from '../../../app/index';

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

const DocumentComponent = ({ info, setFormData, setStep, setProcess }) => {
	// state
	const { formData } = info;
	const [showButton, setshowButton] = useState(false);
	const [documentData, setdocumentData] = useState({
		documentURL: formData.documentURL,
		documentNumber: formData.documentNumber,
		expiredDocument: formData.expiredDocument,
	});

	// dispatch
	const dispatch = useDispatch();

	// useEffect
	useEffect(() => {
		if (hasProperties(documentData, ['documentURL', 'documentNumber', 'expiredDocument'])) {
			setshowButton(true);
			dispatch(setFormData({ ...info.formData, ...documentData }));
			dispatch(setProcess({ ...info.process, document: true }));
		}
	}, [documentData]);

	// handler
	const nextHandler = e => {
		dispatch(senData(formData));
	};
	const prevHandler = e => {
		dispatch(setStep(2));
	};

	// render
	return (
		<ProfileWrapper>
			<div className="p-2 w-full border-b-1 border-sky-300 pb-5">
				<h2 className="text-2xl lg:text-3xl text-center font-bold text-gray-800">
					Carga de documentos
				</h2>
			</div>

			<div className="container md:flex">
				<div className="w-full p-1 mt-3">
					<InputsComponent
						type={'image'}
						label={'Imagen del documento'}
						id={'documentURL'}
						trigger={setdocumentData}
						info={documentData}
						classLabel="font-bold text-sky-400 flex text-sm pt-2 w-full border-t-1 border-t-sky-400"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
					/>
				</div>
			</div>
			<div className="container md:flex">
				<div className="w-full p-1 mt-3">
					<InputsComponent
						type={'text'}
						label={'Numero de identificacion'}
						id={'documentNumber'}
						trigger={setdocumentData}
						info={documentData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
					/>
				</div>
			</div>
			<div className="container md:flex">
				<div className="w-full p-1 mt-3">
					<InputsComponent
						type={'date'}
						label={'Fecha de vencimiento'}
						id={'expiredDocument'}
						trigger={setdocumentData}
						info={documentData}
						classLabel="font-bold text-sky-400 text-sm"
						className="w-full h-8 outline-0 transition-all pl-2 pr-2 duration-200 focus:border-b-sky-800  border-0 border-b-1 border-b-sky-400"
						defaultValue={'2023-01-02'}
						minDate={'2023-01-01'}
						maxDate={'2035-01-01'}
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
							show={showButton}
							action={nextHandler}
							title={'Enviar'}
							postIcon={<ArrowRightIcon className="w-5 h-5" />}
						/>
					}
				/>
			</div>
		</ProfileWrapper>
	);
};

export default DocumentComponent;
