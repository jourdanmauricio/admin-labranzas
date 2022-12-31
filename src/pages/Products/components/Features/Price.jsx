import {useSelector} from 'react-redux';

const Price = ({editFields}) => {
	const product = useSelector(state => state.product.product);
	return (
		<>
			<label htmlFor='price'>Precio</label>
			<input
				className='form__input'
				type='number'
				name='price'
				value={product.price || ''}
				onChange={e => editFields('price', e.target.value)}
			/>
		</>
	);
};

export default Price;
