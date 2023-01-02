import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {editField} from '@/store/product';

const SellerCustomField = () => {
	const [data, setData] = useState('');
	const dispatch = useDispatch();
	const product = useSelector(state => state.product.product);

	useEffect(() => {
		setData(product.seller_custom_field);
	}, []);

	return (
		<>
			<label htmlFor='sku'>SKU</label>
			<input
				className='form__input'
				type='text'
				name='sku'
				value={data}
				onChange={e => setData(e.target.value)}
				onBlur={e =>
					dispatch(
						editField({field: 'seller_custom_field', value: e.target.value})
					)
				}
			/>
		</>
	);
};

export default SellerCustomField;
