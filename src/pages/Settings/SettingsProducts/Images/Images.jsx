import axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {putSettings} from '@/store/settings';
import ListImages from './components/ListImages';
import Loader from '@/commons/Loader-overlay/Loader-overlay';

import styles from './images.module.css';

const Images = ({updated}) => {
	const [dragActive, setDragActive] = useState(false);
	const [images, setImages] = useState([]);
	const dispatch = useDispatch();
	let {status} = useSelector(state => state.settings);
	let pictures = useSelector(state => state.settings.settings?.pictures);
	let userMl = useSelector(state => state.userMl.userMl);

	useEffect(() => {
		if (pictures.length > 0) setImages([...pictures]);
	}, [pictures]);

	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files);
		}
	};

	const handleChange = function (e) {
		e.preventDefault();
		setDragActive(false);
		if (e.target.files && e.target.files[0]) {
			handleFiles(e.target.files);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		let listImages = Array.from(images).filter(img =>
			Object.prototype.hasOwnProperty.call(img, 'id')
		);

		let newImages = Array.from(images).filter(
			img => !Object.prototype.hasOwnProperty.call(img, 'id')
		);

		let requests = newImages.map(file => {
			let formData = new FormData();

			formData.append('file', file);

			return axios
				.post('https://api.mercadolibre.com/pictures', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${userMl.access_token}`,
					},
				})
				.then(async res => {
					let pic = {
						id: res.data.id,
						// url: res.data.variations[0].url,
						name: file.name,
						size: res.data.variations[0].size,
						// quality: '',
						max_size: res.data.max_size,
						secure_url: res.data.variations[0].secure_url,
					};
					return pic;
				})
				.catch(err => {
					console.log('ERRRRRRRRRRRRRRRR', err);
					return 'Error';
				});
		});
		await Promise.all(requests).then(values => {
			values.forEach(value => {
				if (value != 'Error') {
					listImages.push(value);
				}
			});
			dispatch(putSettings({pictures: listImages}));
			updated();
		});
	};

	const handleFiles = files => {
		const newImages = Array.from(files).map(file => {
			file.secure_url = URL.createObjectURL(file);
			file.origen = 'new';
			return file;
		});
		setImages(images => [...images, ...newImages]);
	};

	return (
		<>
			<form className='pt' onSubmit={handleSubmit}>
				{status === 'loading' && <Loader />}
				<div
					className={
						!dragActive
							? styles.file__upload
							: `${styles.file__upload} ${styles.fileover}`
					}
					onDragEnter={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					onDragLeave={handleDrag}>
					<input
						onChange={handleChange}
						multiple
						className={styles.file}
						type='file'
					/>
					<h3>Drag and drop file here or</h3>
					<label className={styles.file__label}>Browse for file</label>
				</div>

				<br />

				<ListImages images={images} setImages={setImages} />

				<br />

				<div className='wide action'>
					<button
						className='btn btn__primary'
						type='submit'
						// disabled={isSubmitting}
					>
						Modificar
					</button>
				</div>
			</form>
		</>
	);
};

export default Images;
