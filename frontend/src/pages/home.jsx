import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { getVerified, resetRegister } from '../app/index';
import { Layout, Modal } from '../components';

const SendComponent = ({ open }) => {
	return (
		<div className="modal-contyainer bg-white p-5 rounded-lg shadow-md m-3 lg:min-w-[50%] min-w-12">
			<div className="container-icon">
				<InformationCircleIcon className="w-24 mx-auto text-sky-500" />
			</div>
			<h3 className="text-center font-semibold text-base lg:text-3xl ">
				Para poder visualizar la información de esta
				<br /> página es necesario terminar el registro.
			</h3>
			<div className="button-container w-full flex justify-center mt-4">
				<Link
					className="p-2 pl-4 pr-4 rounded-lg bg-sky-500 hover:bg-sky-700 text-white mx-auto  duration-300 transition-all"
					to={'/register'}
				>
					Continuar con Registro:
				</Link>
			</div>
		</div>
	);
};
const HomeComponent = () => {
	const [activeModal, setActiveModal] = useState(false);
	const { process } = useSelector(state => state.register);
	const dispatch = useDispatch();

	const showModal = activeModal && !process.confirmation && (
		<Modal>
			<SendComponent />
		</Modal>
	);
	useEffect(() => {
		dispatch(resetRegister());
		dispatch(getVerified());
		setTimeout(() => {
			setActiveModal(true);
		}, 1000);
	}, []);
	return <Layout title={'Home'}>HomeComponent{showModal}</Layout>;
};

export default HomeComponent;
