import Message from '@/commons/Message/Message';
import Tabs from './Tabs/Tabs';
import {useDispatch, useSelector} from 'react-redux';
import {logOutSettings} from '../../../store/settings';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {revalidateProdsWeb} from '../../../services/api/products.api';

const Settings = () => {
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

	const handleValidateWeb = async () => {
		try {
			const revalidate = await revalidateProdsWeb();
			console.log('revalidate', revalidate);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Configuración modificada!',
			});
		} catch (error) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error modificando la configuración',
			});
		}
	};

	const closeMessage = () => {
		dispatch(logOutSettings());
	};
	return (
		<>
			<h1 className='title'>Configuración Web</h1>
			{/* MESSAGE */}
			<div className='action'>
				<button onClick={handleValidateWeb} className='btn btn__primary'>
					Actualizar Products Web
				</button>
			</div>
			{error.length > 0 && <Message msg={error} closeMessage={closeMessage} />}
			<Tabs updated={updated}></Tabs>
		</>
	);
};

export default Settings;
