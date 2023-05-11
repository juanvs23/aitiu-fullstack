/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
		'./node_modules/tailwind-datepicker-react/dist/**/*.js',
	],
	theme: {
		extend: {
			minWidth: {
				'1/2': '50%',
				12: '97%',
			},
			borderWidth: {
				1: '1px',
			},
			fontSize: {
				0: '0px',
			},
			aspectRatio: {
				'4/3': '4 / 3',
				'3/4': '3 / 4',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
