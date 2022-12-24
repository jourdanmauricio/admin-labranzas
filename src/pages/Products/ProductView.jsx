import {useEffect, useState} from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Message from '@/commons/Message/Message';
import {getLocalProduct} from '../../services/api/products.api';
import {FaRegWindowClose} from 'react-icons/fa';
import styles from './products.module.css';

const ProductView = ({id, handleAction}) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const product = await getLocalProduct(id);
				console.log('Product', product);
				setProduct(product);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const closeMessage = () => {
		setError(false);
	};

	return (
		<>
			<div className={styles.view__container}>
				<button
					onClick={() => handleAction(null, 'INITIAL')}
					className={styles.view__close}>
					<FaRegWindowClose />
				</button>
				<h1 className='title'>Detalle de producto</h1>
				{loading && <Loader />}
				{error && <Message msg={error} closeMessage={closeMessage} />}
				{product && (
					<div className='form__container'>
						<div className='formulario'>
							<div>
								<label htmlFor='id'>ID</label>
								<input
									className='form__input'
									type='text'
									name='id'
									value={product.id}
									disabled
								/>
							</div>
							<div>
								<label htmlFor='ml-id'>ML ID</label>
								<input
									className='form__input'
									type='text'
									name='ml-id'
									value={product.prodMl.id}
									disabled
								/>
							</div>
							<div className='wide'>
								<label htmlFor='title'>Producto</label>
								<input
									className='form__input'
									type='text'
									name='title'
									value={product.title}
									disabled
								/>
							</div>

							<div className='wide'>
								<label htmlFor='category'>Categoría</label>
								<input
									className='form__input'
									type='text'
									name='category'
									value={product.category.full_name}
									disabled
								/>
							</div>

							<div>
								<label htmlFor='cat-id'>Categoría ID</label>
								<input
									className='form__input'
									type='text'
									name='cat-id'
									value={product.category.id}
									disabled
								/>
							</div>

							<div>
								<label htmlFor='cat-web'>Categoría Web</label>
								<input
									className='form__input'
									type='text'
									name='cat-web'
									value={product.category.description_web}
									disabled
								/>
							</div>
						</div>
					</div>
				)}

				<button onClick={() => handleAction(null, 'INITIAL')} className='btn'>
					Cerrar
				</button>
			</div>
		</>
	);
};

export default ProductView;
