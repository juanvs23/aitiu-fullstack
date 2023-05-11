import { Link } from 'react-router-dom';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import styled from 'styled-components';

const ThankyouWrapper = styled.div`
	min-height: 40vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ThankyouComponent = () => {
	return (
		<ThankyouWrapper>
			<div className="thank-container">
				<FaceSmileIcon className="text-sky-600 mx-auto h-36" />
				<h2 className="text-center text-sky-600 font-black text-2xl lg:text-5xl pb-2">
					Gracias por registrarse!
				</h2>
				<h3 className="text-center text-slate-900 font-medium text-lg">
					Al completar el formulario puede acceder a todo el contenido
				</h3>
				<Link className="w-full flex justify-center mt-5" to="/">
					<button className="text-center bg-sky-500 hover:bg-sky-600 mx-auto rounded-md text-white p-2 pl-6 pr-6  font-medium text-lg">
						Ir al inicio
					</button>
				</Link>
			</div>
		</ThankyouWrapper>
	);
};

export default ThankyouComponent;
