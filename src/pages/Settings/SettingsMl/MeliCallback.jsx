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
		console.log('nickMLParam', state.split('-')[0]);
		console.log('userMl.status', userMl.status);
		console.log('userMl.error', userMl.error);
		if (userMl.userMl) {
			console.log('Change to success');
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Nickname vinculado correctamente',
			});
			navigate('/settings/settingsMl');
		}

		if (!userMl.userMl) {
			console.log('nickMLParam', state.split('-')[0]);
			dispatch(
				connectMl({
					code,
					nickname: state.split('-')[0],
				})
			);
		}
	}, []);
	return (
		<Layout>
			<h1>Estamos sincronizando con Mercado Libre....</h1>
			<br />
			<br />
			<p>{code}</p>
			<p>{state}</p>

			{userMl.status === 'loading' && <Loader />}
			{/* {statusUserMl === 'success' && (
				<Navigate to='/dashboard' replace={true} />
			)} */}

			{userMl.status}
			{userMl.error}
			{userMl.userMl?.nickname}
		</Layout>
	);
};

export default MeliCallback;
