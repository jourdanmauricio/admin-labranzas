import {useState} from 'react';
import Loader from '../../Loader-overlay/Loader-overlay';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {searchPredictor} from '../../../services/api/categories.api';
import styles from '../searchCategory.module.css';

const CatPredictor = ({handleSelectCat}) => {
	const [description, setDescription] = useState('');
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatchNotif = useNotification();

	const handleSearchPredictor = async value => {
		if (!value.trim()) {
			setCategories([]);
			return;
		}
		try {
			setLoading(true);
			const cats = await searchPredictor(value);
			setCategories(cats);
		} catch (err) {
			dispatchNotif({
				type: 'ERROR',
				message: err,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleChange = value => {
		setDescription(value);
	};

	const handleReset = () => {
		handleSelectCat(null);
		setDescription('');
		setCategories([]);
	};

	return (
		<>
			<form>
				<div className={styles.header}>
					<div className={styles.actions}>
						<h2 className='title'>Predictor de Categorías</h2>
						<button onClick={handleReset} className={styles.btn}>
							Reset
						</button>
					</div>
					<div className='formulario'>
						<div className='wide'>
							<label htmlFor='text-search'>Descripción de la categoría</label>
							<input
								className='form__input'
								type='text'
								name='text-search'
								placeholder='Centros de mesa'
								value={description}
								onChange={e => handleChange(e.target.value)}
								onBlur={e => handleSearchPredictor(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<div className={styles.predictor__container}>
					<div className={styles.predictor__selector}>
						{loading && <Loader />}
						{categories.length > 0 &&
							categories.map(category => (
								<div
									key={category.id}
									className={styles.selector__container}
									onClick={() => handleSelectCat(category)}>
									<input
										onClick={e => e.stopPropagation()}
										className={styles.selector__input}
										type='radio'
										id={category.id}
										name='categories'
									/>
									<label
										className={styles.selector__label}
										htmlFor={category.id}>
										{category.full_name}
									</label>
								</div>
							))}
					</div>
				</div>
			</form>
		</>
	);
};

export default CatPredictor;
