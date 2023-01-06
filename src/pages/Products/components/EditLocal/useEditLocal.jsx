import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {serviceUpdProduct} from '@/services/api/products.api';
import {
	setAction,
	setProdLoading,
	editField,
	setProdError,
} from '@/store/product';

const useEditLocal = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);

	const product = useSelector(state => state.product.product);
	const changedFields = useSelector(state => state.product.changedFields);

	const handleAddCategory = newCategory => {
		dispatch(editField({field: 'category', value: newCategory}));
		dispatch(editField({field: 'category_id', value: newCategory.id}));
		setOpenCategory(false);
	};

	const handleCancelCat = () => {
		setOpenCategory(false);
	};

	const closeMessage = () => {
		setError(false);
	};

	const handleSubmit = async () => {
		console.log('product', product);
		console.log('changedFields', changedFields);

		try {
			dispatch(setProdLoading());
			let bodyAll = {};
			let bodyMlDesc = {};
			let bodyMl = {};
			let bodyWeb = {};
			let bodyLocal = {};
			let body = {};
			let copyVar;
			changedFields.forEach(field => {
				let attributes = [];
				switch (field) {
					case 'attributes':
						product.attributes.forEach(attrib => {
							if (attrib.updated === true) {
								attributes.push({
									id: attrib.id,
									value_id: attrib.value_id,
									value_name: attrib.value_name,
								});
							} else {
								attributes.push({id: attrib.id});
							}
						});
						bodyMl.attributes = attributes;
						break;
					case 'status':
						body.status = product.status;
						break;
					case 'price':
						body.price = product.price;
						if (product.variations.length > 0)
							body.variations = product.variations;
						break;
					case 'available_quantity':
						body.available_quantity = product.available_quantity;
						break;
					case 'sale_terms':
						console.log('sate_terms', product.sale_terms);
						bodyMl.sale_terms = [];
						product.sale_terms.forEach(term => {
							if (term.updated === true) {
								bodyMl.sale_terms.push({
									id: term.id,
									value_name: term.value_name,
								});
							} else {
								bodyMl.sale_terms.push({
									id: term.id,
								});
							}
						});
						break;
					case 'condition':
						bodyMl.condition = product.condition;
						break;
					case 'video_id':
						bodyMl.video_id = product.video_id;
						break;
					case 'description':
						bodyMlDesc = {plain_text: product.description};
						break;
					case 'pictures':
						bodyMl.pictures = product.pictures.map(pic => ({id: pic.id}));
						break;
					case 'variations':
						bodyMl.variations = [];
						console.log('Change variations', product.variations);

						copyVar = JSON.parse(JSON.stringify(product.variations));

						bodyLocal.variations = copyVar.map(varLocal => {
							if (Object.prototype.hasOwnProperty.call(varLocal, 'action')) {
								console.log('varLocal', varLocal);
								varLocal.action = undefined;
							}
							return varLocal;
						});
						bodyWeb.variations = [...bodyLocal.variations];

						product.variations.forEach(vari => {
							if (vari.action === 'UPDATE') {
								console.log('Change UPDATE');
								// delete vari.action;
								let obj = {
									id: vari.id,
									attribute_combinations: vari.attribute_combinations,
									arributes: vari.attributes,
									// available_quantity: vari.available_quantity,
									picture_ids: vari.picture_ids,
									price: vari.price,
								};
								bodyMl.variations.push(obj);
							} else {
								bodyMl.variations.push({id: vari.id});
							}
						});
						break;
				}
			});

			if (Object.keys(body).length > 0) {
				const resUpdate = await serviceUpdProduct(
					body,
					product,
					'LOCAL',
					'PRODUCT'
				);
				console.log('resUpdate', resUpdate);
			}

			if (Object.keys(bodyMl).length > 0) {
				const resUpdate = await serviceUpdProduct(
					bodyMl,
					product,
					'ML-LOCAL',
					'PRODUCT'
				);
				console.log('resUpdate', resUpdate);
				dispatch(editField({field: 'thumbnail', value: resUpdate.thumbnail}));
			}

			if (Object.keys(bodyMlDesc).length > 0) {
				const resUpdate = await serviceUpdProduct(
					bodyMlDesc,
					product,
					'ML-LOCAL',
					'DESCRIPTION'
				);
				console.log('resUpdate', resUpdate);
			}

			if (Object.keys(bodyAll).length > 0) {
				const resUpdate = await serviceUpdProduct(
					bodyAll,
					product,
					'ALL',
					'PRODUCT'
				);
				console.log('resUpdate', resUpdate);
			}

			if (Object.keys(bodyLocal).length > 0) {
				const resUpdate = await serviceUpdProduct(
					bodyLocal,
					product,
					'LOCAL',
					'PRODUCT'
				);
				console.log('resUpdate', resUpdate);
			}

			if (Object.keys(bodyWeb).length > 0) {
				const resUpdate = await serviceUpdProduct(
					bodyWeb,
					product,
					'WEB',
					'PRODUCT'
				);
				console.log('resUpdate', resUpdate);
			}

			dispatch(setAction({action: 'UPDATE-PRODUCT'}));
		} catch (error) {
			console.log('ERRRRRRRRRRRR', error);
			dispatch(setProdError({error}));
		}
	};
	return {
		loading,
		error,
		openCategory,
		handleAddCategory,
		handleCancelCat,
		closeMessage,
		handleSubmit,
		setLoading,
		setOpenCategory,
	};
};

export default useEditLocal;
