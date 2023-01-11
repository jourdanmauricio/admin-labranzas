import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Status = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	return (
		<>
			<label htmlFor='status'>Estado</label>
			<select
				onChange={e =>
					dispatch(editField({field: 'status', value: e.target.value}))
				}
				name='status'
				className='form__input'
				id='status'
				value={product.status}>
				<option value='active'>Activo</option>
				<option value='paused'>Pausado</option>
				<option value='under_review' disabled>
					En revisión
				</option>
			</select>
		</>
	);
};

export default Status;
