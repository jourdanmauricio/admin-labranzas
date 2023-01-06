import {useDispatch, useSelector} from 'react-redux';
import styles from './variationsTable.module.css';
import {useEffect, useRef, useState} from 'react';
import {FaRegTrashAlt, FaRegWindowClose} from 'react-icons/fa';
import {editField} from '@/store/product';
import Tags from '../Images/Tags';

const ImagesVar = ({data, handleAction}) => {
	const product = useSelector(state => state.product.product);
	const [pictures, setPictures] = useState([]);
	const dispatch = useDispatch();
	const dragItem = useRef(null);
	const dragOverItem = useRef(null);

	useEffect(
		() => {
			let variation = product.variations.find(vari => vari.id === data.id);
			let images = variation?.picture_ids.map(varPic =>
				product.pictures.find(prodPic => prodPic.id === varPic)
			);
			console.log('Data', data);
			console.log('Images', images);

			setPictures(images);
		},
		// [data]
		[product.variations]
	);

	const handleSort = () => {
		let _pictures = [...pictures];
		const draggedItemContent = _pictures.splice(dragItem.current, 1)[0];
		_pictures.splice(dragOverItem.current, 0, draggedItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		const picture_ids = [];
		_pictures.forEach(pic => picture_ids.push(pic.id));

		let variations = [...product.variations].map(prodVar =>
			prodVar.id === data.id
				? {...data, picture_ids, action: 'UPDATE'}
				: prodVar
		);
		dispatch(editField({field: 'variations', value: variations}));
	};

	const handleDelete = index => {
		const id = pictures[index].id;
		let inOtherVar = false;
		product.variations.forEach(vari => {
			const inOtherVarIndex = vari.picture_ids.findIndex(
				varPic => varPic === id && vari.id !== data.id
			);
			if (inOtherVarIndex !== -1) {
				inOtherVar = true;
				return;
			}
		});

		if (!inOtherVar) {
			const prodPics = product.pictures.filter(pic => pic.id !== id);
			dispatch(editField({field: 'pictures', value: prodPics}));
		}

		let _pictures = [...pictures];
		_pictures.splice(index, 1);
		const picture_ids = [];
		_pictures.forEach(pic => picture_ids.push(pic.id));

		let variations = [...product.variations].map(prodVar =>
			prodVar.id === data.id
				? {...data, picture_ids, action: 'UPDATE'}
				: prodVar
		);
		dispatch(editField({field: 'variations', value: variations}));
	};

	const handleAddPicture = picture => {
		const index = product.pictures.findIndex(
			prodPic => prodPic.id === picture.id
		);
		if (index === -1) {
			const prodPic = [...product.pictures, picture];
			dispatch(editField({field: 'pictures', value: prodPic}));
		}
		let _pictures = [...pictures, picture];
		const picture_ids = [];

		_pictures.forEach(pic => picture_ids.push(pic.id));

		let variations = [...product.variations].map(prodVar =>
			prodVar.id === data.id
				? {...data, picture_ids, action: 'UPDATE'}
				: prodVar
		);
		dispatch(editField({field: 'variations', value: variations}));
	};

	return (
		<>
			<div className='container'>
				<h2 className='title'>Imágenes de la variación</h2>
				<button
					onClick={() => handleAction('VARIATIONS', null)}
					className='modal-close'>
					<FaRegWindowClose />
				</button>
				<hr />
				<div className={` ${styles.list__container}`}>
					{pictures?.map((picture, index) => (
						<div
							className={styles.list__img}
							key={index}
							draggable
							onDragStart={() => (dragItem.current = index)}
							onDragEnter={() => (dragOverItem.current = index)}
							onDragOver={e => e.preventDefault()}
							onDragEnd={handleSort}>
							<img
								className={styles.list__item}
								src={picture.secure_url}
								alt=''
							/>
							<FaRegTrashAlt
								className={styles.item__delete}
								onClick={() => handleDelete(index)}
								color={'red'}
								size={18}
							/>
						</div>
					))}
				</div>
			</div>
			<div className='container'>
				<h2 className='title'>Agregar Imágenes</h2>
				<Tags handleAddPicture={handleAddPicture} />
			</div>
		</>
	);
};

export default ImagesVar;
