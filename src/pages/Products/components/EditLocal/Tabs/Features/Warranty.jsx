import {useEffect, useState} from 'react';
import {Row, Col} from 'react-grid-system';
import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Warranty = () => {
	const [warrantyType, setWarrantyType] = useState('');
	const [warrantyTime, setWarrantyTime] = useState('');
	const [warrantyUnit, setWarrantyUnit] = useState('');
	const dispatch = useDispatch();
	const product = useSelector(state => state.product.product);

	useEffect(() => {
		const warrantyType = product.sale_terms.find(
			term => term.id === 'WARRANTY_TYPE'
		);
		if (warrantyType) setWarrantyType(warrantyType.value_name);

		const warrantyTime = product.sale_terms.find(
			term => term.id === 'WARRANTY_TIME'
		);

		if (warrantyTime) {
			setWarrantyTime(warrantyTime.value_struct.number);
			setWarrantyUnit(warrantyTime.value_struct.unit);
		}
	}, [product.sale_terms]);

	const handleChange = (type, value) => {
		let found;
		let warranty;
		let newValue = value;
		let value_struct = {number: '', unit: ''};
		switch (type) {
			case 'warrantyType':
				warranty = {
					id: 'WARRANTY_TYPE',
					value_name: value,
					updated: true,
				};
				break;

			case 'warrantyTime':
				found = product.sale_terms.find(el => el.id === 'WARRANTY_TIME');
				if (found !== undefined) {
					if (!Object.prototype.hasOwnProperty.call(found, 'value_struct')) {
						value_struct = {number: value, unit: ''};
					} else {
						value_struct.number = value;
						value_struct.unit = found.value_struct.unit;
					}
					newValue = value_struct.number + ' ' + value_struct.unit;
				} else {
					value_struct.number = value;
				}

				warranty = {
					id: 'WARRANTY_TIME',
					value_name: newValue,
					value_struct: value_struct,
					updated: true,
				};
				break;

			case 'warrantyUnit':
				found = product.sale_terms.find(el => el.id === 'WARRANTY_TIME');
				if (found !== undefined) {
					if (!Object.prototype.hasOwnProperty.call(found, 'value_struct')) {
						value_struct = {number: null, unit: value};
					} else {
						value_struct.number = found.value_struct.number;
						value_struct.unit = value;
					}
					newValue = value_struct.number + ' ' + value_struct.unit;
				} else {
					value_struct.unit = value;
				}
				warranty = {
					id: 'WARRANTY_TIME',
					value_name: newValue,
					value_struct: value_struct,
					updated: true,
				};

				break;
		}

		let newData = JSON.parse(JSON.stringify(product.sale_terms));

		if (type === 'warrantyType' && value === '6150835') {
			newData = newData.filter(
				item => item.id !== 'WARRANTY_TYPE' && item.id !== 'WARRANTY_TIME'
			);

			const resetWarrantyTime = {
				id: 'WARRANTY_TIME',
				value_name: '',
				value_struct: {number: '', unit: ''},
				updated: true,
			};
			newData.push(warranty);
			newData.push(resetWarrantyTime);
		} else {
			const index = product.sale_terms.findIndex(
				term => term.id === warranty.id
			);
			if (index === -1) {
				newData.push(warranty);
			} else {
				newData = product.sale_terms.map(term =>
					term.id === warranty.id ? warranty : term
				);
			}
		}
		dispatch(editField({field: 'sale_terms', value: newData}));
	};

	return (
		<Row className='form__row'>
			<Col md={4} className='form__control'>
				<label htmlFor='warranty-type'>Tipo de garantía</label>
				<select
					onChange={e => handleChange('warrantyType', e.target.value)}
					name='warranty-type'
					className='form__input'
					value={warrantyType}>
					{/* <option value='2230279'>Garantía de fábrica</option>
					<option value='2230280'>Garantía del vendedor</option>
					<option value='6150835'>Sin garantía</option> */}
					<option value='Garantía de fábrica'>Garantía de fábrica</option>
					<option value='Garantía del vendedor'>Garantía del vendedor</option>
					<option value='Sin garantía'>Sin garantía</option>
				</select>
			</Col>
			<Col md={4} className='form__control'>
				<label htmlFor='video'>Tiempo</label>
				<input
					className='form__input'
					type='text'
					name='video'
					value={warrantyTime}
					onChange={e => handleChange('warrantyTime', e.target.value)}
				/>
			</Col>
			<Col md={4} className='form__control'>
				<label htmlFor='condition'>Unidad</label>
				<select
					onChange={e => handleChange('warrantyUnit', e.target.value)}
					name='condition'
					className='form__input'
					value={warrantyUnit}>
					<option value=''></option>
					<option value='días'>Días</option>
					<option value='meses'>Meses</option>
					<option value='años'>Años</option>
				</select>
			</Col>
		</Row>
	);
};

export default Warranty;
