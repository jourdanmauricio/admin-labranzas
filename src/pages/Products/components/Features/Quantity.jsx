import {useSelector} from 'react-redux';

const Quantity = ({editFields}) => {
	const product = useSelector(state => state.product.product);
	return (
		<>
			<label htmlFor='quantity'>Cantidad</label>
			<input
				className='form__input'
				type='number'
				name='quantity'
				value={product.available_quantity || ''}
				onChange={e => editFields('available_quantity', e.target.value)}
			/>
		</>
	);
};

export default Quantity;
