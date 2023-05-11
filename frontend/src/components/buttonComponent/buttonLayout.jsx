import styled from 'styled-components';

const ButtonWrapper = styled.div`
	display: block;
	min-width: 100%;
	margin-top: 1rem;
	.left-side,
	.right-side {
		width: 50%;
		display: flex;
		text-align: center;
	}
	.left-side {
		float: left;
		justify-content: flex-start;
	}
	.right-side {
		float: right;
		justify-content: flex-end;
	}
`;
const ButtonLayout = ({ leftButton, rightButton }) => {
	return (
		<ButtonWrapper>
			<div className="left-side">{leftButton}</div>
			<div className="right-side">{rightButton}</div>
		</ButtonWrapper>
	);
};

export default ButtonLayout;
