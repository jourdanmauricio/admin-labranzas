import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';
import {useEffect, useState} from 'react';

const MaxPurchase = () => {
	const [data, setData] = useState('');
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	useEffect(() => {
		const maxPurchase = product.sale_terms.find(
			term => term.id === 'PURCHASE_MAX_QUANTITY'
		);
		if (maxPurchase) setData(maxPurchase?.value_name);
	}, [product.sale_terms]);

	const handleChange = value => {
		const maxPurchase = {
			id: 'PURCHASE_MAX_QUANTITY',
			value_name: value,
			updated: true,
		};

		let newData = [];
		const index = product.sale_terms.findIndex(
			term => term.id === 'PURCHASE_MAX_QUANTITY'
		);
		if (index === -1) {
			newData.push(maxPurchase);
		} else {
			newData = product.sale_terms.map(term =>
				term.id === maxPurchase.id ? maxPurchase : term
			);
		}

		dispatch(editField({field: 'sale_terms', value: newData}));
	};

	return (
		<>
			<label htmlFor='max-purchase'>Cantidad max x compra</label>
			<input
				className='form__input'
				type='number'
				name='max-purchase'
				value={data}
				min={0}
				onChange={e => handleChange(e.target.value)}
			/>
		</>
	);
};

export default MaxPurchase;
