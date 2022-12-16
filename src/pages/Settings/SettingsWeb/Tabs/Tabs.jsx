import {useState} from 'react';
// import {FaRegImage, FaFont, FaFillDrip, FaWhatsapp} from 'react-icons/fa';
import {FaFont, FaFillDrip, FaWhatsapp} from 'react-icons/fa';
import Colors from '../Colors/Colors';
import Contact from '../Contact/Contact';
import Fonts from '../Fonts/Fonts';
// import Images from '../Images/Images';
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
					<FaFillDrip color='teal' />
					<span>Colores</span>
				</div>
				<div
					onClick={() => toggleTab(2)}
					className={
						toggleState === 2
							? `${styles.tabs} ${styles.active__tabs}`
							: styles.tabs
					}>
					<FaWhatsapp color='green' />
					<span>Contacto</span>
				</div>
				<div
					onClick={() => toggleTab(3)}
					className={
						toggleState === 3
							? `${styles.tabs} ${styles.active__tabs}`
							: styles.tabs
					}>
					<FaFont color='black' />
					<span>Fuentes</span>
				</div>
				{/* <div
					onClick={() => toggleTab(4)}
					className={
						toggleState === 4
							? `${styles.tabs} ${styles.active__tabs}`
							: styles.tabs
					}>
					<FaRegImage color='blue' />
					<span>Imagenes</span>
				</div> */}
			</div>
			<div className={styles.content__tabs}>
				<div
					className={
						toggleState === 1
							? `${styles.content} ${styles.active__content}`
							: styles.content
					}>
					<Colors updated={updated}></Colors>
				</div>
				<div
					className={
						toggleState === 2
							? `${styles.content} ${styles.active__content}`
							: styles.content
					}>
					<Contact updated={updated}></Contact>
				</div>
				<div
					className={
						toggleState === 3
							? `${styles.content} ${styles.active__content}`
							: styles.content
					}>
					<Fonts updated={updated}></Fonts>
				</div>
				{/* <div
					className={
						toggleState === 4
							? `${styles.content} ${styles.active__content}`
							: styles.content
					}>
					<Images dispatchNotif={dispatchNotif}></Images>
				</div> */}
			</div>
		</div>
	);
};

export default Tabs;
