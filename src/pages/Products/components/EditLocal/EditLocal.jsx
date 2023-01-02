import {Container, Row, Col} from 'react-grid-system';
import {FaRegWindowClose, FaSearch} from 'react-icons/fa';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Message from '@/commons/Message/Message';
import SearchCategory from '@/commons/SearchCategory/SearchCategory';
import EditTabs from './Tabs/EdtitTabs';
import Title from './Title';
import SellerCustomField from './SellerCustomField';
import styles from '../../products.module.css';
import useEditLocal from './useEditLocal';
import {useSelector} from 'react-redux';

const EditLocal = ({handleCancel}) => {
	const product = useSelector(state => state.product.product);
	const {
		loading,
		error,
		openCategory,
		handleAddCategory,
		handleCancelCat,
		closeMessage,
		handleSubmit,
		setOpenCategory,
	} = useEditLocal();
	return (
		<>
			<div className={styles.view__container}>
				<button onClick={handleCancel} className={styles.view__close}>
					<FaRegWindowClose />
				</button>
				<h1 className='title'>Modificar Producto</h1>
				{loading && <Loader />}
				{error && <Message msg={error} closeMessage={closeMessage} />}
				{product && (
					<>
						<Container className='grid__container'>
							<Row className='form__row'>
								<Col md={6} className='form__control'>
									<label htmlFor='id'>ID</label>
									<input
										className='form__input'
										type='text'
										name='id'
										value={product.id}
										disabled
									/>
								</Col>
								<Col md={6} className='form__control'>
									<label htmlFor='ml-id'>ML ID</label>
									<input
										className='form__input'
										type='text'
										name='ml-id'
										value={product.prodMl?.id}
										disabled
									/>
								</Col>
							</Row>
							<Row className='form__row'>
								<Col md={9} className='form__control'>
									<Title />
								</Col>
								<Col md={3} className='form__control'>
									<SellerCustomField />
								</Col>
							</Row>
							<hr />
							<Row className='form__row'>
								<Col className='form__control'>
									<label htmlFor='category'>Categoría</label>
									<input
										className='form__input '
										type='text'
										name='category'
										value={product.category.full_name}
										disabled
									/>
								</Col>
							</Row>
							<Row align='end' className='form__row'>
								<Col md={3} className='form__control'>
									<label htmlFor='cat-id'>Categoría ID</label>
									<input
										className='form__input'
										type='text'
										name='cat-id'
										value={product.category.id}
										disabled
									/>
								</Col>
								<Col md={8} className='form__control'>
									<label htmlFor='cat-web'>Categoría Web</label>
									<input
										className='form__input'
										type='text'
										name='cat-web'
										value={product.category.description_web}
										disabled
									/>
								</Col>
								<Col md={1} className='form__control'>
									<button
										onClick={() => setOpenCategory(!openCategory)}
										className='table__icon table__icon--view'>
										<FaSearch />
									</button>
								</Col>
							</Row>
							{openCategory && (
								<SearchCategory
									handleAddCategory={handleAddCategory}
									handleCancel={handleCancelCat}
								/>
							)}
							<EditTabs />
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

export default EditLocal;
