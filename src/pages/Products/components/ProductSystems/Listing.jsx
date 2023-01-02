import {useDispatch, useSelector} from 'react-redux';
import {
	setAction,
	editField,
	setProdLoading,
	setProdError,
} from '@/store/product';
import {serviceUpdProduct} from '@/services/api/products.api';

const Listing = ({system}) => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	const handleChange = async value => {
		try {
			dispatch(setProdLoading());
			let res;
			let body = {
				listing_type_id: value,
			};
			switch (system) {
				case 'ML':
					res = await serviceUpdProduct(body, product, 'ML', 'LISTING');
					dispatch(editField({field: 'prodMl', value: res}));
					break;
				case 'WEB':
					res = await serviceUpdProduct(body, product, 'WEB');
					dispatch(editField({field: 'prodWeb', value: res}));
					break;
				case 'LOCAL':
					await serviceUpdProduct(body, product, 'LOCAL');
					dispatch(editField({field: 'listing_type_id', value}));
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
			{system === 'ML' && (
				<select
					name='listing'
					className='form__input'
					id='listing'
					onChange={e => handleChange(e.target.value)}
					value={product.prodMl.listing_type_id}>
					<option value='gold_special'>Clásica</option>
					<option value='gold_pro'>Premium</option>
				</select>
			)}
			{system === 'LOCAL' && (
				<select
					name='listing'
					className='form__input'
					id='listing'
					onChange={e => handleChange(e.target.value)}
					value={product.listing_type_id}>
					<option value='local'>Local</option>
				</select>
			)}
			{system === 'WEB' && (
				<select
					name='listing'
					className='form__input'
					id='listing'
					onChange={e => handleChange(e.target.value)}
					value={product.prodWeb.listing_type_id}>
					<option value='great'>Destacado</option>
					<option value='web'>Web</option>
					<option value='best_seller'>Más vendido</option>
				</select>
			)}
		</>
	);
};

export default Listing;
