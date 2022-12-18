import {useDispatch, useSelector} from 'react-redux';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import Tabs from './Tabs/Tabs';
import Message from '@/commons/Message/Message';
import {logOutSettings} from '../../../store/settings';

const SettingsProducts = () => {
	const dispatch = useDispatch();
	const dispatchNotif = useNotification();
	let {error, status} = useSelector(state => state.settings);

	const updated = () => {
		if (status === 'failed')
			dispatchNotif({
				type: 'ERROR',
				message: 'Error modificando la configuración',
			});
		if (status === 'success')
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Configuración modificada!',
			});
	};

	const closeMessage = () => {
		dispatch(logOutSettings());
	};

	return (
		<>
			<h1 className='title'>Configuración Productos</h1>
			{error.length > 0 && <Message msg={error} closeMessage={closeMessage} />}
			<Tabs updated={updated}></Tabs>
		</>
	);
};

export default SettingsProducts;
