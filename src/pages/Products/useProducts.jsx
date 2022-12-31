import {useEffect, useMemo, useState} from 'react';
import {
	getLocalProducts,
	serviceImportMlProducts,
	serviceCreateWebProduct,
	deleteMlProduct,
	deleteWebProduct,
	serviceImportMlProduct,
} from '@/services/api/products.api';
import {useModal} from '@/hooks/useModal';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {FaPlus, FaDownload} from 'react-icons/fa';
import FilterComponent from '@/commons/Table/FilterTable';
import {useDispatch, useSelector} from 'react-redux';
import {trad} from '@/helpers/helpTraduccion';
import {
	unsetProduct,
	setAction,
	setProduct,
	setProdError,
} from '@/store/product';
import styles from './products.module.css';

const useProducts = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const dispatchNotif = useNotification();
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [filterText, setFilterText] = useState('');
	const dispatch = useDispatch();
	const filteredItems = data.filter(
		item =>
			(item.title &&
				item.title.toLowerCase().includes(filterText.toLowerCase())) ||
			item.seller_custom_field
				.toLowerCase()
				.includes(filterText.toLowerCase()) ||
			item.prodMl.id.toLowerCase().includes(filterText.toLowerCase())
	);

	const userMl = useSelector(state => state.userMl.userMl);
	const settings = useSelector(state => state.settings.settings);
	const product = useSelector(state => state.product.product);
	const action = useSelector(state => state.product.action);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const products = await getLocalProducts();
			setData(products);
			console.log('Products', products);
		} catch (error) {
			setProdError({error, status: 'failed'});
		} finally {
			setLoading(false);
		}
	};

	const importMlProducts = async () => {
		setLoading(true);
		console.log('inicio download');
		try {
			await serviceImportMlProducts(userMl.id, settings);
		} catch (error) {
			setProdError({error, status: 'failed'});
		} finally {
			setLoading(false);
			await fetchProducts();
		}
	};

	const migrateWeb = async () => {
		let currentProd = Object.assign({}, product);
		console.log('product', product);
		try {
			setLoading(true);
			const newProdWeb = await serviceCreateWebProduct(currentProd, settings);
			currentProd.prodWeb = newProdWeb;
			let newData = data.map(el =>
				el.id === currentProd.id ? currentProd : el
			);
			setData(newData);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Producto migrado a la Web',
			});
		} catch (error) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error migrando el producto',
			});
			setProdError({error, status: 'failed'});
		} finally {
			handleCancel();
		}
	};

	const importMlProduct = async () => {
		console.log('import Ml prod', product);
		let currentProd = Object.assign({}, product);
		try {
			setLoading(true);
			const mlProduct = await serviceImportMlProduct(userMl.id, currentProd);
			currentProd.prodMl = mlProduct;

			let newData = data.map(el =>
				el.id === currentProd.id ? currentProd : el
			);
			setData(newData);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Producto importado desde ML',
			});
		} catch (error) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error importando el producto',
			});
			setProdError({error, status: 'failed'});
		} finally {
			handleCancel();
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
			cell: row => <span>{row.seller_custom_field}</span>,
		},
		{
			name: 'Estado',
			id: 'status',
			width: '160px',
			cell: row => (
				<div className={styles.table__price}>
					<p>Loc: </p>
					<span>{trad(row.status)}</span>
					<p>Ml:</p>
					<span>{trad(row.prodMl?.status)}</span>
					<p>Web:</p>
					<span>{trad(row.prodWeb?.status)}</span>
				</div>
			),
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
				<button className='icon__button'>
					{/* onClick={() => setAction('INITIAL')} */}
					<FaPlus />
				</button>
			</>
		);
	}, [filterText, resetPaginationToggle]);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		switch (action) {
			case 'MIGRATE-WEB':
				migrateWeb();
				break;
			case 'IMPORT-ML':
				importMlProduct();
				break;
			case 'DELETE-WEB':
			case 'DELETE-ML':
				openModal();
				break;
			case 'UPDATE-PRODUCT':
				updateProduct();
				break;
		}
	}, [action]);

	const closeMessage = () => {
		setProdError({error: '', status: 'success'});
	};

	const handleConfirm = async () => {
		console.log('handleConfirm', action, product);
		let currentProd = Object.assign({}, product);
		try {
			setLoading(true);
			let newData = [];
			switch (action) {
				case 'DELETE-WEB':
					await deleteWebProduct(currentProd.prodWeb.id);
					dispatchNotif({
						type: 'SUCCESS',
						message: 'Producto eliminado del canal Web',
					});
					currentProd.prodWeb = null;
					newData = data.map(el =>
						el.id === currentProd.id ? currentProd : el
					);
					setData(newData);
					break;
				case 'DELETE-ML':
					await deleteMlProduct(currentProd.prodMl.id);
					dispatchNotif({
						type: 'SUCCESS',
						message: 'Producto eliminado del canal Ml',
					});
					currentProd.prodMl = null;
					newData = data.map(el =>
						el.id === currentProd.id ? currentProd : el
					);
					setData(newData);
					break;
			}
		} catch (error) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error migrando el producto',
			});
			setProdError({error, status: 'failed'});
		} finally {
			handleCancel();
		}
	};

	const updateProduct = () => {
		console.log('Update ', product);
		dispatchNotif({
			type: 'SUCCESS',
			message: 'Producto modifcado',
		});

		const newData = data.map(el => (el.id === product.id ? product : el));
		setData(newData);
		handleCancel();
	};

	const handleCancel = () => {
		console.log('handleCancel');
		// dispatch(unsetProduct());
		dispatch(setAction({action: null}));
		closeModal();
		setLoading(false);
	};

	const expandRow = (bool, row) => {
		console.log('row', row);
		if (bool === true) {
			dispatch(setProduct({product: row}));
			dispatch(setAction({action: 'EXPANDED'}));
		} else {
			dispatch(unsetProduct());
		}
	};

	return {
		data,
		loading,
		PRODUCTS_COLUMNS,
		filteredItems,
		resetPaginationToggle,
		isOpenModal,
		closeModal,
		subHeaderComponentMemo,
		closeMessage,
		handleConfirm,
		handleCancel,
		expandRow,
	};
};

export default useProducts;
