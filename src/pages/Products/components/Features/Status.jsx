import {useSelector} from 'react-redux';

const Status = ({editFields}) => {
	const product = useSelector(state => state.product.product);

	return (
		<>
			<label htmlFor='status'>Estado</label>
			<select
				onChange={e => editFields('status', e.target.value)}
				name='status'
				className='form__input'
				id='status'
				value={product.status}>
				<option value='active'>Activo</option>
				<option value='paused'>Pausado</option>
			</select>
		</>
	);
};

export default Status;
