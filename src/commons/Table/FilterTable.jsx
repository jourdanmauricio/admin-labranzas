import styles from './table.module.css';
import {FaTimes} from 'react-icons/fa';

const FilterComponent = ({filterText, onFilter, onClear}) => (
	<>
		<input
			className={styles.filter__input}
			id='search'
			type='text'
			placeholder='Filtrar...'
			aria-label='Search Input'
			value={filterText}
			onChange={onFilter}
		/>
		<button className={styles.filter__button} type='button' onClick={onClear}>
			<FaTimes />
		</button>
	</>
);

export default FilterComponent;
