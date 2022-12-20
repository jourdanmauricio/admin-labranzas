import {useEffect, useState} from 'react';
import Layout from '../../commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '../../commons/Loader-overlay/Loader-overlay';
import {getAllCategories} from '../../services/api/categories';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		const fetchCategories = async () => {
			try {
				const categories = await getAllCategories();
				setCategories(categories);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchCategories();
	}, []);

	const closeMessage = () => {
		setError(false);
	};
	return (
		<Layout>
			<div>Categories</div>
			{loading && <Loader />}
			{error && <Message msg={error} closeMessage={closeMessage} />}
			<span>Cats: {categories.length}</span>
			{categories.length > 0 &&
				categories.map(res => (
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
