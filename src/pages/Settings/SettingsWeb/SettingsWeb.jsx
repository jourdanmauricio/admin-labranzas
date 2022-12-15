import {useEffect, useState} from 'react';
// import Layout from '@/commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {helpHttp} from '@/helpers/helpHttp';
import Tabs from './Tabs/Tabs';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {variables} from '@/config/variables';

const Settings = () => {
	const dispatch = useNotification();
	const [loading, setLoading] = useState(false);
	const [settings, setSettings] = useState([]);
	const [error, setError] = useState(null);

	const api = helpHttp();
	const url = `${variables.basePath}/settings`;

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const data = await api.get(url);

				if (data.statusCode) {
					throw data;
				} else {
					const obj = {};
					data.forEach(el => {
						obj[el.feature] = el.value;
					});
					setSettings(obj);
				}
			} catch (err) {
				setError(`${err.statusCode}: ${err.error} - ${err.message}`);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<>
			<h1 className='title'>Configuración Web</h1>

			{/* MESSAGE */}
			{error && <Message msg={error} closeMessage={() => setError(null)} />}
			{loading && <Loader />}
			<Tabs settings={settings} setError={setError} dispatch={dispatch}></Tabs>
		</>
	);
};

export default Settings;
