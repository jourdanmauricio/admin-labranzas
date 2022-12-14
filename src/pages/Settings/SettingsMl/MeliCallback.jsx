import {useEffect} from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {useLocation} from 'react-router-dom';
//import {variables} from '@/config/variables';
import Layout from '@/commons/Layout/layout';
import {useDispatch, useSelector} from 'react-redux';
import {connectMl} from '@/store/userMl';

const MeliCallback = () => {
	let dispatch = useDispatch();
	let statusUserMl = useSelector(state => state.userMl.status);

	let {search} = useLocation();
	const params = new URLSearchParams(search);
	const code = params.get('code');
	const state = params.get('state');

	useEffect(() => {
		// const replaceCode = async () => {
		// const url = `${variables.basePathMl}/oauth/token`;

		// try {
		// GET ML -> change code for access_token
		// const data = {
		// 	grant_type: 'authorization_code',
		// 	client_id: variables.mlAppId,
		// 	client_secret: variables.mlSecret,
		// 	code,
		// 	redirect_uri: `${variables.frontend}/meli-callback`,
		// };

		// const data = {
		//   code
		// }

		// const resAccessToken = await fetch(url, {
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// });
		// console.log('resAccessToken', resAccessToken);
		// const accessToken = await resAccessToken.json();
		// console.log('accessToken', accessToken);

		// const resMlUser = await fetch(
		// 	`${variables.basePathMl}/users/${accessToken.user_id}`,
		// 	{headers: {Authorization: `Bearer ${accessToken.access_token}`}}
		// );
		// console.log('resMlUser', resMlUser);
		// const mlUser = await resMlUser.json();
		// console.log('mlUser', mlUser);

		// const nickname = state.split('-')[0];

		// if (nickname !== mlUser.nickname)
		// 	throw 'No coincide el nickname ingresado con la autorización de Mercado Libre';

		// update settings
		// Set store access__token
		// axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		// await createUserMl(mlUser);
		// notification.show('Nickname vinculado', 'success');

		// return mlUser;
		// } catch (error) {
		// 	console.log('error', error);
		// 	let message = '';
		// 	message = error.response.data
		// 		? `${error.response.data.statusCode}: ${error.response.data.message}`
		// 		: 'Error obteniendo token ML 😞';
		// 	throw message;
		// } finally {
		// 	setLoading(false);
		// }
		//};

		//replaceCode();
		dispatch(
			connectMl({
				code,
				nickname: state.split('-')[0],
			})
		);
	}, []);
	return (
		<Layout>
			<h1>Estamos sincronizando con Mercado Libre....</h1>
			<br />
			<br />
			<p>{code}</p>
			<p>{state}</p>
			{statusUserMl === 'loading' && <Loader />}
		</Layout>
	);
};

export default MeliCallback;
