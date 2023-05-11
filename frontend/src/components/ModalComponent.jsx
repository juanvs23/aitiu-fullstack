import React from 'react';
import styled from 'styled-components';
const ModalWrapper = styled('div')`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Modal = ({ children, title, icon }) => {
	return <ModalWrapper>{children}</ModalWrapper>;
};
export default Modal;
