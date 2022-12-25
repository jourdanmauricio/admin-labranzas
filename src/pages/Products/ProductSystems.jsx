import {FaRegEye, FaEdit, FaRegTrashAlt, FaPlus} from 'react-icons/fa';
import styles from './products.module.css';
import {trad} from '../../helpers/helpTraduccion';

const ProductSystems = ({data, handleAction}) => {
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
							<td data-titulo='ML'>{data.prodMl?.price}</td>
							<td data-titulo='Local'>{data.price}</td>
							<td data-titulo='Web'>{data.prodWeb?.price}</td>
						</tr>
						<tr>
							<td>Estado</td>
							<td data-titulo='ML'>{trad(data.prodMl?.status)}</td>
							<td data-titulo='Local'>{trad(data.status)}</td>
							<td data-titulo='Web'>{trad(data.prodWeb?.status)}</td>
						</tr>
						<tr>
							<td>Cantidad</td>
							<td data-titulo='ML'>{data.prodMl?.available_quantity}</td>
							<td data-titulo='Local'>{data.available_quantity}</td>
							<td data-titulo='Web'>{data.prodWeb?.available_quantity}</td>
						</tr>
						<tr>
							<td>Cant vendida</td>
							<td data-titulo='ML'>{data.prodMl?.sold_quantity}</td>
							<td data-titulo='Local'>{data.sold_quantity}</td>
							<td data-titulo='Web'>{data.prodWeb?.sold_quantity}</td>
						</tr>
						{handleAction && (
							<tr>
								<td>Acciones</td>
								<td data-titulo='ML'>
									{data.prodMl ? (
										<>
											<button
												onClick={() => window.open(data.prodMl.permalink)}
												className='table__icon table__icon--view'>
												<FaRegEye />
											</button>
											<button
												// onClick={() => deleteData(row)}
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
											// onClick={() => window.open(data.prodWeb?.permalink)}
											className='table__icon table__icon--add'>
											<FaPlus />
										</button>
									)}
								</td>
								<td data-titulo='Local'>
									<button
										onClick={() => handleAction(data, 'VIEW')}
										className='table__icon table__icon--view'>
										<FaRegEye />
									</button>
									<button
										// onClick={() => deleteData(row)}
										className='table__icon table__icon--delete'>
										<FaRegTrashAlt />
									</button>
									<button
										// onClick={() => editData(row)}
										className='table__icon table__icon--edit'>
										<FaEdit />
									</button>
								</td>
								<td data-titulo='Web'>
									{data.prodWeb ? (
										<>
											<button
												onClick={() => window.open(data.prodWeb?.permalink)}
												className='table__icon table__icon--view'>
												<FaRegEye />
											</button>
											<button
												// onClick={() => deleteData(row)}
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
											// onClick={() => window.open(data.prodWeb?.permalink)}
											className='table__icon table__icon--add'>
											<FaPlus />
										</button>
									)}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ProductSystems;
