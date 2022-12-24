import {useEffect, useState} from 'react';
import Loader from '../../Loader-overlay/Loader-overlay';
import {FaChevronRight, FaCheck} from 'react-icons/fa';
import {
	getApiAllCategoriesMl,
	getApiCategoriesMl,
} from '../../../services/api/categories.api';
import styles from '../searchCategory.module.css';

const CatTree = ({handleSelectCat}) => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [partialCat, setPartialCat] = useState('');

	const fetchData = async () => {
		try {
			setLoading(true);
			setPartialCat('');
			const catPpal = await getApiAllCategoriesMl();
			catPpal.map(cat => (cat.children_categories = [1]));
			setCategories(catPpal);
		} catch (err) {
			console.log('Errrorrrrr', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleReset = () => {
		handleSelectCat(null);
		fetchData();
	};

	async function handleSelCat(e, category) {
		if (category.children_categories.length === 0) {
			handleSelectCat(category);
		}
		console.log('HandleSelect');

		const part = partialCat
			? partialCat + ' / ' + category.name
			: category.name;

		setPartialCat(part);
		try {
			setLoading(true);
			category = await getApiCategoriesMl([category.id]);
			let newCategories = [];
			category[0].children_categories.map(cat => newCategories.push(cat.id));
			const categories = await getApiCategoriesMl(newCategories);
			setCategories(categories);
		} catch (error) {
			console.log('error', error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<>
			<div className={styles.header}>
				<div className={styles.actions}>
					<h2 className='title'>Árbol de Categorías</h2>
					<button onClick={handleReset} className={styles.btn}>
						Reset
					</button>
				</div>

				<div className='formulario'>
					<div className='wide'>
						<label htmlFor='partial-sel'>Selección parcial</label>
						<input
							name='partial-sel'
							className='form__input'
							value={partialCat}
							disabled></input>
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
								onClick={e => handleSelCat(e, category)}
								className={styles.selector__container}>
								<input
									onClick={e => e.stopPropagation()}
									className={styles.selector__input}
									type='radio'
									id={category.id}
									name='categories'
								/>

								<div className={styles.selector__item}>
									<label
										className={styles.selector__label}
										htmlFor={category.id}>
										{category.name}
									</label>
									{category.children_categories?.length > 0 ? (
										<FaChevronRight />
									) : (
										<FaCheck />
									)}
								</div>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default CatTree;
