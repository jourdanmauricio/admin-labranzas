import DataTable from 'react-data-table-component';
import ImagesVar from './ImagesVar';
import useVariationsTable from './useVariationsTable';
import AttributesVar from './AttributesVar';

const Products = () => {
	const {VARIATIONS_COLUMNS, variations, action, handleAction, currentVar} =
		useVariationsTable();

	return (
		<>
			action: {action}
			{action === 'VARIATIONS' && (
				<>
					<h2 className='title'>Variaciones</h2>
					<hr />
					<DataTable
						columns={VARIATIONS_COLUMNS}
						data={variations}
						dense
						responsive
					/>
				</>
			)}
			{action === 'ATTRIBUTES' && (
				<AttributesVar currentVar={currentVar} handleAction={handleAction} />
			)}
			{action === 'IMAGES' && (
				<ImagesVar data={currentVar} handleAction={handleAction} />
			)}
		</>
	);
};

export default Products;
