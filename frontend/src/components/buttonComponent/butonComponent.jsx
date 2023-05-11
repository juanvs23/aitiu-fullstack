import React from 'react';

const ButonComponent = ({ action, title, show = true, postIcon, preIcon }) => {
	const disabled = !show ? 'disabled:opacity-75 disabled:cursor-not-allowed' : '';
	return (
		<button
			disabled={!show}
			className={`bg-sky-500 p-3 pl-4 pr-4 leading-none rounded-lg hover:bg-sky-700 text-white flex justify-between align-center gap-2 duration-300 transition-all ${disabled}`}
			onClick={action}
		>
			{preIcon} {title} {postIcon}
		</button>
	);
};

export default ButonComponent;
