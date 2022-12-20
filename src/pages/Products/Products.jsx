import Layout from '../../commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '../../commons/Loader-overlay/Loader-overlay';
import {useEffect, useState} from 'react';
import {getMlItems} from '../../services/api/products';
import {useSelector} from 'react-redux';

const Products = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const userMl = useSelector(state => state.userMl.userMl);

	useEffect(() => {
		setLoading(true);
		const fetchProducts = async () => {
			try {
				const products = await getMlItems(userMl.id);
				setProducts(products);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const closeMessage = () => {
		setError(false);
	};

	return (
		<Layout>
			<div>Productos</div>
			{loading && <Loader />}
			{console.log('error', error)}
			{error && <Message msg={error} closeMessage={closeMessage} />}
			{products.length > 0 &&
				products.map(res => (
					<div key={res}>
						<span>{res}</span>
						<br />
					</div>
				))}
		</Layout>
	);
};

export default Products;
