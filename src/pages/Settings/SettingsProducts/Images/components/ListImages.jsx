import {useRef} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import './listImages.css';

const ListImages = ({images, setImages}) => {
	// save reference for dragItem and dragOverItem
	const dragItem = useRef(null);
	const dragOverItem = useRef(null);

	// const handle drag sorting
	const handleSort = () => {
		// Duplicate items
		let _images = [...images];
		// Remove and save the dragged item content
		const draggedItemContent = _images.splice(dragItem.current, 1)[0];
		// Switch the position
		_images.splice(dragOverItem.current, 0, draggedItemContent);
		// Reset th position ref
		dragItem.current = null;
		dragOverItem.current = null;
		// update the actual array
		setImages(_images);
	};

	const handleDelete = index => {
		console.log('Delete', index);
		let _images = [...images];
		_images.splice(index, 1);
		setImages(_images);
	};

	return (
		<>
			Lista de imagenes
			<div className='list__container'>
				{images.map((item, index) => (
					<div
						key={index}
						className='list__item'
						draggable
						onDragStart={() => (dragItem.current = index)}
						onDragEnter={() => (dragOverItem.current = index)}
						onDragOver={e => e.preventDefault()}
						onDragEnd={handleSort}>
						{/* <div>
							<FaBars size={22} />
						</div> */}
						<p>{item.name}</p>
						<p>{item.size}</p>
						<img
							className='list__image'
							src={item.secure_url}
							alt={item.name}
						/>
						<div style={{cursor: 'pointer'}}>
							<FaRegTrashAlt
								onClick={() => handleDelete(index)}
								color={'red'}
								size={22}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default ListImages;
