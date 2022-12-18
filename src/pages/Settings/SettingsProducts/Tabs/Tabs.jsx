import {useState} from 'react';
import {FaBoxOpen, FaRegImage} from 'react-icons/fa';
import Images from '../Images/Images';
import Products from '../Products/Products';

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
					<FaBoxOpen color='teal' size={20} />
					<span>Productos</span>
				</div>
				<div
					onClick={() => toggleTab(2)}
					className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}>
					<FaRegImage color='green' size={20} />
					<span>Imágenes</span>
				</div>
			</div>
			<div className='tabs__content'>
				<div
					className={
						toggleState === 1 ? 'tab__content active__content' : 'tab__content'
					}>
					<Products updated={updated}></Products>
				</div>
				<div
					className={
						toggleState === 2 ? 'tab__content active__content' : 'tab__content'
					}>
					<Images updated={updated}></Images>
				</div>
			</div>
		</div>
	);
};

export default Tabs;
