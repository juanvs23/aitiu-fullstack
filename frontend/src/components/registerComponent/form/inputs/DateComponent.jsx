import { useEffect, useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import {
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';

import styled from 'styled-components';

const InputWrapper = styled.div``;
const DateTitle = styled.div`
	position: relative;
	h3 {
	}
	.closer {
		position: absolute;
		right: 0px;
		width: 30px;
		height: 30px;
		top: -4px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		svg {
			width: 30px;
		}
	}
`;
/**
 * 
classInput={`${className}${errorAlert}`}
						id={id}
						name={id}
						error={inputErrror}
						setInputError={setInputError}
						minDateValue={minDate}
						maxDateValue={maxDate}
						baseValue={info[id]}
						classLabel={classLabel}
						trigger={trigger}
 */
const DateComponent = ({
	id,
	trigger,
	name,
	error,
	setInputError,
	classLabel,
	info,
	label,
	classInput,
	baseValue,
	defaultValue,
	minDateValue,
	maxDateValue,
	textError,
}) => {
	const minDate = minDateValue ? new Date(minDateValue) : new Date('1950-01-01');
	const maxDate = maxDateValue ? new Date(maxDateValue) : new Date('2030-01-01');
	const defaultDate = defaultValue ? new Date(defaultValue) : new Date();
	// Options
	const base = { year: 'numeric', month: 'numeric', day: 'numeric' };
	const options = {
		title: (
			<DateTitle>
				<h3 className="dark:text-white">Selecciona una fecha</h3>
				<div
					className="closer bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200"
					onClick={e => {
						e.stopPropagation();
						setShow(false);
					}}
				>
					<XMarkIcon className="w-5" />
				</div>
			</DateTitle>
		),
		autoHide: true,
		todayBtn: false,
		clearBtn: true,
		maxDate,
		minDate,
		theme: {
			background: 'bg-gray-100 dark:bg-gray-300',
			todayBtn: '',
			clearBtn: '',
			icons: '',
			text: 'text-black dark:text-white',
			disabledText: 'bg-red-500',
			input: '',
			inputIcon: '',
			selected: '',
		},
		icons: {
			// () => ReactElement | JSX.Element
			prev: () => <ChevronLeftIcon className="w-5" />,
			next: () => <ChevronRightIcon className="w-5" />,
		},
		weekDays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
		datepickerClassNames: 'fixed top-20',
		defaultDate,
		language: 'sp',
	};
	// states
	const [show, setShow] = useState(false);
	const [selectedDate, setSelectedDate] = useState(baseValue);

	// hamdlers
	const handleChange = selectedDate => {
		const date = new Date(selectedDate);

		let day = parseInt(date.getDate()) > 9 ? date.getDate() : `0${parseInt(date.getDate())}`,
			month =
				parseInt(date.getMonth() + 1) > 9
					? date.getMonth() + 1
					: `0${parseInt(date.getMonth() + 1)}`,
			year = date.getFullYear();

		setSelectedDate(`${day}/${month}/${year}`);
		// console.log(new Date(selectedDate).toLocaleDateString('es-ES', base));
		trigger({ ...info, [id]: `${day}/${month}/${year}` });
	};
	const handleClose = state => {
		setShow(state => !state);
	};
	const handlerfocus = e => {
		setShow(true);
	};
	return (
		<InputWrapper>
			<Datepicker
				classNames="w-full"
				options={options}
				onChange={handleChange}
				show={show}
				setShow={handleClose}
			>
				<div className={`${classInput} flex`}>
					<div className="flex">
						<CalendarIcon onClick={setShow} className="w-5" />
					</div>
					<input
						type="text"
						name={id}
						className={classInput}
						placeholder="DD/MM/AAAA"
						readOnly
						id={id}
						onFocus={handlerfocus}
						value={selectedDate}
					/>
				</div>
			</Datepicker>
			<label className={classLabel} htmlFor={id}>
				{label}
				{textError}
			</label>
		</InputWrapper>
	);
};

export default DateComponent;
