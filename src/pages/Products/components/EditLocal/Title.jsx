import {useDispatch, useSelector} from 'react-redux';
import {isChangeTitle} from '@/helpers/helpFunctions';
import {useEffect, useState} from 'react';
import {editField} from '@/store/product';

const Title = () => {
	const [data, setData] = useState('');
	const dispatch = useDispatch();
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
				onBlur={e =>
					dispatch(editField({field: 'title', value: e.target.value}))
				}
				disabled={!isChangeTitle(product)}
			/>
		</>
	);
};

export default Title;
