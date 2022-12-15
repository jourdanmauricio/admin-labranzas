import {useState} from 'react';
import {FaRegWindowClose} from 'react-icons/fa';
import styles from './message.module.css';

const Message = ({msg, closeMessage}) => {
	const [showMessage, setShowMessage] = useState(true);
	const mountedStyle = {animation: 'inAnimation 250ms ease-in'};
	const unmountedStyle = {
		animation: 'outAnimation 270ms ease-out',
		animationFillMode: 'forwards',
	};

	const handleclose = () => {
		setShowMessage(false);
		closeMessage();
	};

	return (
		<div
			style={showMessage ? mountedStyle : unmountedStyle}
			className={styles.message}>
			<button className={styles.message__close} onClick={handleclose}>
				<FaRegWindowClose />
			</button>

			<p className={styles.message__paragraph}>{msg}</p>
		</div>
	);
};

export default Message;
