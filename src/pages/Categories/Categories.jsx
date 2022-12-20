import {useState} from 'react';
import Layout from '../../commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '../../commons/Loader-overlay/Loader-overlay';
import {getApiAllCategoriesMl} from '../../services/api/categoriesML';

const Categories = () => {
	const [data, setdata] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	getApiAllCategoriesMl().then(({response, error, loading}) => {
		setdata(response);
		setLoading(loading);
		setError(error);
	});

	const closeMessage = () => {
		setError(null);
	};

	return (
		<Layout>
			<div>Categories</div>
			{loading && <Loader />}
			{error && <Message msg={error} closeMessage={closeMessage} />}
			{data &&
				data.map(res => (
					<div key={res.id}>
						<span>
							{res.id} -{res.name}
						</span>
						<br />
					</div>
				))}
		</Layout>
	);
};

export default Categories;
