import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Condition = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	return (
		<>
			<label htmlFor='condition'>Condición del item</label>
			<select
				onChange={e =>
					dispatch(editField({field: 'condition', value: e.target.value}))
				}
				name='condition'
				className='form__input'
				value={product.condition}>
				<option value='new'>Nuevo</option>
				<option value='used'>Usado</option>
			</select>
		</>
	);
};

export default Condition;
