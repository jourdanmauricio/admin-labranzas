import Layout from '../../commons/Layout/layout';
import Message from '@/commons/Message/Message';
import useAxiosMl from '../../services/apiMl';
import Loader from '../../commons/Loader-overlay/Loader-overlay';

const Categories = () => {
	let {response, error, loading} = useAxiosMl({
		method: 'GET',
		// url: '/sites/MLA/categories',

		url: 'https://api.mercadolibre.com/users/652092206/items/search',
		// 	headers: {
		// 		accept: '*/*',
		// 	},
		// 	data: {
		// 		userId: 7,
		// 		id: 777,
		// 		title: 'New Post',
		// 		body: 'This is a new post',
		// 	},
	});

	const closeMessage = () => {
		error = false;
	};

	return (
		<Layout>
			<div>Productos</div>
			{loading && <Loader />}
			{console.log('error', error)}
			{/* {error && <Message msg={error} closeMessage={closeMessage} />} */}
			{/* {response &&
				response.map(res => (
					<>
						<span key={res.id}>
							{res.id} -{res.name}
						</span>
						<br />
					</>
				))} */}
		</Layout>
	);
};

export default Categories;
