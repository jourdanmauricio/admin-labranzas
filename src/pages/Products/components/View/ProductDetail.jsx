import {useEffect, useState} from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Message from '@/commons/Message/Message';
import {getLocalProduct} from '@/services/api/products.api';
import {FaRegWindowClose, FaChevronLeft, FaChevronRight} from 'react-icons/fa';
// import ProductSystems from '../ProductSystems/ProductSystems';
import ProductTerms from '../ProductTerms';
// import ProductVariations from './ProductVariations';
import ProductAttributes from '../ProductAttributes';
import styles from '../../products.module.css';
import {trad} from '@/helpers/helpTraduccion';
import Variations from './Variations';
import SystemsTable from './SystemsTable';

const ProductDetail = ({id, handleCancel}) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [currentPicture, setCurrentPicture] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const product = await getLocalProduct(id);
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

	const handleChangeImg = (e, direction) => {
		e.stopPropagation();
		e.preventDefault();
		const maxPictures = product.pictures.length - 1;
		if (direction === 'LEFT' && currentPicture === 0) {
			setCurrentPicture(maxPictures);
		} else if (direction === 'RIGTH' && currentPicture === maxPictures) {
			setCurrentPicture(0);
		} else {
			direction === 'LEFT'
				? setCurrentPicture(currentPicture - 1)
				: setCurrentPicture(currentPicture + 1);
		}
	};

	return (
		<>
			<div className={styles.view__container}>
				<button onClick={handleCancel} className={styles.view__close}>
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
									value={product.prodMl?.id}
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
							<div>
								<label htmlFor='sku'>SKU</label>
								<input
									className='form__input'
									type='text'
									name='sku'
									value={product.seller_custom_field}
									disabled
								/>
							</div>
							<div>
								<label htmlFor='condition'>Condición del item</label>
								<input
									className='form__input'
									type='text'
									name='condition'
									value={trad(product.condition)}
									disabled
								/>
							</div>
							<div className='wide'>
								<label htmlFor='description'>Descripción</label>
								<textarea
									className='form__input'
									type='text'
									rows={10}
									name='description'
									value={product.description || ''}
									disabled
								/>
							</div>

							<div className={product.variations.length > 0 ? 'wide' : ''}>
								<p>Imagen principal</p>
								<img
									className={styles.image__var}
									src={product.pictures[0].secure_url}
									alt=''
								/>
							</div>

							{product.variations.length === 0 && (
								<div>
									<p>Imágenes</p>
									<div className={styles.table__images}>
										<FaChevronLeft
											className={styles.images__icon}
											onClick={e => handleChangeImg(e, 'LEFT')}
										/>
										<img
											className={styles.image__var}
											src={product.pictures[currentPicture].secure_url}
											alt=''
										/>
										<FaChevronRight
											className={styles.images__icon}
											onClick={e => handleChangeImg(e, 'RIGTH')}
										/>
									</div>
								</div>
							)}

							<div className='wide'>
								<ProductAttributes data={product} />
							</div>
							<div className='wide'>
								<ProductTerms data={product} />
							</div>

							<div className='wide'>
								<SystemsTable />
							</div>

							<div className='wide'>
								<Variations />
							</div>
						</div>
						<button onClick={handleCancel} className='btn btn__primary'>
							Cerrar
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default ProductDetail;
