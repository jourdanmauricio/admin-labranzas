import {useState} from 'react';
import {FaBoxOpen, FaRegImage} from 'react-icons/fa';
import Images from '../Images/Images';
import Products from '../Products/Products';
import styles from './tabs.module.css';

const Tabs = ({updated}) => {
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = index => {
		setToggleState(index);
	};
	return (
		<div className={styles.container}>
			<div className={styles.bloc__tabs}>
				<div
					onClick={() => toggleTab(1)}
					className={
						toggleState === 1
							? `${styles.tabs} ${styles.active__tabs}`
							: styles.tabs
					}>
					<FaBoxOpen color='teal' />
					<span>Productos</span>
				</div>
				<div
					onClick={() => toggleTab(2)}
					className={
						toggleState === 2
							? `${styles.tabs} ${styles.active__tabs}`
							: styles.tabs
					}>
					<FaRegImage color='green' />
					<span>Imágenes</span>
				</div>
			</div>
			<div className={styles.content__tabs}>
				<div
					className={
						toggleState === 1
							? `${styles.content} ${styles.active__content}`
							: styles.content
					}>
					<Products updated={updated}></Products>
				</div>
				<div
					className={
						toggleState === 2
							? `${styles.content} ${styles.active__content}`
							: styles.content
					}>
					<Images updated={updated}></Images>
				</div>
			</div>
		</div>
	);
};

export default Tabs;
