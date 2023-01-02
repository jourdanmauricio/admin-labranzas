import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Listing = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	return (
		<>
			<label htmlFor='listing_type_id'>Tipo de publicación</label>
			<select
				onChange={e =>
					dispatch(editField({field: 'listing_type_id', value: e.target.value}))
				}
				name='listing_type_id'
				className='form__input'
				value={product.listing_type_id}>
				<option value='local'>Local</option>
			</select>
		</>
	);
};

export default Listing;
