import {useDispatch, useSelector} from 'react-redux';
import {setProduct, setFullProduct, setAction} from '@/store/product';
import {serviceUpdProduct} from '@/services/api/products.api';

const useProductSystem = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	const handleAction = action => {
		dispatch(setAction({action}));
	};

	const handleProduct = action => {
		dispatch(setFullProduct({id: product.id, action}));
	};

	const handleChange = async (action, value) => {
		console.log('handleChange', value, action);

		let body;
		let newProd;
		let resWeb;
		let resMl;

		switch (action) {
			case 'UPDATE-PRICE-WEB':
				body = {
					price: value,
				};
				resWeb = await serviceUpdProduct(body, product, 'WEB');
				newProd = Object.assign({}, product);
				newProd.prodWeb = resWeb;
				dispatch(setProduct({product: newProd}));
				handleAction('UPDATE-PRODUCT');
				break;

			case 'UPDATE-QUANTITY-WEB':
				body = {
					available_quantity: value,
				};
				resWeb = await serviceUpdProduct(body, product, 'WEB');
				newProd = Object.assign({}, product);
				newProd.prodWeb = resWeb;
				dispatch(setProduct({product: newProd}));
				handleAction('UPDATE-PRODUCT');
				break;

			case 'UPDATE-PRICE-ML':
				console.log('price ml');
				if (product.variations.length > 0) {
					let variations = [];
					product.variations.forEach(vari => {
						const obj = {
							id: vari.id,
							price: value,
						};
						variations.push(obj);
					});
					body = {
						variations,
					};
				} else {
					body = {
						price: value,
					};
				}
				resMl = await serviceUpdProduct(body, product, 'ML');
				newProd = Object.assign({}, product);
				newProd.prodMl = resMl;
				dispatch(setProduct({product: newProd}));
				handleAction('UPDATE-PRODUCT');
				break;

			case 'UPDATE-QUANTITY-ML':
				console.log('Quantity ml');
				if (value === product.prodMl.available_quantity) return;
				body = {
					available_quantity: value,
				};
				resMl = await serviceUpdProduct(body, product, 'ML');
				newProd = Object.assign({}, product);
				newProd.prodMl = resMl;
				dispatch(setProduct({product: newProd}));
				handleAction('UPDATE-PRODUCT');
				break;

			case 'UPDATE-VAR-QUANTITY-ML':
				console.log('Quantity Var ml', value);
				break;

			case 'UPDATE-PRICE-LOCAL':
				body = {
					price: value,
				};
				resMl = await serviceUpdProduct(body, product, 'LOCAL');
				newProd = Object.assign({}, product);
				newProd = resMl;
				dispatch(setProduct({product: newProd}));
				handleAction('UPDATE-PRODUCT');
				break;

			case 'UPDATE-QUANTITY-LOCAL':
				body = {
					available_quantity: value,
				};
				resMl = await serviceUpdProduct(body, product, 'LOCAL');
				newProd = Object.assign({}, product);
				newProd = resMl;
				dispatch(setProduct({product: newProd}));
				handleAction('UPDATE-PRODUCT');
				break;
		}
	};

	return {
		handleAction,
		handleProduct,
		handleChange,
	};
};

export default useProductSystem;
