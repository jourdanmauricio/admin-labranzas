import {useDispatch, useSelector} from 'react-redux';
import {
	editField,
	setAction,
	setProdError,
	setProdLoading,
} from '@/store/product';
import {useModal} from '@/hooks/useModal';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {serviceCreateWebProduct} from '@/services/api/products.api';
import {
	delLocalMlProduct,
	deleteWebProduct,
	serviceImportMlProduct,
} from '@/services/api/products.api';
import {useEffect} from 'react';

const useSystemsTable = () => {
	const dispatch = useDispatch();
	const dispatchNotif = useNotification();
	const [isOpenModal, openModal, closeModal] = useModal(false);

	const product = useSelector(state => state.product.product);
	const settings = useSelector(state => state.settings.settings);
	const userMl = useSelector(state => state.userMl.userMl);
	const action = useSelector(state => state.product.action);

	useEffect(() => {
		switch (action) {
			case 'DELETE-WEB':
			case 'DELETE-ML':
				openModal();
				break;
		}
	}, [action]);

	const migrateWeb = async () => {
		let currentProd = Object.assign({}, product);
		try {
			dispatch(setProdLoading());
			const newProdWeb = await serviceCreateWebProduct(currentProd, settings);
			currentProd.prodWeb = newProdWeb;
			dispatch(editField({field: 'prodWeb', value: newProdWeb}));
			dispatch(setAction({action: 'UPDATE-PRODUCT'}));
		} catch (error) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error migrando el producto',
			});
			dispatch(setProdError({error}));
		}
	};

	const importMlProduct = async () => {
		let currentProd = Object.assign({}, product);
		try {
			dispatch(setProdLoading());
			const mlProduct = await serviceImportMlProduct(userMl.id, currentProd);
			currentProd.prodMl = mlProduct;

			dispatch(editField({field: 'prodMl', value: mlProduct}));
			dispatch(setAction({action: 'UPDATE-PRODUCT'}));
		} catch (error) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error importando el producto',
			});
			dispatch(setProdError({error}));
		}
	};

	const handleConfirm = async () => {
		let currentProd = Object.assign({}, product);
		try {
			dispatch(setProdLoading());
			// let newData = [];
			switch (action) {
				case 'DELETE-WEB':
					await deleteWebProduct(currentProd.prodWeb.id);
					currentProd.prodWeb = null;

					dispatch(editField({field: 'prodWeb', value: null}));
					closeModal();

					dispatch(setAction({action: 'UPDATE-PRODUCT'}));
					break;
				case 'DELETE-ML':
					await delLocalMlProduct(currentProd.prodMl.id);
					currentProd.prodMl = null;
					dispatch(editField({field: 'prodMl', value: currentProd.prodMl}));
					dispatch(setAction({action: 'UPDATE-PRODUCT'}));

					break;
			}
		} catch (error) {
			closeModal();
			dispatchNotif({
				type: 'ERROR',
				message: 'Error eliminando el producto',
			});
			console.log('ERRRRRRRORRRRR', error);
			dispatch(setProdError({error}));
		}
	};

	const handleCancel = () => {
		console.log('handleCancel');
		dispatch(setAction({action: null}));
		closeModal();
	};

	return {
		migrateWeb,
		importMlProduct,
		handleConfirm,
		handleCancel,
		isOpenModal,
		closeModal,
	};
};

export default useSystemsTable;
