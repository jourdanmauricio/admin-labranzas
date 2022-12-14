import {useEffect} from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {useLocation, useNavigate} from 'react-router-dom';
//import {variables} from '@/config/variables';
import Layout from '@/commons/Layout/layout';
import {useDispatch, useSelector} from 'react-redux';
import {connectMl} from '@/store/userMl';

const MeliCallback = () => {
	const dispatch = useDispatch();
	const dispatchNotif = useNotification();
	let statusUserMl = useSelector(state => state.userMl.status);
	const navigate = useNavigate();

	let {search} = useLocation();
	const params = new URLSearchParams(search);
	const code = params.get('code');
	const state = params.get('state');

	useEffect(() => {
		if (statusUserMl === 'success') {
			console.log('Change to success');
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Nickname vinculado correctamente',
			});
			navigate('/settings/settingsMl');
		}
		if (statusUserMl === 'failed') {
			console.log('Change to success');
			dispatchNotif({
				type: 'ERROR',
				message: 'Error vinculado Nickname',
			});
		}

		dispatch(
			connectMl({
				code,
				nickname: state.split('-')[0],
			})
		);
	}, [statusUserMl]);
	return (
		<Layout>
			<h1>Estamos sincronizando con Mercado Libre....</h1>
			<br />
			<br />
			<p>{code}</p>
			<p>{state}</p>
			{statusUserMl === 'loading' && <Loader />}
			{/* {statusUserMl === 'success' && (
				<Navigate to='/dashboard' replace={true} />
			)} */}
		</Layout>
	);
};

export default MeliCallback;
