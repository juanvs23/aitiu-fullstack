import { Link } from 'react-router-dom';
import Logo from '../assets/alogo-1.svg';
import styled from 'styled-components';

const HeaderWrpper = styled.div`
	z-index: 9999;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
`;
const HeaderComponent = () => {
	return (
		<HeaderWrpper className="bg-white shadow">
			<nav
				className="mx-auto  flex max-w-7xl items-center justify-center p-2 lg:p-2"
				aria-label="Global"
			>
				<div className="flex lg:flex-1 justify-center">
					<Link to="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img className="h-16 w-auto" src={Logo} alt="" />
					</Link>
				</div>
			</nav>
		</HeaderWrpper>
	);
};

export default HeaderComponent;
