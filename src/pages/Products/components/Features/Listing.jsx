import {useSelector} from 'react-redux';

const Listing = ({editFields}) => {
	const product = useSelector(state => state.product.product);
	return (
		<>
			<label htmlFor='listing_type_id'>Tipo de publicación</label>
			<select
				onChange={e => editFields('condition', e.target.value)}
				name='listing_type_id'
				className='form__input'
				value={product.listing_type_id}>
				<option value='gold_special'>Clásica</option>
				<option value='gold_pro'>Premium</option>
			</select>
		</>
	);
};

export default Listing;
