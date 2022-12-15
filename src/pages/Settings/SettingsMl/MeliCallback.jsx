import {useEffect} from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {useLocation, useNavigate} from 'react-router-dom';
import Layout from '@/commons/Layout/layout';
import {useDispatch, useSelector} from 'react-redux';
import {connectMl} from '@/store/userMl';

const MeliCallback = () => {
	const dispatch = useDispatch();
	let userMl = useSelector(state => state.userMl);
	const navigate = useNavigate();

	let {search} = useLocation();
	const params = new URLSearchParams(search);
	const code = params.get('code');
	const state = params.get('state');

	useEffect(() => {
		const connect = async () => {
			if (!userMl.userMl) {
				await dispatch(
					connectMl({
						code,
						nickname: state.split('-')[0],
					})
				);
			}
			navigate('/settings/settingsMl');
		};
		connect();
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
