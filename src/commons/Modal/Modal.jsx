import ReactDOM from 'react-dom';
import {FaRegWindowClose} from 'react-icons/fa';
import './Modal.css';

function Modal({children, isOpenModal, closeModal}) {
	const handleClickContainer = e => e.stopPropagation();

	return ReactDOM.createPortal(
		<section
			className={`modal ${isOpenModal && 'is-open'}`}
			onClick={closeModal}>
			<div className='modal-container' onClick={handleClickContainer}>
				<button onClick={closeModal} className='modal-close'>
					<FaRegWindowClose />
				</button>
				{children}
			</div>
		</section>,

		document.getElementById('modal')
	);
}

export {Modal};
