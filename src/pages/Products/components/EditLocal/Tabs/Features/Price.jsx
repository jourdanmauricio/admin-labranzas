import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Price = () => {
	const product = useSelector(state => state.product.product);
	const [price, setPrice] = useState(product.price);
	const dispatch = useDispatch();

	const handleChange = () => {
		dispatch(editField({field: 'price', value: price}));

		if (product.variations.length > 0) {
			let variations = [];
			let obj;
			product.variations.forEach(vari => {
				obj = {
					...vari,
					price: price,
				};

				variations.push(obj);
			});
			dispatch(editField({field: 'variations', value: variations}));
		}
	};

	return (
		<>
			<label htmlFor='price'>Precio</label>
			<input
				className='form__input'
				type='number'
				name='price'
				value={price || ''}
				onChange={e => setPrice(e.target.value)}
				onBlur={e => handleChange(e.target.value)}
			/>
		</>
	);
};

export default Price;
