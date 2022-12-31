import {useEffect, useState} from 'react';

const Price = ({price, action, handleChange}) => {
	const [data, setData] = useState('');
	useEffect(() => {
		setData(price);
	}, []);

	const validate = value => {
		if (value === price.toString()) return;
		handleChange(action, value);
	};

	return (
		<input
			className='form__input'
			type='text'
			name='price'
			value={data}
			onBlur={e => validate(e.target.value)}
			onChange={e => setData(e.target.value)}
		/>
	);
};

export default Price;
