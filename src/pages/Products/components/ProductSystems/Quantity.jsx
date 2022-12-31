import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	setProdLoading,
	setAction,
	editField,
	setProdError,
} from '@/store/product';
import {serviceUpdProduct} from '@/services/api/products.api';

const Quantity = ({system}) => {
	const [data, setData] = useState('');
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	const handleChange = async () => {
		switch (system) {
			case 'ML':
				if (data === product.prodMl.available_quantity) return;
				break;
			case 'WEB':
				if (data === product.prodWeb.available_quantity) return;
				break;
			case 'LOCAL':
				if (data === product.available_quantity) return;
				break;
		}

		try {
			dispatch(setProdLoading());
			const body = {
				available_quantity: data,
			};

			let res;
			switch (system) {
				case 'ML':
					res = await serviceUpdProduct(body, product, 'ML');
					dispatch(editField({field: 'prodMl', value: res}));
					break;
				case 'WEB':
					res = await serviceUpdProduct(body, product, 'WEB');
					dispatch(editField({field: 'prodWeb', value: res}));
					break;
				case 'LOCAL':
					res = await serviceUpdProduct(body, product, 'LOCAL');
					dispatch(
						editField({
							field: 'available_quantity',
							value: res.available_quantity,
						})
					);
					break;
			}
			dispatch(setAction({action: 'UPDATE-PRODUCT'}));
		} catch (error) {
			dispatch(setProdError({error}));
			console.log(error);
		}
	};

	useEffect(() => {
		let quantity;
		switch (system) {
			case 'ML':
				quantity = product.prodMl.available_quantity;
				break;
			case 'WEB':
				quantity = product.prodWeb.available_quantity;
				break;
			case 'LOCAL':
				quantity = product.available_quantity;
				break;
		}
		setData(quantity);
	}, [system]);

	return (
		<input
			className='form__input'
			type='text'
			name='quantity'
			value={data}
			disabled={product.variations.length > 0}
			onBlur={handleChange}
			onChange={e => setData(e.target.value)}
		/>
	);
};

export default Quantity;
