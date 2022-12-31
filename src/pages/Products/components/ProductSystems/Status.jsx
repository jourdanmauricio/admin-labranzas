import {useDispatch, useSelector} from 'react-redux';
import {
	setAction,
	editField,
	setProdLoading,
	setProdError,
} from '@/store/product';
import {serviceUpdProduct} from '@/services/api/products.api';

const Status = ({system}) => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	const getsystem = () => {
		switch (system) {
			case 'ML':
				return product.prodMl.status;
			case 'WEB':
				return product.prodWeb.status;
			case 'LOCAL':
				return product.status;
		}
	};

	const handleChange = async value => {
		try {
			dispatch(setProdLoading());

			const body = {
				status: value,
			};

			let res;
			switch (system) {
				case 'ML':
					res = await serviceUpdProduct(body, product, 'ML');
					dispatch(editField({field: 'prodMl', value: res}));
					break;
				case 'WEB':
					res = await serviceUpdProduct(body, product, 'WEB');
					dispatch(editField({field: 'prodWeb', value: res}));
					break;
				case 'LOCAL':
					res = await serviceUpdProduct(body, product, 'LOCAL');
					dispatch(editField({field: 'status', value: res.status}));
					break;
			}
			dispatch(setAction({action: 'UPDATE-PRODUCT'}));
		} catch (error) {
			dispatch(setProdError({error}));
			console.log(error);
		}
	};

	return (
		<>
			<select
				name='status'
				className='form__input'
				id='status'
				onChange={e => handleChange(e.target.value)}
				value={getsystem()}>
				<option value='active'>Activo</option>
				<option value='paused'>Pausado</option>
			</select>
		</>
	);
};

export default Status;
