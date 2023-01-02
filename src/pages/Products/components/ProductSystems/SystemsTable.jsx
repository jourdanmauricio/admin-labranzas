import styles from '../../products.module.css';
import {
	FaRegEye,
	FaArrowDown,
	FaEdit,
	FaRegTrashAlt,
	FaPlus,
} from 'react-icons/fa';

import Status from './Status';
import Price from './Price';
import Quantity from './Quantity';
import {useDispatch, useSelector} from 'react-redux';
import {setAction, setFullProduct} from '@/store/product';
import useSystemsTable from './useSystemsTable';
// import {useModal} from '@/hooks/useModal';
import {Modal} from '@/commons/Modal/Modal';
import ProductDeleteConfirm from '../ProductDeleteConfirm';
import Listing from './Listing';

const SystemsTable = () => {
	const dispatch = useDispatch();
	const product = useSelector(state => state.product.product);
	const {
		isOpenModal,
		closeModal,
		handleConfirm,
		handleCancel,
		migrateWeb,
		importMlProduct,
	} = useSystemsTable();

	return (
		<>
			<div className={`table__container ${styles.product_systems}`}>
				<table className='table'>
					<caption>Canales de venta</caption>
					<thead>
						<tr>
							<th>Característica</th>
							<th>ML</th>
							<th>Local</th>
							<th>Web</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Precio</td>
							<td data-titulo='ML'>
								{product.prodMl && <Price system={'ML'} />}
							</td>
							<td data-titulo='Local'>
								<Price system={'LOCAL'} />
							</td>
							<td data-titulo='Web'>
								{product.prodWeb && <Price system={'WEB'} />}
							</td>
						</tr>
						<tr>
							<td>Estado</td>
							<td data-titulo='ML'>
								{product.prodMl && <Status system={'ML'} />}
							</td>
							<td data-titulo='Local'>
								<Status system={'LOCAL'} />
							</td>
							<td data-titulo='Web'>
								{product.prodWeb && <Status system={'WEB'} />}
							</td>
						</tr>
						<tr>
							<td>Cantidad</td>
							<td data-titulo='ML'>
								{product.prodMl && <Quantity system={'ML'} />}
							</td>
							<td data-titulo='Local'>
								<Quantity system={'LOCAL'} />
							</td>
							<td data-titulo='Web'>
								{product.prodWeb && <Quantity system={'WEB'} />}
							</td>
						</tr>
						<tr>
							<td>Cant vendida</td>
							<td data-titulo='ML'>{product.prodMl?.sold_quantity}</td>
							<td data-titulo='Local'>{product.sold_quantity}</td>
							<td data-titulo='Web'>{product.prodWeb?.sold_quantity}</td>
						</tr>
						<tr>
							<td>Tipo de publicación</td>
							<td data-titulo='ML'>
								{product.prodMl && <Listing system={'ML'} />}
							</td>
							<td data-titulo='Local'>
								<Listing system={'LOCAL'} />
							</td>
							<td data-titulo='Web'>
								{product.prodWeb && <Listing system={'WEB'} />}
							</td>
						</tr>
						<tr>
							<td>Acciones</td>
							{/* MERCADO LIBRE */}
							<td data-titulo='ML'>
								{product.prodMl ? (
									<>
										<button
											onClick={importMlProduct}
											className='table__icon table__icon--add'>
											<FaArrowDown />
										</button>
										<button
											onClick={() => window.open(product.prodMl.permalink)}
											className='table__icon table__icon--view'>
											<FaRegEye />
										</button>
										<button
											onClick={() => dispatch(setAction({action: 'DELETE-ML'}))}
											// onClick={() => handleDelete('DELETE-ML')}
											className='table__icon table__icon--delete'>
											<FaRegTrashAlt />
										</button>
										<button
											// onClick={() => editData(row)}
											className='table__icon table__icon--edit'>
											<FaEdit />
										</button>
									</>
								) : (
									<>
										<button
											onClick={importMlProduct}
											className='table__icon table__icon--add'>
											<FaArrowDown />
										</button>
										<button className='table__icon table__icon--add'>
											<FaPlus />
										</button>
									</>
								)}
							</td>
							{/* LOCAL */}
							<td data-titulo='Local'>
								<button
									onClick={() =>
										dispatch(setFullProduct({id: product.id, action: 'VIEW'}))
									}
									className='table__icon table__icon--view'>
									<FaRegEye />
								</button>
								<button
									// onClick={() => deleteData(row)}
									className='table__icon table__icon--delete'>
									<FaRegTrashAlt />
								</button>
								<button
									onClick={() =>
										dispatch(
											setFullProduct({id: product.id, action: 'EDIT-LOCAL'})
										)
									}
									className='table__icon table__icon--edit'>
									<FaEdit />
								</button>
							</td>
							{/* WEB */}
							<td data-titulo='Web'>
								{product.prodWeb ? (
									<>
										<button
											onClick={() => window.open(product.prodWeb?.permalink)}
											className='table__icon table__icon--view'>
											<FaRegEye />
										</button>
										<button
											onClick={
												() => dispatch(setAction({action: 'DELETE-WEB'}))
												// handleDelete('DELETE-WEB')
											}
											className='table__icon table__icon--delete'>
											<FaRegTrashAlt />
										</button>
										<button className='table__icon table__icon--edit'>
											<FaEdit />
										</button>
									</>
								) : (
									<button
										type='button'
										onClick={migrateWeb}
										className='table__icon table__icon--add'>
										<FaPlus />
									</button>
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<Modal isOpenModal={isOpenModal} closeModal={closeModal}>
				<ProductDeleteConfirm
					handleConfirm={handleConfirm}
					handleCancel={handleCancel}
				/>
			</Modal>
		</>
	);
};

export default SystemsTable;
