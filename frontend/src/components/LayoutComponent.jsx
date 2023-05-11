import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import FoorterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';

const LayoutWrapper = styled('div')`
	main {
		min-height: 100vh;
		width: 100%;
		padding: 5rem 0;
	}
	header {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
	footer {
		width: 100%;
		position: fixed;
		width: 100%;
		max-height: 96px;
		bottom: 0;
		left: 0;
	}
	.confetti {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
`;
const LayoutComponent = ({ children, title }) => {
	const textTitle = title ? `${title} | AITIU` : 'index';
	return (
		<LayoutWrapper>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{textTitle}</title>
				<link rel="canonical" href={window.location.href} />
			</Helmet>

			<HeaderComponent />
			<main className="flex justify-center items-center bg-slate-500">
				<div className="container m-3 bg-white rounded-md shadow-lg">{children}</div>
			</main>
			<FoorterComponent />
		</LayoutWrapper>
	);
};
export default LayoutComponent;
