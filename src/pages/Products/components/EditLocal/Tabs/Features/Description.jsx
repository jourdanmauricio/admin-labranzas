import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Description = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	return (
		<>
			<label htmlFor='description'>Descripción</label>
			<textarea
				className='form__input'
				rows={6}
				name='description'
				value={product.description || ''}
				onChange={e =>
					dispatch(editField({field: 'description', value: e.target.value}))
				}
			/>
		</>
	);
};

export default Description;
