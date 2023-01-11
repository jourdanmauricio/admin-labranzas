import {useDispatch, useSelector} from 'react-redux';
import {serviceUpdProduct} from '@/services/api/products.api';
import {
	setAction,
	setProdLoading,
	editField,
	setProdError,
} from '@/store/product';

const useEditWeb = () => {
	const status = useSelector(state => state.product.status);
	const error = useSelector(state => state.product.error);

	const dispatch = useDispatch();

	const product = useSelector(state => state.product.product);
	const changedFields = useSelector(state => state.product.changedFields);

	const closeMessage = () => {
		setProdError({error: ''});
	};

	const handleChange = (field, value) => {
		const newData = {...product.prodWeb};
		newData[field] = value;

		dispatch(editField({field: 'prodWeb', value: newData}));
	};

	const handleSubmit = async () => {
		console.log('product', product);
		console.log('changedFields', changedFields);

		try {
			dispatch(setProdLoading());
			let bodyWeb = {...product.prodWeb};

			const resUpdate = await serviceUpdProduct(
				bodyWeb,
				product,
				'WEB',
				'PRODUCT'
			);
			console.log('resUpdate', resUpdate);

			dispatch(setAction({action: 'UPDATE-PRODUCT'}));
		} catch (error) {
			console.log('ERRRRRRRRRRRR', error);
			dispatch(setProdError({error}));
		}
	};

	return {
		status,
		error,
		closeMessage,
		handleSubmit,
		handleChange,
	};
};

export default useEditWeb;
