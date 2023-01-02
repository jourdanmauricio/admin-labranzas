import {useSelector} from 'react-redux';
import {trad} from '@/helpers/helpTraduccion';
import styles from '../../products.module.css';

const SystemsTable = () => {
	const product = useSelector(state => state.product.product);

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
								<span>{product.prodMl?.price}</span>
							</td>
							<td data-titulo='Local'>
								<span>{product.price}</span>
							</td>
							<td data-titulo='Web'>
								<span>{product.prodWeb?.price}</span>
							</td>
						</tr>
						<tr>
							<td>Estado</td>
							<td data-titulo='ML'>
								<span>{trad(product.prodMl?.status)}</span>
							</td>
							<td data-titulo='Local'>
								<span>{trad(product.status)}</span>
							</td>
							<td data-titulo='Web'>
								<span>{trad(product.prodWeb?.status)}</span>
							</td>
						</tr>
						<tr>
							<td>Cantidad</td>
							<td data-titulo='ML'>
								<span>{product.prodMl?.available_quantity}</span>
							</td>
							<td data-titulo='Local'>
								<span>{product.available_quantity}</span>
							</td>
							<td data-titulo='Web'>
								<span>{product.prodWeb?.available_quantity}</span>
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
								<span>{trad(product.prodMl?.listing_type_id)}</span>
							</td>
							<td data-titulo='Local'>
								<span>{trad(product.listing_type_id)}</span>
							</td>
							<td data-titulo='Web'>
								<span>{trad(product.prodWeb?.listing_type_id)}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default SystemsTable;
