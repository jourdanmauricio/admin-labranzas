import {useSelector} from 'react-redux';

const Description = ({editFields}) => {
	const product = useSelector(state => state.product.product);
	return (
		<>
			<label htmlFor='description'>Descripción</label>
			<textarea
				className='form__input'
				rows={6}
				name='description'
				value={product.description || ''}
				onChange={e => editFields('description', e.target.value)}
			/>
		</>
	);
};

export default Description;
