import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import image from './image-941.svg';
import { uploadImage } from '../../../../app/index';

/* value={content}
onChange={setcontent}
onFocus={handlerfocus}
onBlur={handlerBlur} */

const UploaderWrapper = styled.div`
	.uploader {
		display: grid;
		grid-template-columns: auto 25%;
		margin-bottom: 15px;
		gap: 5px;

		.uploder-area {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.uploader-image {
			img,
			iframe {
				height: 250px;
				margin: auto;
				object-fit: cover;
			}
		}
		@media (max-width: 767px) {
			display: flex;
			flex-direction: column-reverse;
			.uploder-area {
				height: 150px;
				padding: 10px;
				p {
					text-align: center;
				}
			}
		}
	}
`;

const ImagePreview = ({ url }) => {
	const baseUrl = url.split('.')[1];
	switch (baseUrl) {
		case 'pdf':
			return <iframe src={url} className="w-full aspect-[4/3] block" height={'100'} />;
			break;
		default:
			return <img src={url} className="w-full aspect-[4/3] block" />;
			break;
	}
};

const UploaderComponent = ({ classLabel, id, label, textError, content, info, trigger }) => {
	const dispatch = useDispatch();
	const { loading } = useSelector(state => state.register);
	const [file, setFiles] = useState(null);
	const [count, setCount] = useState(0);
	const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
		accept: {
			'image/png': [],
			'application/pdf': ['.pdf', '.PDF'],
		},
		maxFiles: 1,
		onDrop: async acceptedFiles => {
			const acceptedFile = acceptedFiles[0];
			const upload = await dispatch(uploadImage(acceptedFile));
			const { data } = upload.payload;
			const { url } = data;
			setFiles(url);
			trigger({ ...info, [id]: url });
		},
	});

	useEffect(() => {
		let interval = null;
		if (loading) {
			interval = setInterval(() => {
				setCount(count => {
					if (count < 99) {
						return count + 1;
					} else {
						clearInterval(interval);
						return count;
					}
				});
			}, 100);
		} else {
			clearInterval(interval);
			setCount(0);
		}
		return () => clearInterval(interval);
	}, [loading]);

	const bgDragAccept = isDragAccept ? 'bg-sky-500' : '';
	const bgDragReject = isDragReject ? 'bg-red-500' : '';
	const textDragAccept = isDragAccept || isDragReject ? 'text-white' : 'text-sky-500';
	const imageURL = content !== '' && file === null ? content : file !== null ? file : image;
	return (
		<UploaderWrapper>
			<div className="uploader">
				<div
					onDragEnter={() => {
						console.log('enter');
					}}
					{...getRootProps({
						className: `uploder-area rounded-md border-sky-500 border-2 cursor-pointer ${bgDragAccept}${bgDragReject}`,
					})}
				>
					<input {...getInputProps()} id={id} name={id} />
					<p className={`bold ${textDragAccept}`}>
						{isDragAccept || isDragReject
							? 'El archivo solo puede ser PDF o PNG'
							: 'Arrastre aquí y suelte o seleccione un archivo.'}
					</p>
				</div>

				<div
					className="uploader-image justify-center flex items-center rounded-md border-sky-500 border-2 "
					style={{ minHeight: '250px' }}
				>
					{loading ? (
						<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 ">
							<div
								className="bg-sky-700 h-2.5 rounded-full"
								style={{ width: `${count}%` }}
							></div>
						</div>
					) : (
						<ImagePreview url={imageURL} />
					)}
				</div>
			</div>

			<label className={classLabel} htmlFor={id}>
				{label}
			</label>
		</UploaderWrapper>
	);
};

export default UploaderComponent;
