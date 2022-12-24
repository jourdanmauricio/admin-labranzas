import {useEffect, useMemo, useState} from 'react';
import {
	deleteLocalProduct,
	getLocalProducts,
	serviceImportMl,
} from '../../services/api/products.api';
import {useModal} from '@/hooks/useModal';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {FaPlus, FaRegTrashAlt, FaEdit, FaDownload} from 'react-icons/fa';
import FilterComponent from '@/commons/Table/FilterTable';
import {useSelector} from 'react-redux';
import styles from './products.module.css';

const useProducts = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [action, setAction] = useState('INITIAL');
	const [data, setData] = useState([]);
	const dispatchNotif = useNotification();
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const [currentProd, setCurrentProd] = useState(null);
	const [dataToEdit, setDataToEdit] = useState(null);
	const [dataToDelete, setDataToDelete] = useState(null);
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [filterText, setFilterText] = useState('');
	const filteredItems = data.filter(
		item =>
			item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
	);

	const userMl = useSelector(state => state.userMl.userMl);
	const settings = useSelector(state => state.settings.settings);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const products = await getLocalProducts();
			setData(products);
			console.log('Products', products);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const importMlProducts = async () => {
		setLoading(true);
		console.log('inicio download');
		try {
			await serviceImportMl(userMl.id, settings);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
			await fetchProducts();
		}
	};

	const PRODUCTS_COLUMNS = [
		{
			name: 'Producto',
			id: 'title',
			cell: row => (
				<span>
					{row.prodMl?.id} - {row.title}
				</span>
			),
			sortable: true,
		},
		{
			name: 'Imagen',
			width: '122px',
			cell: row => <img src={row.thumbnail} alt={row.prodMl?.id} />,
		},
		{
			name: 'SKU',
			width: '150px',
			// selector: row => row.seller_custom_field,
			cell: row => <span>{row.seller_custom_field}</span>,
		},
		{
			name: 'Precio',
			id: 'price',
			width: '160px',
			cell: row => (
				<div className={styles.table__price}>
					<p>Loc: </p>
					<span>{row.price}</span>
					<p>Ml:</p>
					<span>{row.prodMl?.price}</span>
					<p>Web:</p>
					<span>{row.prodWeb?.price}</span>
				</div>
			),
			sortable: true,
		},
	];

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<>
				<FilterComponent
					onFilter={e => setFilterText(e.target.value)}
					onClear={handleClear}
					filterText={filterText}
				/>
				{/* className='btn btn__primary'> */}
				<button className='icon__button' onClick={importMlProducts}>
					<FaDownload /> ML
				</button>
				<button className='icon__button' onClick={() => setAction('SEARCH')}>
					<FaPlus />
				</button>
			</>
		);
	}, [filterText, resetPaginationToggle]);

	const handleAction = (prod, action) => {
		console.log('Action', action);
		console.log('Prod', prod);
		setAction(action);
		setCurrentProd(prod);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const closeMessage = () => {
		setError(false);
	};

	const editData = data => {
		console.log('Edit: ', data);
		// setDataToEdit(data);
		// 	openModalEdit();
		// 	setAction('EDIT');
	};

	const deleteData = data => {
		setDataToDelete(data);
		openModal();
		setAction('DELETE');
	};

	const handleAddProduct = newProduct => {
		setData([newProduct, ...data]);
		dispatchNotif({
			type: 'SUCCESS',
			message: 'Categoría creada!',
		});
	};

	// const handleEdit = async editData => {
	// 	try {
	// 		closeModalEdit();
	// 		setLoading(true);
	// 		const obj = {
	// 			description_web: editData.description_web,
	// 		};
	// 		const res = await putCategory(editData.id, obj);
	// 		dispatchNotif({
	// 			type: 'SUCCESS',
	// 			message: 'Categoría modificada!',
	// 		});

	// 		let newData = data.map(el => (el.id === res.id ? res : el));
	// 		setData(newData);
	// 	} catch (err) {
	// 		dispatchNotif({
	// 			type: 'ERROR',
	// 			message: 'Error modificando la categoría',
	// 		});
	// 		setError(err);
	// 	} finally {
	// 		setLoading(false);
	// 		setAction(null);
	// 	}
	// };

	const handleDelete = async id => {
		try {
			setLoading(true);
			await deleteLocalProduct(id);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Producto eliminado!',
			});
			let newData = data.filter(el => el.id !== id);
			setData(newData);
			setDataToDelete(null);
		} catch (err) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error eliminando el producto',
			});
			setError(err);
		} finally {
			setLoading(false);
			setAction(null);
			closeModal();
		}
	};

	const handleCancel = () => {
		setDataToDelete(null);
		closeModal();
		setDataToEdit(null);
		// closeModalEdit();
		setAction(null);
	};

	return {
		loading,
		error,
		PRODUCTS_COLUMNS,
		filteredItems,
		action,
		currentProd,
		closeMessage,
		handleCancel,
		handleDelete,
		handleAddProduct,
		handleAction,
		// importMlProducts,
		subHeaderComponentMemo,
	};
};

export default useProducts;
