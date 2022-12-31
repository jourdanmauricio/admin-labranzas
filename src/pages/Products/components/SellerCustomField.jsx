import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const SellerCustomField = ({editFields}) => {
	const [data, setData] = useState('');
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
				onBlur={e => editFields('seller_custom_field', e.target.value)}
			/>
		</>
	);
};

export default SellerCustomField;
