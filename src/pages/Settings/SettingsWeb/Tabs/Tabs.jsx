import {useState} from 'react';
import {FaFont, FaFillDrip, FaWhatsapp} from 'react-icons/fa';
import Colors from '../Colors/Colors';
import Contact from '../Contact/Contact';
import Fonts from '../Fonts/Fonts';

const Tabs = ({updated}) => {
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = index => {
		setToggleState(index);
	};
	return (
		<div className='tabs__container'>
			<div className='tabs__bloc'>
				<div
					onClick={() => toggleTab(1)}
					className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}>
					<FaFillDrip color='teal' size={20} />
					<span>Colores</span>
				</div>
				<div
					onClick={() => toggleTab(2)}
					className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}>
					<FaWhatsapp color='green' size={20} />
					<span>Contacto</span>
				</div>
				<div
					onClick={() => toggleTab(3)}
					className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}>
					<FaFont color='black' size={20} />
					<span>Fuentes</span>
				</div>
			</div>
			<div className='tabs__content'>
				<div
					className={
						toggleState === 1 ? 'tab__content active__content' : 'tab__content'
					}>
					<Colors updated={updated}></Colors>
				</div>
				<div
					className={
						toggleState === 2 ? 'tab__content active__content' : 'tab__content'
					}>
					<Contact updated={updated}></Contact>
				</div>
				<div
					className={
						toggleState === 3 ? 'tab__content active__content' : 'tab__content'
					}>
					<Fonts updated={updated}></Fonts>
				</div>
			</div>
		</div>
	);
};

export default Tabs;
