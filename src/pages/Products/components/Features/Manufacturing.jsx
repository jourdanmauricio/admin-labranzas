import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Manufacturing = ({editFields}) => {
	const [data, setData] = useState('');
	const product = useSelector(state => state.product.product);

	useEffect(() => {
		const manufacturing = product.sale_terms.find(
			term => term.id === 'MANUFACTURING_TIME'
		);
		const time = manufacturing?.value_name.split(' ')[0];
		if (time) setData(time);
	}, [product.sale_terms]);

	const handleChange = value => {
		const manufacturing = {
			id: 'MANUFACTURING_TIME',
			value_name: `${value} días`,
			updated: true,
		};

		let newData = [];
		const index = product.sale_terms.findIndex(
			term => term.id === 'MANUFACTURING_TIME'
		);
		if (index === -1) {
			newData.push(manufacturing);
		} else {
			newData = product.sale_terms.map(term =>
				term.id === manufacturing.id ? manufacturing : term
			);
		}

		editFields('sale_terms', newData);
	};

	return (
		<>
			<label htmlFor='max-purchase'>Días de elaboración</label>
			<input
				className='form__input'
				type='number'
				name='max-purchase'
				max={45}
				min={0}
				value={data}
				onChange={e => handleChange(e.target.value)}
			/>
		</>
	);
};

export default Manufacturing;
