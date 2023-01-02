import {useDispatch, useSelector} from 'react-redux';
import {editField} from '@/store/product';

const Video = () => {
	const product = useSelector(state => state.product.product);
	const dispatch = useDispatch();

	return (
		<>
			<label htmlFor='video'>Video</label>
			<input
				className='form__input'
				type='text'
				name='video'
				value={product.video_id || ''}
				onChange={e =>
					dispatch(editField({field: 'video_id', value: e.target.value}))
				}
			/>
		</>
	);
};

export default Video;
