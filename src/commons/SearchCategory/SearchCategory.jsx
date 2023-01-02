import {useState} from 'react';
import Tabs from './components/Tabs';
import styles from './searchCategory.module.css';
import {createCategories, getCategory} from '@/services/api/categories.api';
import Loader from '../Loader-overlay/Loader-overlay';

const SearchCategory = ({handleAddCategory, handleCancel}) => {
	const [catSel, setCalSel] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSelectCat = categorySel => {
		setCalSel(categorySel);
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const category = await getCategory(catSel.id);
			handleAddCategory(category);
			handleCancel();
		} catch (error) {
			console.log('Error', error);
			if (error === '404: Category not found') {
				const newCategory = await createCategories([catSel]);
				console.log('Create', newCategory);
				handleAddCategory(newCategory[0].data);
			} else {
				throw error;
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{loading && <Loader />}
			<Tabs handleSelectCat={handleSelectCat}></Tabs>

			<div className={`mt ${styles.actions}`}>
				<button
					className={styles.btn}
					onClick={handleCancel}
					id='cancel'
					type='button'>
					Cancelar
				</button>

				{catSel && (
					<span className={styles.catSel}>
						{catSel.id} - {catSel.full_name}
					</span>
				)}

				<button
					onClick={handleSubmit}
					className={`${styles.btn} ${styles.btn__primary}`}
					id='delete'
					type='button'>
					Seleccionar
				</button>
			</div>
		</div>
	);
};

export default SearchCategory;
