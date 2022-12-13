import {FaRegWindowClose} from 'react-icons/fa';
import styles from './message.module.css';

const Message = ({msg, closeMessage}) => {
	return (
		<div className={styles.message}>
			<button className={styles.message__close} onClick={closeMessage}>
				<FaRegWindowClose />
			</button>

			<p className={styles.message__paragraph}>{msg}</p>
		</div>
	);
};

export default Message;
