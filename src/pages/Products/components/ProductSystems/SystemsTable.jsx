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
import {useSelector} from 'react-redux';

const SystemsTable = ({handleAction, handleProduct, handleChange}) => {
	const product = useSelector(state => state.product.product);
	return (
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
							{product.prodMl && (
								<Price
									price={product.prodMl.price}
									action={'UPDATE-PRICE-ML'}
									handleChange={handleChange}
								/>
							)}
						</td>
						<td data-titulo='Local'>
							<Price
								price={product.price}
								action={'UPDATE-PRICE-LOCAL'}
								handleChange={handleChange}
							/>
						</td>
						<td data-titulo='Web'>
							{product.prodWeb && (
								<Price
									price={product.prodWeb.price}
									action={'UPDATE-PRICE-WEB'}
									handleChange={handleChange}
								/>
							)}
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
						<td>Acciones</td>
						{/* MERCADO LIBRE */}
						<td data-titulo='ML'>
							{product.prodMl ? (
								<>
									<button
										onClick={() => handleAction('IMPORT-ML')}
										className='table__icon table__icon--add'>
										<FaArrowDown />
									</button>
									<button
										onClick={() => window.open(product.prodMl.permalink)}
										className='table__icon table__icon--view'>
										<FaRegEye />
									</button>
									<button
										onClick={() => handleAction('DELETE-ML')}
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
										onClick={() => handleAction('IMPORT-ML')}
										className='table__icon table__icon--add'>
										<FaArrowDown />
									</button>
									<button
										// onClick={() => handleAction(data, 'IMPORT-ML')}
										className='table__icon table__icon--add'>
										<FaPlus />
									</button>
								</>
							)}
						</td>
						{/* LOCAL */}
						<td data-titulo='Local'>
							<button
								onClick={() => handleProduct('VIEW')}
								className='table__icon table__icon--view'>
								<FaRegEye />
							</button>
							<button
								// onClick={() => deleteData(row)}
								className='table__icon table__icon--delete'>
								<FaRegTrashAlt />
							</button>
							<button
								onClick={() => handleProduct('EDIT-LOCAL')}
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
										onClick={() => handleAction('DELETE-WEB')}
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
								<button
									type='button'
									onClick={() => handleAction('MIGRATE-WEB')}
									className='table__icon table__icon--add'>
									<FaPlus />
								</button>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SystemsTable;
