import styles from '../searchCategory.module.css';
import Loader from '../../Loader-overlay/Loader-overlay';
import {useEffect, useState} from 'react';

const CatUsed = ({handleSelectCat}) => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const handleReset = () => {
		handleSelectCat(null);
	};

	const fetchData = async () => {
		// try {
		// 	setLoading(true);
		// 	setPartialCat('');
		// 	const catPpal = await getApiAllCategoriesMl();
		// 	catPpal.map(cat => (cat.children_categories = [1]));
		// 	setCategories(catPpal);
		// } catch (err) {
		// 	console.log('Errrorrrrr', err);
		// } finally {
		// 	setLoading(false);
		// }
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.actions}>
					<h2 className='title'>Árbol de Categorías</h2>
					<button onClick={handleReset} className={styles.btn}>
						Reset
					</button>
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
								<label className={styles.selector__label} htmlFor={category.id}>
									{category.full_name}
								</label>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default CatUsed;
