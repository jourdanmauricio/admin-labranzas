import styles from './products.module.css';

const ProductTerms = ({data}) => {
	return (
		<div className={`table__container ${styles.product_systems}`}>
			<table className='table'>
				<caption>Términos</caption>
				<thead>
					<tr>
						<th>Característica</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody>
					{data.sale_terms.map(term => (
						<tr key={term.id}>
							<td data-titulo='Característica'>{term.name}</td>
							<td data-titulo='Valor'>{term.value_name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTerms;
