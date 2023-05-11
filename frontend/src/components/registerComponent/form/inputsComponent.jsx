import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import styled from 'styled-components';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { emailVerifity } from '../../../app/index';
import { UploaderComponent, DateComponent } from './inputs/index';

const InputWrapper = styled.div`
	input {
		&:focus {
			outline: none;
			box-shadow: none;
		}
	}
	position: relative;
	.error {
		border-color: #b91c1c;
	}
	.PhoneInputInput {
		background: transparent;
		outline: 0px;
		border: none;
	}
	.text-error {
		color: #b91c1c;
	}
	.react-datepicker__input-container {
		border-bottom: 1px solid #38bdf8;
		input[type='text'] {
			color: #38bdf8;
			padding: 0 8px;
			outline: 0 !important;
		}
	}
	.react-datepicker-popper {
		z-index: 14;
	}
	.loadIcon {
		position: absolute;
		width: 23px;
		right: 8px;
		top: 7px;
	}
`;

const InputsComponent = ({
	label,
	type,
	trigger,
	info,
	id,
	className,
	classLabel,
	minCharacter = null,
	maxCharacter = null,
	defaultValue = null,
	maxDate = null,
	minDate = null,
}) => {
	const dispatch = useDispatch();
	const selector = useSelector(state => state.register);
	const { loading, emailVerified } = selector;
	const [content, setcontent] = useState(info[id]);
	const [inputErrror, setInputError] = useState({ error: false, message: '' });
	const handlerfocus = e => {
		setInputError({ error: false, message: '' });
	};
	const handlerBlur = () => {
		if (content === '') {
			setInputError({ error: true, message: 'Este campo No puede quedar vacio' });
		} else if (type == 'email' && !content.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			setInputError({ error: true, message: 'Correo invalido' });
		} else {
			if (type === 'email') {
				dispatch(emailVerifity(content));
			}
			if (type === 'phone' && !content.match(/^\+\d{1,3}\d{6,14}$/)) {
				setInputError({ error: true, message: 'Formato de telefono invalido' });
			}

			if (minCharacter && content.length < minCharacter) {
				setInputError({
					error: true,
					message: `El campo debe tener al menos ${minCharacter} caracteres`,
				});
			} else if (maxCharacter && content.length > maxCharacter) {
				setInputError({
					error: true,
					message: `El campo debe tener maximo ${maxCharacter} caracteres`,
				});
			} else {
				trigger({ ...info, [id]: content });
			}
		}
	};
	const errorAlert = inputErrror.error ? ' error' : '';
	const textError = inputErrror.error && (
		<span className="text-red-700 transition-all duration-300"> - {inputErrror.message}</span>
	);
	const loadIcon = loading && <ArrowPathIcon className="loadIcon text-sky-400 animate-spin" />;
	switch (type) {
		case 'email':
			return (
				<InputWrapper>
					<input
						type="email"
						className={`${className}${errorAlert}`}
						id={id}
						name={id}
						onFocus={handlerfocus}
						value={content}
						onBlur={handlerBlur}
						onChange={e => {
							setcontent(e.target.value);
						}}
					/>
					<label className={classLabel} htmlFor={id}>
						{label}
						{textError}
					</label>
					{loadIcon}
				</InputWrapper>
			);
			break;
		case 'phone':
			return (
				<InputWrapper>
					<PhoneInput
						className={`${className}${errorAlert}`}
						id={id}
						name={id}
						flags={flags}
						value={content}
						onChange={setcontent}
						onFocus={handlerfocus}
						onBlur={handlerBlur}
					/>
					<label className={classLabel} htmlFor={id}>
						{label}
						{textError}
					</label>
				</InputWrapper>
			);
			break;
		case 'image':
			return (
				<InputWrapper>
					<UploaderComponent
						className={`${className}${errorAlert}`}
						id={id}
						name={id}
						content={content}
						setcontent={setcontent}
						label={label}
						info={info}
						trigger={trigger}
						textError={textError}
						classLabel={classLabel}
					/>
				</InputWrapper>
			);
			break;
		case 'date':
			return (
				<InputWrapper>
					<DateComponent
						type="text"
						classInput={`${className}${errorAlert}`}
						id={id}
						name={id}
						error={inputErrror}
						setInputError={setInputError}
						minDateValue={minDate}
						maxDateValue={maxDate}
						baseValue={info[id]}
						info={info}
						defaultValue={defaultValue}
						classLabel={classLabel}
						trigger={trigger}
						label={label}
						textError={textError}
					/>
				</InputWrapper>
			);
			break;
		default:
			return (
				<InputWrapper>
					<input
						type="text"
						className={`${className}${errorAlert}`}
						id={id}
						name={id}
						onChange={e => {
							setcontent(e.target.value);
						}}
						onFocus={handlerfocus}
						onBlur={handlerBlur}
						value={content}
					/>
					<label className={classLabel} htmlFor={id}>
						{label}
						{textError}
					</label>
				</InputWrapper>
			);
			break;
	}
};

export default InputsComponent;
