import {useSelector} from 'react-redux';
import {FaPlus} from 'react-icons/fa';
import styles from './images.module.css';

const ImageProduct = ({handleAddPicture}) => {
	const product = useSelector(state => state.product.product);

	const handleAdd = index => {
		handleAddPicture(product.pictures[index]);
	};

	return (
		<>
			<div className={styles.list__container}>
				{product.pictures.map((picture, index) => (
					<div className={styles.list__img} key={index}>
						<img
							className={styles.list__item}
							src={picture.secure_url}
							alt=''
						/>
						<FaPlus
							className={styles.item__delete}
							onClick={() => handleAdd(index)}
							color={'green'}
							size={18}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default ImageProduct;
