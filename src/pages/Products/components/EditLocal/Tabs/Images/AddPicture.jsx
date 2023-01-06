import axios from 'axios';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {FaPlus} from 'react-icons/fa';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import styles from './images.module.css';

const AddPicture = ({handleAddPicture}) => {
	const [dragActive, setDragActive] = useState(false);
	const [pictures, setPictures] = useState([]);
	const [loading, setLoading] = useState(false);
	let userMl = useSelector(state => state.userMl.userMl);

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

	const handleFiles = files => {
		console.log('handleFiles', files);
		const newImages = Array.from(files).map(file => {
			file.secure_url = URL.createObjectURL(file);
			file.origen = 'new';
			return file;
		});
		setPictures(pictures => [...pictures, ...newImages]);
	};

	const handleSubmit = async index => {
		let newImages = Array.from(pictures).filter(
			img => !Object.prototype.hasOwnProperty.call(img, 'id')
		);

		const file = newImages[index];
		let formData = new FormData();
		formData.append('file', file);

		setLoading(true);
		axios
			.post('https://api.mercadolibre.com/pictures', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${userMl.access_token}`,
				},
			})
			.then(async res => {
				let pic = {
					id: res.data.id,
					name: file.name,
					size: res.data.variations[0].size,
					max_size: res.data.max_size,
					secure_url: res.data.variations[0].secure_url,
				};
				handleAddPicture(pic);
				let _pictures = [...pictures];
				_pictures.splice(index, 1);
				setPictures(_pictures);
				setLoading(false);
			})
			.catch(err => {
				console.log('ERRRRRRRRRRRRRRRR', err);
				setLoading(false);
			});
	};

	return (
		<>
			{loading && <Loader />}
			<div className={styles.list__container}>
				{pictures?.map((picture, index) => (
					<div className={styles.list__img} key={index}>
						<img
							className={styles.list__item}
							src={picture.secure_url}
							alt=''
						/>
						<FaPlus
							className={styles.item__delete}
							onClick={() => handleSubmit(index)}
							color={'green'}
							size={18}
						/>
					</div>
				))}
			</div>
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
		</>
	);
};

export default AddPicture;
