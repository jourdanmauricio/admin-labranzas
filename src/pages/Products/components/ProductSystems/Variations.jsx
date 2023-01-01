import {useEffect, useState} from 'react';
import {descriptionVariation} from '@/helpers/helpFunctions';
import styles from '../../products.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {
	setProdLoading,
	editField,
	setAction,
	setProdError,
} from '@/store/product';
import {serviceUpdProduct} from '@/services/api/products.api';

const Variations = () => {
	const [variations, setVariations] = useState(null);
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	useEffect(() => {
		const vars = [];
		product.variations.forEach(vari => {
			const quantityLocal = vari.available_quantity;
			let quantityMl;
			let quantityWeb;
			console.log('VARI', vari);
			const descVar = descriptionVariation(vari)[1];

			const found = product.prodMl?.variations.find(
				varMl => varMl.id === vari.id
			);
			if (found) quantityMl = found.available_quantity;

			const found2 = product.prodWeb?.variations.find(
				varWeb => varWeb.id === vari.id
			);

			if (found2) quantityWeb = found2.available_quantity;

			const obj = {
				id: vari.id,
				descVar,
				quantityMl,
				quantityLocal,
				quantityWeb,
				currentPicture: 0,
			};
			vars.push(obj);
		});
		setVariations(vars);
	}, []);

	const handleChange = async system => {
		// Validate no updated
		let arrCurrentVariation = variations.filter(
			variation => variation.updated === true
		);
		let currentVariation = arrCurrentVariation[0];
		if (!currentVariation || currentVariation.length === 0) return;

		try {
			dispatch(setProdLoading());
			let res;
			let body;
			let newVariations = [];
			let obj;
			let prodQuantity = 0;
			switch (system) {
				case 'quantityMl':
					variations.forEach(variation => {
						if (variation.updated === true) {
							obj = {
								id: variation.id,
								available_quantity: variation.quantityMl,
							};
						} else {
							obj = {id: variation.id};
						}
						newVariations.push(obj);
					});
					body = {
						variations: newVariations,
					};
					res = await serviceUpdProduct(body, product, 'ML');
					dispatch(editField({field: 'prodMl', value: res}));
					break;
				case 'quantityWeb':
					body = Object.assign({}, product.prodWeb);
					delete body.updatedAt;
					delete body.createdAt;

					body.variations = body.variations.map(vari =>
						vari.id === currentVariation.id
							? {
									...vari,
									available_quantity: parseInt(currentVariation.quantityWeb),
							  }
							: vari
					);

					prodQuantity = body.variations.reduce(
						(acc, item) => acc + item.available_quantity,
						0
					);
					body.available_quantity = prodQuantity;

					res = await serviceUpdProduct(body, product, 'WEB');
					dispatch(editField({field: 'prodWeb', value: res}));
					break;
				case 'quantityLocal':
					body = Object.assign({}, product);

					newVariations = product.variations.map(el =>
						el.id === currentVariation.id
							? {
									...el,
									available_quantity: parseInt(currentVariation.quantityLocal),
							  }
							: el
					);

					prodQuantity = newVariations.reduce(
						(acc, item) => acc + item.available_quantity,
						0
					);
					body.available_quantity = prodQuantity;
					body.variations = newVariations;
					res = await serviceUpdProduct(body, product, 'LOCAL');
					dispatch(
						editField({
							field: 'available_quantity',
							value: res.available_quantity,
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

	const handleQuantity = (variation, name, value) => {
		const newVar = variations.find(el => el.id === variation.id);
		newVar[name] = parseInt(value);
		newVar.updated = true;

		const newVars = variations.map(el => (el.id === newVar.id ? newVar : el));
		setVariations(newVars);
	};

	return (
		<>
			{variations?.length > 0 ? (
				<div className={`table__container ${styles.product_systems}`}>
					<table className='table'>
						<caption>Variaciones</caption>
						<thead>
							<tr>
								<th>{descriptionVariation(product.variations[0])[0]}</th>
								<th>Cantidad ML</th>
								<th>Cantidad Local</th>
								<th>Cantidad Web</th>
							</tr>
						</thead>
						<tbody>
							{variations.map(vari => (
								<tr key={vari.id}>
									<td data-titulo='Variación'>{vari.descVar}</td>
									<td data-titulo='Cantidad ML'>
										<input
											className='form__input'
											type='text'
											name='quantityMl'
											value={vari.quantityMl}
											onBlur={e => handleChange(e.target.name)}
											onChange={e =>
												handleQuantity(vari, e.target.name, e.target.value)
											}
										/>
									</td>
									<td data-titulo='Cantidad Local'>
										<input
											className='form__input'
											type='text'
											name='quantityLocal'
											value={vari.quantityLocal}
											onBlur={e => handleChange(e.target.name)}
											onChange={e =>
												handleQuantity(vari, e.target.name, e.target.value)
											}
										/>
									</td>
									<td data-titulo='Cantidad Web'>
										<input
											className='form__input'
											type='text'
											name='quantityWeb'
											value={vari.quantityWeb}
											onBlur={e => handleChange(e.target.name)}
											onChange={e =>
												handleQuantity(vari, e.target.name, e.target.value)
											}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>No posee variaciones</p>
			)}
		</>
	);
};

export default Variations;
