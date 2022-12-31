import {useSelector} from 'react-redux';

const Video = ({editFields}) => {
	const product = useSelector(state => state.product.product);
	return (
		<>
			<label htmlFor='video'>Video</label>
			<input
				className='form__input'
				type='text'
				name='video'
				value={product.video || ''}
				onChange={e => editFields('video', e.target.value)}
			/>
		</>
	);
};

export default Video;
