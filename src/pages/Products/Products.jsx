import Layout from '../../commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '../../commons/Loader-overlay/Loader-overlay';
import {useState} from 'react';
import {serviceImportMl} from '../../services/api/products';
import {useSelector} from 'react-redux';

const Products = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const userMl = useSelector(state => state.userMl.userMl);
	const settings = useSelector(state => state.settings.settings);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const products = await serviceImportMl(userMl.id, settings);
			setProducts(products);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const closeMessage = () => {
		setError(false);
	};

	return (
		<Layout>
			<h1 className='title'>Productos</h1>
			<br />
			<button onClick={fetchProducts} className='btn btn__primary'>
				Download ML
			</button>
			{loading && <Loader />}
			{console.log('error', error)}
			{error && <Message msg={error} closeMessage={closeMessage} />}
			<br />
			{products > 0 &&
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
