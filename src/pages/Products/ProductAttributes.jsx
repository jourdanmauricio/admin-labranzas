import styles from './products.module.css';

const ProductAttributes = ({data}) => {
	console.log('attributes', data.attributes);
	return (
		<div className={`table__container ${styles.product_systems}`}>
			<table className='table'>
				<caption>Atributos</caption>
				<thead>
					<tr>
						<th>Atributo</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody>
					{data.attributes.map(attrib => (
						<tr key={attrib.id}>
							<td data-titulo='Atributo'>{attrib.name}</td>
							<td data-titulo='Valor'>
								{attrib.value_id === '-1' && attrib.value_name === null
									? 'N / A'
									: attrib.value_name}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductAttributes;
