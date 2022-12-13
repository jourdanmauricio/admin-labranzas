// import {useEffect, useState} from 'react';
// import {helpHttp} from '@/helpers/helpHttp';
// import Tabs from './components/Tabs/Tabs';
import Layout from '../../commons/Layout/layout';
// import Message from '@/commons/Message/Message';
// import Loader from '@/commons/Loader-overlay/Loader-overlay';

const Dashboard = () => {
	// const [noCertificate, setNoCertificate] = useState([]);
	// const [birthdayMonth, setBirthdayMonth] = useState([]);
	// const [error, setError] = useState(null);
	// const [loading, setLoading] = useState(false);

	// const api = helpHttp();
	// const url = `${import.meta.env.VITE_BACKEND_API}/customers`;

	// useEffect(() => {
	// 	async function fetchData() {
	// 		setLoading(true);
	// 		try {
	// 			const data = await api.get(url);
	// 			if (data.statusCode) {
	// 				throw data;
	// 			}

	// 			const noCertif = data.filter(
	// 				el => el.status === 'Activo' && el.certificate === false
	// 			);
	// 			setNoCertificate(noCertif);

	// 			const dataMonthBirthday = data.filter(
	// 				el =>
	// 					el.status === 'Activo' &&
	// 					new Date().getUTCMonth() + 1 ===
	// 						new Date(el.birthday).getUTCMonth() + 1
	// 			);
	// 			setBirthdayMonth(dataMonthBirthday);
	// 		} catch (err) {
	// 			setError(`${err.statusCode}: ${err.error} - ${err.message}`);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}
	// 	fetchData();
	// }, []);
	return (
		<>
			<Layout>
				<h1 className='title'>Dashborad</h1>
				{/* {error && <Message msg={error} closeMessage={() => setError(null)} />}
				{loading && <Loader />}
				<Tabs noCertificate={noCertificate} birthdayMonth={birthdayMonth} /> */}
			</Layout>
		</>
	);
};

export default Dashboard;
