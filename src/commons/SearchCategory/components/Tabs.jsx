import {useState} from 'react';
import {FaSearchPlus, FaSearchLocation, FaSearch} from 'react-icons/fa';
import CatPredictor from './CatPredictor';
import CatTree from './CatTree';
import CatUsed from './CatUsed';

const Tabs = ({handleSelectCat}) => {
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
					<FaSearch color='teal' size={20} />
					<span>Predictor</span>
				</div>
				<div
					onClick={() => toggleTab(2)}
					className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}>
					<FaSearchLocation color='green' size={20} />
					<span>Árbol</span>
				</div>
				<div
					onClick={() => toggleTab(3)}
					className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}>
					<FaSearchPlus color='green' size={20} />
					<span>Más utilizadas</span>
				</div>
			</div>
			<div className='tabs__content'>
				<div
					className={
						toggleState === 1 ? 'tab__content active__content' : 'tab__content'
					}>
					<CatPredictor handleSelectCat={handleSelectCat}></CatPredictor>
				</div>
				<div
					className={
						toggleState === 2 ? 'tab__content active__content' : 'tab__content'
					}>
					<CatTree handleSelectCat={handleSelectCat}></CatTree>
				</div>
				<div
					className={
						toggleState === 3 ? 'tab__content active__content' : 'tab__content'
					}>
					<CatUsed handleSelectCat={handleSelectCat}></CatUsed>
				</div>
			</div>
		</div>
	);
};

export default Tabs;
