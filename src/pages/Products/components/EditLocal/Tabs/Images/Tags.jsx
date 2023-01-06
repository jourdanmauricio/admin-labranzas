import {useState} from 'react';
import {FaRegCopy, FaPlus} from 'react-icons/fa';
import ImageSettings from './ImageSettings';
import AddPicture from './AddPicture';
import {useSelector} from 'react-redux';
import ImageProduct from './ImageProduct';

const Tags = ({handleAddPicture}) => {
	const product = useSelector(state => state.product.product);
	const [toggleState, setToggleState] = useState(1);
	const toggleTab = index => {
		setToggleState(index);
	};
	return (
		<>
			<div className='tabs__container'>
				<div className='tabs__bloc'>
					<div
						onClick={() => toggleTab(1)}
						className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}>
						<FaRegCopy color='teal' size={20} />
						<span>Configuradas</span>
					</div>
					<div
						onClick={() => toggleTab(2)}
						className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}>
						<FaPlus color='green' size={20} />
						<span>Nuevas</span>
					</div>
					{product.variations?.length > 0 && (
						<div
							onClick={() => toggleTab(3)}
							className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}>
							<FaPlus color='green' size={20} />
							<span>Imágenes en prod</span>
						</div>
					)}
				</div>
				<div className='tabs__content'>
					<div
						className={
							toggleState === 1
								? 'tab__content active__content'
								: 'tab__content'
						}>
						<ImageSettings handleAddPicture={handleAddPicture} />
					</div>
					<div
						className={
							toggleState === 2
								? 'tab__content active__content'
								: 'tab__content'
						}>
						<AddPicture handleAddPicture={handleAddPicture} />
					</div>
					{product.variations?.length > 0 && (
						<div
							className={
								toggleState === 3
									? 'tab__content active__content'
									: 'tab__content'
							}>
							<ImageProduct handleAddPicture={handleAddPicture} />
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Tags;
