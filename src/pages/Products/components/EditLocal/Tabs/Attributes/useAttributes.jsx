import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useModal} from '@/hooks/useModal';
import {editField} from '@/store/product';

const useAttributes = () => {
	const [attribNewVal, setAttribNewVal] = useState(null);
	const [attribCategory, setAttribCategory] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const dispatch = useDispatch();

	const product = useSelector(state => state.product.product);

	useEffect(() => {
		const attribs = product.category.attributes.filter(
			attribute =>
				!Object.prototype.hasOwnProperty.call(attribute.tags, 'hidden') &&
				!Object.prototype.hasOwnProperty.call(
					attribute.tags,
					'allow_variations'
				) &&
				!Object.prototype.hasOwnProperty.call(
					attribute.tags,
					'variation_attribute'
				)
		);
		setAttribCategory(attribs);
	}, []);

	useEffect(
		() => {
			const attribs = attribCategory.map(atrib => {
				let found2 = product.attributes.find(el => el.id === atrib.id);
				if (found2 !== undefined) {
					const found = Object.assign({}, found2);
					found.value_type = atrib.value_type;
					found.tags = atrib.tags;

					const values = [];
					if (found.values !== undefined) {
						found.values.forEach(prodValue => {
							const index = values.findIndex(
								value => value.id === prodValue.id
							);
							if (index === -1) values.push(prodValue);
						});
					}
					if (atrib.values !== undefined) {
						atrib.values.forEach(catValue => {
							const index = values.findIndex(value => value.id === catValue.id);
							if (index === -1) values.push(catValue);
						});
					}

					if (values.length > 1) {
						found.values = values;
					} else {
						found.values = atrib.values;
					}

					found.allowed_units = atrib.allowed_units;
					return found;
				} else {
					return atrib;
				}
			});
			setAttributes(attribs);
		}, // [attribCategory]);
		[attribCategory]
	);

	const isNotApply = attribute => {
		return attribute.value_id === '-1' && attribute.value_name === null
			? true
			: false;
	};

	const isMultivalue = attribute => {
		return Object.prototype.hasOwnProperty.call(attribute.tags, 'multivalued')
			? true
			: false;
	};

	const haveOptions = attribute => {
		return attribute.values &&
			(attribute.value_type === 'string' || attribute.value_type === 'list')
			? true
			: false;
	};

	const haveNumberUnit = attribute => {
		return attribute.value_type === 'number_unit' ? true : false;
	};

	const isNumber = attribute => {
		return attribute.value_type === 'number' ? true : false;
	};

	const isBoolean = attribute => {
		return attribute.values && attribute.value_type === 'boolean'
			? true
			: false;
	};

	const isString = attribute => {
		return !attribute.values && attribute.value_type === 'string'
			? true
			: false;
	};

	const isEnableNotApply = attribute => {
		return !Object.prototype.hasOwnProperty.call(attribute.tags, 'required') &&
			!Object.prototype.hasOwnProperty.call(attribute.tags, 'catalog_required')
			? true
			: false;
	};

	const isAllowedUnits = attribute => {
		return attribute.allowed_units ? true : false;
	};

	function handleChange(attribute, e, type = '') {
		let found;
		let newAttribute = Object.assign({}, attribute);
		newAttribute.updated = true;

		// Delete Attribute
		if (newAttribute.value_name === ' ') type = 'DELETE-ATRIB';

		switch (type) {
			case 'N/A':
				newAttribute.value_id = '-1';
				newAttribute.value_name = null;
				break;
			case 'DELETE-ATRIB':
				newAttribute.value_id = null;
				newAttribute.value_name = null;
				break;
			case 'boolean':
				newAttribute.value_id = e.target.value;
				newAttribute.value_name = Array.from(
					e.target.selectedOptions
				)[0].innerHTML;
				break;
			case 'string':
				if (!attribute.values) {
					newAttribute.value_id = '';
					newAttribute.value_name = e.target.value;
				} else {
					if (attribute.tags.multivalued) {
						let selected = Array.from(e.target.selectedOptions);
						// let selected = Array.from(e.target.value);
						// newAttribute.value_name = e.target.value;
						let values = '';
						selected.forEach(
							el =>
								(newAttribute.value_name =
									values.length === 0
										? (values = el.value)
										: newAttribute.value_name + ',' + el.value)
						);
					} else {
						let found = attribute.values.find(
							atrib => atrib.name === e.target.value
						);
						newAttribute.value_name = found.name;
						newAttribute.value_id = found.id;
					}
				}
				break;
			case 'list':
				found = attribute.values.find(atrib => atrib.name === e.target.value);
				newAttribute.value_name = found.name;
				newAttribute.value_id = found.id;
				break;
			case 'number_unit':
				newAttribute.value_id = '';
				if (!Object.prototype.hasOwnProperty.call(newAttribute, 'value_struct'))
					newAttribute.value_struct = {unit: '', number: ''};
				// Object.defineProperties(newAttribute, {
				// 	value_struct: {unit: '', number: ''},
				// });

				newAttribute.value_struct = {
					...newAttribute.value_struct,
					number: e.target.value,
				};

				newAttribute.value_name = newAttribute.value_unit
					? e.target.value + ' ' + newAttribute.value_unit
					: e.target.value;

				break;
			case 'units':
				if (newAttribute.value_name) {
					newAttribute.value_name =
						newAttribute.value_name + ' ' + e.target.value;
				} else {
					newAttribute.value_name = e.target.value;
				}
				if (!Object.prototype.hasOwnProperty.call(newAttribute, 'value_struct'))
					newAttribute.value_struct = {unit: '', number: ''};
				newAttribute.value_struct.unit = e.target.value;
				break;
			default:
				newAttribute.value_name = e.target.value;
				break;
		}

		let newData = attributes.map(el => {
			return el.id === newAttribute.id ? newAttribute : el;
		});

		setAttributes(newData);
		dispatch(editField({field: 'attributes', value: newData}));
	}

	const addOption = attribute => {
		setAttribNewVal(attribute);
		openModal();
	};

	const handleAddAtrib = newValueAttrib => {
		const attrib = Object.assign({}, attribNewVal);
		attrib.values = [
			...attrib.values,
			{id: newValueAttrib, name: newValueAttrib},
		];
		// attribute.values.push({id: 'new', name: 'new'});
		let newData = attributes.map(el => {
			return el.id === attrib.id ? attrib : el;
		});
		setAttributes(newData);
		closeModal();
		setAttribNewVal(null);
	};

	const handleCancel = () => {
		closeModal();
		setAttribNewVal(null);
	};

	return {
		attribCategory,
		attributes,
		isOpenModal,
		closeModal,
		openModal,
		addOption,
		handleAddAtrib,
		handleCancel,
		isNotApply,
		isMultivalue,
		haveOptions,
		haveNumberUnit,
		handleChange,
		isAllowedUnits,
		isEnableNotApply,
		isString,
		isBoolean,
		isNumber,
	};
};

export default useAttributes;
