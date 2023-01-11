import {Container, Row, Col} from 'react-grid-system';
import {FaRegWindowClose} from 'react-icons/fa';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Message from '@/commons/Message/Message';
import useEditWeb from './useEditWeb';
import {useSelector} from 'react-redux';
// import {useDispatch, useSelector} from 'react-redux';
// import {editField} from '@/store/product';
import styles from '../../products.module.css';

const EditWeb = ({handleCancel}) => {
	const product = useSelector(state => state.product.product);
	const {status, error, closeMessage, handleSubmit, handleChange} =
		useEditWeb();

	return (
		<>
			<div className={styles.view__container}>
				<button onClick={handleCancel} className={styles.view__close}>
					<FaRegWindowClose />
				</button>
				<h1 className='title'>Modificar Producto Web</h1>
				{status === 'loading' && <Loader />}
				{error && <Message msg={error} closeMessage={closeMessage} />}
				{product && (
					<>
						<Container className='grid__container'>
							Exposición en página principal
							<hr />
							<Row className='form__row'>
								<Col sm={6} lg={3}>
									<div className={styles.checkbox__container}>
										<input
											className={styles.input__checkbox}
											type='checkbox'
											id='new_product'
											name='new_product'
											checked={product.prodWeb.new_product}
											onChange={e =>
												handleChange(e.target.name, e.target.checked)
											}
										/>
										<label
											className={styles.label__checkbox}
											htmlFor='new_product'>
											Nuevo Producto
										</label>
									</div>
								</Col>
								<Col sm={6} lg={3}>
									<div className={styles.checkbox__container}>
										<input
											className={styles.input__checkbox}
											type='checkbox'
											id='featured'
											name='featured'
											checked={product.prodWeb.featured}
											onChange={e =>
												handleChange(e.target.name, e.target.checked)
											}
										/>
										<label
											className={styles.label__checkbox}
											htmlFor='featured'>
											Destacado
										</label>
									</div>
								</Col>
								<Col sm={6} lg={3}>
									<div className={styles.checkbox__container}>
										<input
											className={styles.input__checkbox}
											type='checkbox'
											id='best_sellers'
											name='best_sellers'
											checked={product.prodWeb.best_sellers}
											onChange={e =>
												handleChange(e.target.name, e.target.checked)
											}
										/>
										<label
											className={styles.label__checkbox}
											htmlFor='best_sellers'>
											Más vendido
										</label>
									</div>
								</Col>
								<Col sm={6} lg={3}>
									<div className={styles.checkbox__container}>
										<input
											className={styles.input__checkbox}
											type='checkbox'
											id='trend'
											name='trend'
											checked={product.prodWeb.trend}
											onChange={e =>
												handleChange(e.target.name, e.target.checked)
											}
										/>
										<label className={styles.label__checkbox} htmlFor='trend'>
											Tendencia
										</label>
									</div>
								</Col>
							</Row>
						</Container>
						<div className='delete__actions'>
							<button
								className='btn'
								onClick={handleCancel}
								id='cancel'
								type='button'>
								Cancelar
							</button>

							<button
								onClick={handleSubmit}
								className='btn btn__primary'
								id='delete'
								type='button'>
								Modificar
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default EditWeb;
