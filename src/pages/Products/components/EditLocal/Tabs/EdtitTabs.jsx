import {useState} from 'react';
import {
	FaRegCopy,
	FaRegListAlt,
	FaDollarSign,
	FaCameraRetro,
} from 'react-icons/fa';
import Variations from './Variations/Variations';
import Attributes from './Attributes/Attributes';
import Features from './Features/Features';
import Images from './Images/Images';
import {useSelector} from 'react-redux';

const EditTabs = () => {
	const [toggleState, setToggleState] = useState(1);
	let product = useSelector(state => state.product.product);

	const toggleTab = index => {
		setToggleState(index);
	};
	return (
		<div className='tabs__container'>
			<div className='tabs__bloc'>
				<div
					onClick={() => toggleTab(1)}
					className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}>
					<FaRegCopy color='teal' size={20} />
					<span>Variaciones</span>
				</div>
				<div
					onClick={() => toggleTab(2)}
					className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}>
					<FaRegListAlt color='green' size={20} />
					<span>Atributos</span>
				</div>
				<div
					onClick={() => toggleTab(3)}
					className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}>
					<FaDollarSign color='purple' size={20} />
					<span>Características</span>
				</div>
				{product.variations.length === 0 && (
					<div
						onClick={() => toggleTab(4)}
						className={toggleState === 4 ? 'tabs active__tabs' : 'tabs'}>
						<FaCameraRetro color='blueviolet' size={20} />
						<span>Imágenes</span>
					</div>
				)}
			</div>
			<div className='tabs__content'>
				<div
					className={
						toggleState === 1 ? 'tab__content active__content' : 'tab__content'
					}>
					<Variations />
				</div>
				<div
					className={
						toggleState === 2 ? 'tab__content active__content' : 'tab__content'
					}>
					<Attributes />
				</div>
				<div
					className={
						toggleState === 3 ? 'tab__content active__content' : 'tab__content'
					}>
					<Features />
				</div>
				{product.variations.length === 0 && (
					<div
						className={
							toggleState === 4
								? 'tab__content active__content'
								: 'tab__content'
						}>
						<Images />
					</div>
				)}
			</div>
		</div>
	);
};

export default EditTabs;
