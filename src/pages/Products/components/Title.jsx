import {useSelector} from 'react-redux';
import {isChangeTitle} from '@/helpers/helpFunctions';
import {useEffect, useState} from 'react';

const Title = ({editFields}) => {
	const [data, setData] = useState('');
	const product = useSelector(state => state.product.product);

	useEffect(() => {
		setData(product.title);
	}, []);

	return (
		<>
			<label htmlFor='title'>Producto</label>
			<input
				className='form__input'
				type='text'
				name='title'
				value={data || ''}
				onChange={e => setData(e.target.value)}
				onBlur={e => editFields('title', e.target.value)}
				disabled={!isChangeTitle(product)}
			/>
		</>
	);
};

export default Title;
