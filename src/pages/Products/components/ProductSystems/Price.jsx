import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	setProdLoading,
	setAction,
	editField,
	setProdError,
} from '@/store/product';
import {serviceUpdProduct} from '@/services/api/products.api';

const Price = ({system}) => {
	const [data, setData] = useState('');
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	useEffect(() => {
		let price;
		switch (system) {
			case 'ML':
				price = product.prodMl.price;
				break;
			case 'WEB':
				price = product.prodWeb.price;
				break;
			case 'LOCAL':
				price = product.price;
				break;
		}
		setData(price);
	}, [system]);

	const handleChange = async () => {
		try {
			dispatch(setProdLoading());

			let body = {
				price: data,
			};

			if (product.variations.length > 0) {
				let variations = [];
				let obj;
				product.variations.forEach(vari => {
					if (system === 'ML') {
						obj = {
							id: vari.id,
							price: data,
						};
					} else {
						obj = {
							...vari,
							price: data,
						};
					}
					variations.push(obj);
				});
				body = {
					price: data,
					variations,
				};
			}

			let res;

			switch (system) {
				case 'WEB':
					res = await serviceUpdProduct(body, product, 'WEB');
					dispatch(editField({field: 'prodWeb', value: res}));
					break;
				case 'ML':
					delete body.price;
					res = await serviceUpdProduct(body, product, 'ML');
					dispatch(editField({field: 'prodMl', value: res}));
					break;
				case 'LOCAL':
					res = await serviceUpdProduct(body, product, 'LOCAL');

					dispatch(
						editField({
							field: 'price',
							value: res.price,
						})
					);
					dispatch(
						editField({
							field: 'variations',
							value: res.variations,
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

	return (
		<input
			className='form__input'
			type='text'
			name='price'
			value={data}
			onBlur={handleChange}
			onChange={e => setData(e.target.value)}
		/>
	);
};

export default Price;
