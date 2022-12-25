import Layout from '../../commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {paginationComponentOptions} from '@/config/constants';
import DataTable from 'react-data-table-component';
import useProducts from './useProducts';
import ProductSystems from './ProductSystems';
import ProductDetail from './ProductDetail';

const Products = () => {
	const {
		loading,
		error,
		PRODUCTS_COLUMNS,
		filteredItems,
		action,
		currentProd,
		resetPaginationToggle,
		closeMessage,
		handleAction,
		// handleCancel,
		// handleDelete,
		// handleAddProduct,
		// importMlProducts,
		subHeaderComponentMemo,
	} = useProducts();

	return (
		<Layout>
			{loading && <Loader />}
			{error && <Message msg={error} closeMessage={closeMessage} />}
			<br />
			{action === 'VIEW' && (
				<ProductDetail id={currentProd.id} handleAction={handleAction} />
			)}
			{action === 'INITIAL' && (
				<DataTable
					title='Productos'
					columns={PRODUCTS_COLUMNS}
					data={filteredItems}
					dense
					responsive
					selectableRows
					expandableRows
					expandableRowsComponent={ProductSystems}
					expandableRowsComponentProps={{handleAction: handleAction}}
					actions={subHeaderComponentMemo}
					pagination
					paginationComponentOptions={paginationComponentOptions}
					paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
				/>
			)}
		</Layout>
	);
};

export default Products;
