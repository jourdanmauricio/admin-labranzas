import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Quantity = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();
	return (
		<>
			<label htmlFor='quantity'>Cantidad</label>
			<input
				className='form__input'
				type='number'
				name='quantity'
				value={product.available_quantity || ''}
				onChange={e =>
					dispatch(
						editField({field: 'available_quantity', value: e.target.value})
					)
				}
				disabled={product.variations.length > 0}
			/>
		</>
	);
};

export default Quantity;
