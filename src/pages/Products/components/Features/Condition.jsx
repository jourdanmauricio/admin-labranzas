import {useSelector} from 'react-redux';

const Condition = ({editFields}) => {
	const product = useSelector(state => state.product.product);

	return (
		<>
			<label htmlFor='condition'>Condición del item</label>
			<select
				onChange={e => editFields('condition', e.target.value)}
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
