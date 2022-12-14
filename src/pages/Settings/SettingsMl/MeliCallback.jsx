import {useEffect} from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {useLocation, useNavigate} from 'react-router-dom';
import Layout from '@/commons/Layout/layout';
import {useDispatch, useSelector} from 'react-redux';
import {connectMl} from '@/store/userMl';

const MeliCallback = () => {
	const dispatch = useDispatch();
	const dispatchNotif = useNotification();
	let userMl = useSelector(state => state.userMl);
	const navigate = useNavigate();

	let {search} = useLocation();
	const params = new URLSearchParams(search);
	const code = params.get('code');
	const state = params.get('state');

	useEffect(() => {
		if (userMl.status === 'success') {
			console.log('Change to success');
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Nickname vinculado correctamente',
			});
			navigate('/settings/settingsMl');
		}
		if (
			userMl.status === 'failed' &&
			userMl.error !== 'Ususario de Mercado Libre no configurado!'
		) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error vinculado Nickname',
			});
			navigate('/settings/settingsMl');
		}

		if (
			userMl.status === 'failed' &&
			userMl.error === 'Ususario de Mercado Libre no configurado!'
		) {
			dispatch(
				connectMl({
					code,
					nickname: state.split('-')[0],
				})
			);
		}
	}, [userMl]);
	return (
		<Layout>
			<h1>Estamos sincronizando con Mercado Libre....</h1>
			<br />
			<br />
			<p>{code}</p>
			<p>{state}</p>
			{userMl.state === 'loading' && <Loader />}
			{/* {statusUserMl === 'success' && (
				<Navigate to='/dashboard' replace={true} />
			)} */}
		</Layout>
	);
};

export default MeliCallback;
