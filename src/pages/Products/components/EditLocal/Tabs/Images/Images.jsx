import {useDispatch, useSelector} from 'react-redux';
import styles from './images.module.css';
import {useRef} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import {editField} from '@/store/product';
import Tags from './Tags';

const Images = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();
	const dragItem = useRef(null);
	const dragOverItem = useRef(null);

	// const handle drag sorting
	const handleSort = () => {
		// Duplicate items
		let _pictures = [...product.pictures];
		// Remove and save the dragged item content
		const draggedItemContent = _pictures.splice(dragItem.current, 1)[0];
		// Switch the position
		_pictures.splice(dragOverItem.current, 0, draggedItemContent);
		// Reset th position ref
		dragItem.current = null;
		dragOverItem.current = null;
		// update the actual array
		dispatch(editField({field: 'pictures', value: _pictures}));
	};

	const handleDelete = index => {
		let _pictures = [...product.pictures];
		_pictures.splice(index, 1);
		dispatch(editField({field: 'pictures', value: _pictures}));
	};

	const handleAddPicture = picture => {
		let _pictures = [...product.pictures, picture];
		dispatch(editField({field: 'pictures', value: _pictures}));
	};

	return (
		<>
			<div className={styles.list__container}>
				{product.pictures.map((picture, index) => (
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

			<Tags handleAddPicture={handleAddPicture} />
		</>
	);
};

export default Images;
