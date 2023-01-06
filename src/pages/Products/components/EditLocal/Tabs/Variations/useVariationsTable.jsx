import {
	FaChevronLeft,
	FaChevronRight,
	FaRegImages,
	FaRegTrashAlt,
	FaRegListAlt,
} from 'react-icons/fa';
import {descriptionVariation} from '@/helpers/helpFunctions';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';
import styles from './variationsTable.module.css';

const useVariationsTable = () => {
	const [action, setAction] = useState('VARIATIONS');
	const [currentVar, setCurrentVar] = useState(null);
	const [variations, setVariations] = useState([]);
	const dispatch = useDispatch();

	const product = useSelector(state => state.product.product);

	useEffect(() => {
		let variations = product.variations.map(vari => ({...vari, indexPic: 0}));
		setVariations(variations);
		// setAction('VARIATIONS');
	}, [product.variations]);

	const handleChangeImg = (vari, direction) => {
		const maxPictures = vari.picture_ids.length - 1;
		if (direction === 'LEFT' && vari.indexPic === 0) {
			vari.indexPic = maxPictures;
		} else if (direction === 'RIGTH' && vari.indexPic === maxPictures) {
			vari.indexPic = 0;
		} else {
			direction === 'LEFT' ? vari.indexPic-- : vari.indexPic++;
		}

		let newData = variations.map(el => (el.id === vari.id ? vari : el));
		setVariations(newData);
	};

	const handleChangeQuantity = (varId, value) => {
		const newVariations = variations.map(vari =>
			vari.id === varId
				? {...vari, available_quantity: parseInt(value), action: 'UPDATE'}
				: vari
		);

		dispatch(editField({field: 'variations', value: newVariations}));

		const prodQuantity = newVariations.reduce(
			(acc, item) => acc + parseInt(item.available_quantity),
			0
		);

		dispatch(editField({field: 'available_quantity', value: prodQuantity}));
	};

	const deleteData = row => {
		let delPics = [];
		row.picture_ids.forEach(pic => {
			let inOtherVar = false;
			product.variations.forEach(vari => {
				const inOtherVarIndex = vari.picture_ids.findIndex(
					varPic => varPic === pic && vari.id !== row.id
				);
				if (inOtherVarIndex !== -1) {
					inOtherVar = true;
					return;
				}
			});
			if (!inOtherVar) delPics.push(pic);
		});
		const newVariations = variations.filter(vari => vari.id !== row.id);
		dispatch(editField({field: 'variations', value: newVariations}));

		const prodPics = product.pictures.filter(pic => !delPics.includes(pic.id));
		dispatch(editField({field: 'pictures', value: prodPics}));
	};

	const handleAction = (action, row) => {
		console.log('action', action);
		console.log('row', row);
		setAction(action);
		setCurrentVar(row);
	};

	const VARIATIONS_COLUMNS = [
		{
			name: 'Id',
			id: 'id',
			selector: row => row.id,
			sortable: true,
		},
		{
			name:
				product.variations.length > 0
					? descriptionVariation(product.variations[0])[0]
					: '',
			id: 'variation',
			cell: row => descriptionVariation(row)[1],
		},
		{
			name: 'Cantidad',
			id: 'available_quantity',
			cell: row => {
				return (
					// <span>{row.available_quantity}</span>
					<input
						className='form__input'
						type='text'
						value={row.available_quantity}
						onChange={e => handleChangeQuantity(row.id, e.target.value)}
					/>
				);
			},
		},
		{
			name: 'Imágenes',
			id: 'pictures',
			cell: row => {
				const found = product.pictures.find(
					prodPic => prodPic.id === row.picture_ids[row.indexPic]
				);
				return (
					<div className={styles.table__images}>
						<FaChevronLeft
							className={styles.images__icon}
							onClick={() => handleChangeImg(row, 'LEFT')}
						/>

						<img className={styles.image__var} src={found.secure_url} />
						<FaChevronRight
							className={styles.images__icon}
							onClick={() => handleChangeImg(row, 'RIGTH')}
						/>
					</div>
				);
			},
		},
		{
			name: 'Acciones',
			id: 'actions',
			cell: row => (
				<div>
					<button
						onClick={() => deleteData(row)}
						className='table__icon table__icon--delete'>
						<FaRegTrashAlt />
					</button>
					<button
						onClick={() => handleAction('ATTRIBUTES', row)}
						className='table__icon table__icon--edit'>
						<FaRegListAlt />
					</button>
					<button
						onClick={() => handleAction('IMAGES', row)}
						className='table__icon table__icon--edit'>
						<FaRegImages />
					</button>
				</div>
			),
		},
	];
	return {VARIATIONS_COLUMNS, variations, action, handleAction, currentVar};
};

export default useVariationsTable;
