import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {serviceUpdProduct} from '@/services/api/products.api';
import {editField} from '@/store/product';

const useEditLocal = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);

	const product = useSelector(state => state.product.product);
	const changedFields = useSelector(state => state.product.changedFields);

	const handleAddCategory = newCategory => {
		editFields('category', newCategory);
		editFields('category_id', newCategory.id);
		setOpenCategory(false);
	};

	const handleCancelCat = () => {
		setOpenCategory(false);
	};

	const editFields = (field, value) => {
		console.log('EDIT ATTRIBS', field, value);
		dispatch(editField({field, value}));
	};

	const closeMessage = () => {
		setError(false);
	};

	const handleSubmit = () => {
		console.log('product', product);
		console.log('changedFields', changedFields);
		let system = '';

		let body = {};
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
					body.attributes = attributes;
					system = 'ML-LOCAL';
					break;
				case 'status':
					body.status = product.status;
					system = 'LOCAL';
			}
		});

		const resUpdate = serviceUpdProduct(body, product, system, 'PRODUCT');

		console.log('resUpdate', resUpdate);
	};
	return {
		loading,
		error,
		openCategory,
		handleAddCategory,
		handleCancelCat,
		editFields,
		closeMessage,
		handleSubmit,
		setLoading,
		setOpenCategory,
	};
};

export default useEditLocal;
